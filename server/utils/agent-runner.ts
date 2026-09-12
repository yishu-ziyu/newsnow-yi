import { Brand } from "@shared/brand"
import { generateText, stepCountIs, streamText } from "ai"
import { createAnthropic } from "@ai-sdk/anthropic"
import { createOpenAICompatible } from "@ai-sdk/openai-compatible"
import { type AgentStep, type AgentStreamEvent, COMPARE_SYSTEM_RULE, type ChatRequest, type LLMProvider, anthropicMessagesBaseUrl, getLLMProviders, hasSemaformSections, shouldForceNewsTool, trimHistoryForPrompt } from "@shared/agent"
import { resolveNewsSearchQuery } from "@shared/news-search"
import { createNewsTools, newsTools, searchNews } from "#/utils/news-tools"

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

const AGENT_SYSTEM_PROMPT = `你是 ${Brand.name} 的新闻助手，帮用户理解和梳理当前抓到的资讯。

你可以调用这些工具：
- list_sources：看有哪些源（可按栏目）
- get_source_items：取某个源当前的条目
- search_news：按关键词跨源搜索

规则：
1. 每一轮按当前问题查。换了主题、问今天/最近/有什么，必须重新调 search_news；上一轮的结论不是这一轮的证据。
2. 引用写「标题（来源）」；不要贴 http 链接；绝不编造条目或数字。
3. 先给结论，再列证据；中文，简洁。纯文本，不要 **、##。不要写「我先搜一下」。
4. 没调工具就不许说「没搜到/无结果」。工具真的空才说没查到，并给可换的关键词。
5. 同一关键词不要连搜三次；换关键词最多两次。搜到够用的条目就停。
6. 用户要盯一个主题时，调 create_tracker，不要只口头承诺。`

function buildSystemPrompt(context?: ChatRequest["context"], contexts?: ChatRequest["contexts"]): string {
  const compare = (contexts?.length ?? 0) > 1
  const compareRule = compare ? `\n\n${COMPARE_SYSTEM_RULE}` : ""

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

function firstLine(value: unknown): string {
  return String(value ?? "").split("\n")[0].slice(0, 90)
}

function prepareNewsStep(message: string) {
  if (!shouldForceNewsTool(message)) return undefined
  return ({ stepNumber }: { stepNumber: number }) =>
    stepNumber === 0 ? { toolChoice: "required" as const } : undefined
}

async function prefetchNewsSearch(
  message: string,
  emit?: AgentStreamEmit,
  history?: ChatRequest["history"],
): Promise<{ block: string, step: AgentStep } | null> {
  if (!shouldForceNewsTool(message)) return null
  const query = resolveNewsSearchQuery(message, history)
  if (!query) return null

  const step: AgentStep = { id: "prefetch-search", tool: "search_news", input: { query }, ok: true }
  await emit?.({ type: "tool", id: step.id!, tool: "search_news", status: "start", input: { query } })
  try {
    const { scanned, scope, matches } = await searchNews(query, { limit: 10 })
    step.summary = matches.length ? `匹配 ${matches.length} 条` : `没搜到「${query}」`
    await emit?.({ type: "tool", id: step.id!, tool: "search_news", status: "done", input: { query }, summary: step.summary })
    const block = matches.length
      ? `已检索「${query}」（${scope.length} 个源 / ${scanned} 条）命中：\n${matches.map(m => `- ${m.item.title}（${m.item.source}）`).join("\n")}`
      : `已检索「${query}」，没有命中。可以换关键词再调 search_news。`
    return { block, step }
  } catch (e) {
    step.ok = false
    await emit?.({ type: "tool", id: step.id!, tool: "search_news", status: "error", input: { query } })
    return { block: `检索「${query}」失败：${e instanceof Error ? e.message : String(e)}`, step }
  }
}

export type AgentStreamEmit = (event: AgentStreamEvent) => void | Promise<void>

/** Stream tool calls and token deltas to the panel. Same tools/cap as runNewsAgent. */
export async function streamNewsAgent(
  message: string,
  context: ChatRequest["context"] | undefined,
  history: ChatRequest["history"],
  options: { userId?: string, contexts?: ChatRequest["contexts"], abortSignal?: AbortSignal } = {},
  emit: AgentStreamEmit,
): Promise<AgentRunResult> {
  const providers = getLLMProviders()
  if (providers.length === 0) return { ok: false, reason: "没有配置任何 LLM provider" }

  const failures: string[] = []
  const turns = trimHistoryForPrompt(history)
  const tools = options.userId ? createNewsTools({ userId: options.userId }) : newsTools
  let prefetch: { block: string, step: AgentStep } | null | undefined

  for (const provider of providers) {
    let progressed = false
    const steps: AgentStep[] = []
    const byId = new Map<string, AgentStep>()
    let reply = ""

    const upsert = (id: string, tool: string, patch: Partial<AgentStep>) => {
      const previous = byId.get(id)
      const entry: AgentStep = { id, tool, ok: true, ...previous, ...patch }
      byId.set(id, entry)
      const index = steps.findIndex(step => step.id === id)
      if (index >= 0) steps[index] = entry
      else steps.push(entry)
      return entry
    }

    try {
      await emit({ type: "start", provider: provider.name, model: provider.model })
      if (prefetch === undefined) prefetch = await prefetchNewsSearch(message, emit, turns)
      if (prefetch?.step) {
        steps.push(prefetch.step)
        if (prefetch.step.id) byId.set(prefetch.step.id, prefetch.step)
      }

      const messages = [
        ...turns.map(turn => ({ role: turn.role, content: turn.content })),
        { role: "user" as const, content: prefetch?.block ? `${buildPrompt(message, context, options.contexts)}\n\n${prefetch.block}` : buildPrompt(message, context, options.contexts) },
      ]

      const result = streamText({
        model: toLanguageModel(provider),
        system: buildSystemPrompt(context, options.contexts),
        messages,
        tools,
        stopWhen: stepCountIs(AGENT_MAX_STEPS),
        maxOutputTokens: MAX_OUTPUT_TOKENS,
        abortSignal: options.abortSignal,
        prepareStep: prefetch?.step ? undefined : prepareNewsStep(message),
      })

      for await (const part of result.stream) {
        if (options.abortSignal?.aborted) break

        switch (part.type) {
          case "reasoning-delta":
            if (part.text) {
              progressed = true
              await emit({ type: "reasoning", delta: part.text })
            }
            break
          case "tool-input-start": {
            progressed = true
            upsert(part.id, part.toolName, { ok: true })
            await emit({ type: "tool", id: part.id, tool: part.toolName, status: "start" })
            break
          }
          case "tool-call": {
            progressed = true
            upsert(part.toolCallId, part.toolName, { input: part.input, ok: true })
            await emit({ type: "tool", id: part.toolCallId, tool: part.toolName, status: "start", input: part.input })
            break
          }
          case "tool-result": {
            const summary = firstLine(part.output)
            upsert(part.toolCallId, part.toolName, { input: part.input, summary, ok: true })
            await emit({ type: "tool", id: part.toolCallId, tool: part.toolName, status: "done", input: part.input, summary })
            break
          }
          case "tool-error": {
            upsert(part.toolCallId, part.toolName, { ok: false })
            await emit({ type: "tool", id: part.toolCallId, tool: part.toolName, status: "error", input: part.input })
            break
          }
          case "text-delta":
            if (part.text) {
              progressed = true
              reply += part.text
              await emit({ type: "text", delta: part.text })
            }
            break
        }
      }

      reply = reply.trim() || "（工具跑完了，但模型没有给出回复）"
      if (options.contexts && options.contexts.length > 1) {
        const rewritten = await ensureSemaform(toLanguageModel(provider), options.contexts, reply)
        if (rewritten !== reply) {
          reply = rewritten
          await emit({ type: "replace", reply })
        }
      }

      console.log(`[agent/stream] provider=${provider.name} model=${provider.model} steps=${steps.length}`)
      await emit({ type: "done", reply, steps, provider: provider.name, model: provider.model })
      return { ok: true, reply, model: provider.model, provider: provider.name, steps }
    } catch (e) {
      const detail = e instanceof Error ? e.message : String(e)
      if (options.abortSignal?.aborted) {
        await emit({ type: "done", reply: reply.trim(), steps, provider: provider.name, model: provider.model })
        return { ok: true, reply: reply.trim(), model: provider.model, provider: provider.name, steps }
      }
      failures.push(`${provider.name}: ${detail.slice(0, 160)}`)
      console.error(`[agent/stream] provider=${provider.name} failed:`, detail)
      if (progressed) {
        const fallback = reply.trim() || `抱歉，请求失败了（${detail.slice(0, 80)}）。请稍后再试。`
        await emit({ type: "error", reason: detail.slice(0, 160) })
        await emit({ type: "done", reply: fallback, steps, provider: provider.name, model: provider.model, mock: true, degradedReason: detail.slice(0, 160) })
        return { ok: true, reply: fallback, model: provider.model, provider: provider.name, steps }
      }
    }
  }

  return { ok: false, reason: failures.join(" | ") }
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
4. 总共 400 字以内；不要编造条目或链接。
5. 只输出简报正文。不要输出你的过程、计划、思考（例如「先搜索」「资料够了」「开始写」），也不要说自己在调用工具。`

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

/**
 * Compare replies must be three Semaform sections. If the model dumps a
 * table or a blob, one rewrite pass tries to recover the headings.
 */
async function ensureSemaform(
  model: ReturnType<typeof toLanguageModel>,
  contexts: NonNullable<ChatRequest["contexts"]>,
  reply: string,
): Promise<string> {
  if (hasSemaformSections(reply)) return reply

  const sources = contexts.map((c, i) => `${i + 1}. ${c.title ?? `条目 ${i + 1}`}`).join("\n")
  try {
    const result = await generateText({
      model,
      system: `把已有对比分析改写成 Semaform。${COMPARE_SYSTEM_RULE}只输出结论和三段，不要解释。`,
      prompt: `选中来源：\n${sources}\n\n已有分析：\n${reply.slice(0, 5000)}`,
      maxOutputTokens: MAX_OUTPUT_TOKENS,
    })
    const rewritten = result.text?.trim()
    return rewritten && hasSemaformSections(rewritten) ? rewritten : reply
  } catch (e) {
    console.error("[agent/compare] 兜底改写失败：", e instanceof Error ? e.message.slice(0, 120) : e)
    return reply
  }
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
  const prefetch = await prefetchNewsSearch(message, undefined, turns)
  const messages = [
    ...turns.map(turn => ({ role: turn.role, content: turn.content })),
    { role: "user" as const, content: prefetch?.block ? `${buildPrompt(message, context, options.contexts)}\n\n${prefetch.block}` : buildPrompt(message, context, options.contexts) },
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
        prepareStep: prefetch?.step ? undefined : prepareNewsStep(message),
      })

      const steps = [...(prefetch?.step ? [prefetch.step] : []), ...collectSteps(result.steps)]
      console.log(`[agent/run] provider=${provider.name} model=${provider.model} steps=${steps.length}`)

      let reply = result.text?.trim() || "（工具跑完了，但模型没有给出回复）"
      if (options.contexts && options.contexts.length > 1) {
        reply = await ensureSemaform(toLanguageModel(provider), options.contexts, reply)
      }

      return {
        ok: true,
        reply,
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
