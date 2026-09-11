import { generateText, stepCountIs } from "ai"
import { createAnthropic } from "@ai-sdk/anthropic"
import { createOpenAICompatible } from "@ai-sdk/openai-compatible"
import { type AgentStep, type ChatRequest, type LLMProvider, anthropicMessagesBaseUrl, getLLMProviders, trimHistoryForPrompt } from "@shared/agent"
import { createNewsTools, newsTools } from "#/utils/news-tools"

/** Hard cap on tool rounds per request (acceptance: never spin). */
export const AGENT_MAX_STEPS = 6
const MAX_OUTPUT_TOKENS = 1500

export interface AgentRunSuccess {
  ok: true
  reply: string
  model: string
  provider: string
  steps: AgentStep[]
}

export interface AgentRunFailure {
  ok: false
  reason: string
}

export type AgentRunResult = AgentRunSuccess | AgentRunFailure

/** Map a configured provider onto an AI SDK model instance. */
function toLanguageModel(provider: LLMProvider) {
  if (provider.protocol === "anthropic") {
    const anthropic = createAnthropic({
      apiKey: provider.apiKey,
      baseURL: anthropicMessagesBaseUrl(provider.baseUrl),
    })
    return anthropic(provider.model)
  }
  const compatible = createOpenAICompatible({
    name: provider.name,
    apiKey: provider.apiKey,
    baseURL: provider.baseUrl,
  })
  return compatible(provider.model)
}

const AGENT_SYSTEM_PROMPT = `你是 NewsNow 的新闻助手，帮用户理解和梳理当前抓到的资讯。

你可以调用这些工具：
- list_sources：看有哪些源（可按栏目）
- get_source_items：取某个源当前的条目
- search_news：按关键词跨源搜索

规则：
1. 问题涉及"今天/最近/现在"时，先调工具查，不要凭记忆回答。
2. 引用条目时给出标题和来源；绝不编造条目、链接或数字。
3. 先给结论，再列证据；中文回答，简洁。用纯文本，不要 markdown 强调符号（**、##）——面板按纯文本渲染；分点就用短横线开头。
4. 工具没查到就直说没查到，并提出可换的关键词。
5. 搜到足够条目前就收尾回答，不要无限换源；搜不到时最多换两次关键词。
6. 用户要“盯一个主题/每天给我简报”时，调 create_tracker 真正建立追踪，不要只口头承诺。`

function buildSystemPrompt(context?: ChatRequest["context"], contexts?: ChatRequest["contexts"]): string {
  const compare = (contexts?.length ?? 0) > 1
  const compareRule = compare
    ? "\n\n本次是对比分析：用户选了几条不同来源的报道，请先给出各方说法差异（谁在讲什么、口径差在哪、是否有互相矛盾的时间线或数字），再给一句结论。分点列出，每条标出来源。"
    : ""

  if (compare) return `${AGENT_SYSTEM_PROMPT}${compareRule}`
  if (!context?.title) return AGENT_SYSTEM_PROMPT

  const url = context.url ? `（${context.url}）` : ""
  return `${AGENT_SYSTEM_PROMPT}

当前用户正打开一条新闻：《${context.title}》${url}。优先围绕这条回答。`
}

function buildPrompt(message: string, context?: ChatRequest["context"], contexts?: ChatRequest["contexts"]): string {
  if (contexts && contexts.length > 1) {
    const blocks = contexts.map((item, index) => {
      const title = item.title ?? `条目 ${index + 1}`
      const url = item.url ? `\n链接：${item.url}` : ""
      const body = item.content ? `\n内容摘要：${item.content.slice(0, 1200)}` : ""
      return `${index + 1}. ${title}${url}${body}`
    })
    return `下面是我选中的 ${contexts.length} 条报道：\n\n${blocks.join("\n\n")}\n\n我的问题：${message}`
  }

  if (!context?.content) return message
  return `这条新闻的内容摘要：\n${context.content.slice(0, 3000)}\n\n用户问题：${message}`
}

/** Flatten AI SDK steps into the shape the panel renders. */
function collectSteps(steps: readonly any[]): AgentStep[] {
  const collected: AgentStep[] = []
  const byCallId = new Map<string, AgentStep>()

  for (const step of steps ?? []) {
    for (const call of step?.toolCalls ?? []) {
      const entry: AgentStep = { tool: call.toolName, input: call.input, ok: true }
      byCallId.set(call.toolCallId, entry)
      collected.push(entry)
    }
    for (const result of step?.toolResults ?? []) {
      const entry = byCallId.get(result.toolCallId)
      if (entry) entry.summary = String(result.output ?? "").split("\n")[0].slice(0, 90)
    }
  }

  return collected
}

export interface BriefingSeed {
  id: string
  titles: string[]
}

export interface BriefingRunSuccess {
  ok: true
  summary: string
  model: string
  provider: string
  sourceCount: number
  steps: AgentStep[]
}

export interface BriefingRunFailure {
  ok: false
  reason: string
}

const BRIEFING_SYSTEM_PROMPT = `你是新闻简报助手。用户会给你过去若干天抓到的标题，按来源分组。

规则：
1. 先基于这些标题写简报；若某主题的条目太少或没有，用 search_news 工具去取更多（可限定 column）。工具调用合计控制在 4 次以内，搜不到就如实说没搜到。
2. 纯文本输出，不要 markdown 强调符号（**、##），分点用短横线开头。
3. 按主题分组，每组 2-3 条，每条一句话，句末标出来源。
4. 总共 400 字以内；不要编造条目或链接。`

/** Briefing generator that can reach the same news tools as the chat panel. */
export async function runBriefing(options: {
  days: number
  topic?: string
  seeds: BriefingSeed[]
}): Promise<BriefingRunSuccess | BriefingRunFailure> {
  const { days, topic, seeds } = options
  const providers = getLLMProviders()
  if (providers.length === 0) return { ok: false, reason: "没有配置任何 LLM provider" }

  const totalTitles = seeds.reduce((sum, seed) => sum + seed.titles.length, 0)
  const seedText = seeds
    .map(seed => `## ${seed.id}\n${seed.titles.slice(0, 40).map(title => `- ${title}`).join("\n")}`)
    .join("\n\n")
  const prompt = `过去 ${days} 天抓到 ${totalTitles} 条标题，来自 ${seeds.length} 个来源。${topic ? `聚焦主题：${topic}。` : ""}\n\n${seedText.slice(0, 8000)}`

  const failures: string[] = []

  for (const provider of providers) {
    try {
      const result = await generateText({
        model: toLanguageModel(provider),
        system: BRIEFING_SYSTEM_PROMPT,
        prompt,
        tools: newsTools,
        stopWhen: stepCountIs(AGENT_MAX_STEPS),
        maxOutputTokens: MAX_OUTPUT_TOKENS,
      })

      const steps = collectSteps(result.steps)
      console.log(`[agent/briefing] provider=${provider.name} model=${provider.model} steps=${steps.length}`)

      return {
        ok: true,
        summary: result.text?.trim() || "（工具跑完了，但模型没有给出简报）",
        model: provider.model,
        provider: provider.name,
        sourceCount: seeds.length,
        steps,
      }
    } catch (e) {
      const detail = e instanceof Error ? e.message : String(e)
      failures.push(`${provider.name}: ${detail.slice(0, 160)}`)
      console.error(`[agent/briefing] provider=${provider.name} failed:`, detail)
    }
  }

  return { ok: false, reason: failures.join(" | ") }
}

/** Try each configured provider in order; the first one that answers wins. */
export async function runNewsAgent(
  message: string,
  context?: ChatRequest["context"],
  history?: ChatRequest["history"],
  options: { userId?: string, contexts?: ChatRequest["contexts"] } = {},
): Promise<AgentRunResult> {
  const providers = getLLMProviders()
  if (providers.length === 0) return { ok: false, reason: "没有配置任何 LLM provider" }

  const failures: string[] = []
  const turns = trimHistoryForPrompt(history)
  const tools = options.userId ? createNewsTools({ userId: options.userId }) : newsTools
  const messages = [
    ...turns.map(turn => ({ role: turn.role, content: turn.content })),
    { role: "user" as const, content: buildPrompt(message, context, options.contexts) },
  ]

  for (const provider of providers) {
    try {
      const result = await generateText({
        model: toLanguageModel(provider),
        system: buildSystemPrompt(context, options.contexts),
        messages,
        tools,
        stopWhen: stepCountIs(AGENT_MAX_STEPS),
        maxOutputTokens: MAX_OUTPUT_TOKENS,
      })

      const steps = collectSteps(result.steps)
      console.log(`[agent/run] provider=${provider.name} model=${provider.model} steps=${steps.length}`)

      return {
        ok: true,
        reply: result.text?.trim() || "（工具跑完了，但模型没有给出回复）",
        model: provider.model,
        provider: provider.name,
        steps,
      }
    } catch (e) {
      const detail = e instanceof Error ? e.message : String(e)
      failures.push(`${provider.name}: ${detail.slice(0, 160)}`)
      console.error(`[agent/run] provider=${provider.name} failed:`, detail)
    }
  }

  return { ok: false, reason: failures.join(" | ") }
}
