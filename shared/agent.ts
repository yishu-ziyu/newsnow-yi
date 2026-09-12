import process from "node:process"

// --- Provider types ---

export interface LLMProvider {
  name: string
  apiKey: string
  baseUrl: string
  model: string
  protocol: "openai" | "anthropic"
}

export interface LLMConfig {
  providers: LLMProvider[]
  enabled: boolean
}

// --- Built-in provider defaults ---

const FALLBACK_PROVIDERS = {
  minimax: {
    baseUrl: "https://api.minimaxi.com/anthropic",
    model: "MiniMax-M3",
    protocol: "anthropic" as const,
  },
  deepseek: {
    baseUrl: "https://api.deepseek.com/v1",
    model: "deepseek-v4-pro",
    protocol: "openai" as const,
  },
  agnes: {
    baseUrl: "https://apihub.agnes-ai.com/v1",
    model: "agnes-2.0-flash",
    protocol: "openai" as const,
    // Agnes free-tier key (公测期 $0). Override via NEWSNOW_LLM_FALLBACK_AGNES.
    defaultKey: "sk-g8xSqyMHEcOVtaKA3MqUFWZKApt6LNOA1JQwT8CBabi1iaRm",
  },
}

// --- Helpers ---

function detectProtocol(url: string): "openai" | "anthropic" {
  if (url.includes("anthropic") || url.includes("minimaxi")) return "anthropic"
  return "openai"
}

function normalizeUrl(url: string): string {
  if (!url) return "https://api.openai.com/v1"
  const trimmed = url.replace(/\/+$/, "")
  if (detectProtocol(trimmed) === "anthropic") return trimmed
  if (!trimmed.endsWith("/v1")) return `${trimmed}/v1`
  return trimmed
}

// --- Provider config ---

export function getLLMProviders(): LLMProvider[] {
  const providers: LLMProvider[] = []

  // 1. Primary: configured via env vars
  const primaryKey = process.env.NEWSNOW_LLM_API_KEY
  if (primaryKey) {
    providers.push({
      name: "primary",
      apiKey: primaryKey,
      baseUrl: normalizeUrl(process.env.NEWSNOW_LLM_API_URL || ""),
      model: process.env.NEWSNOW_LLM_MODEL || "gpt-4o-mini",
      protocol: detectProtocol(process.env.NEWSNOW_LLM_API_URL || "https://api.openai.com/v1"),
    })
  }

  // 2. Optional: MiniMax fallback
  if (process.env.NEWSNOW_LLM_FALLBACK_MINIMAX) {
    providers.push({
      name: "minimax",
      apiKey: process.env.NEWSNOW_LLM_FALLBACK_MINIMAX,
      ...FALLBACK_PROVIDERS.minimax,
    })
  }

  // 3. Optional: DeepSeek fallback
  if (process.env.NEWSNOW_LLM_FALLBACK_DEEPSEEK) {
    providers.push({
      name: "deepseek",
      apiKey: process.env.NEWSNOW_LLM_FALLBACK_DEEPSEEK,
      ...FALLBACK_PROVIDERS.deepseek,
    })
  }

  // 4. Always-on: Agnes (free tier, $0)
  providers.push({
    name: "agnes",
    apiKey: process.env.NEWSNOW_LLM_FALLBACK_AGNES || FALLBACK_PROVIDERS.agnes.defaultKey,
    ...FALLBACK_PROVIDERS.agnes,
  })

  return providers
}

/**
 * The AI SDK appends `/messages` to the base URL, while the Anthropic-compatible
 * gateways we talk to (MiniMax) live under `/anthropic/v1`. Hand-rolled
 * callLLM() appends the whole `/v1/messages` itself, so it keeps the raw URL.
 */
export function anthropicMessagesBaseUrl(url: string): string {
  const trimmed = url.replace(/\/+$/, "")
  return trimmed.endsWith("/v1") ? trimmed : `${trimmed}/v1`
}

export function getLLMConfig(): LLMConfig {
  const providers = getLLMProviders()
  return { providers, enabled: providers.length > 0 }
}

// --- LLM call helper (handles both OpenAI-compatible and Anthropic-compatible) ---

export async function callLLM(
  provider: LLMProvider,
  systemPrompt: string,
  userContent: Array<{ type: string, text: string }>,
): Promise<string> {
  if (provider.protocol === "anthropic") {
    const resp = await fetch(`${provider.baseUrl}/v1/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": provider.apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: provider.model,
        max_tokens: 1024,
        system: systemPrompt,
        messages: [{ role: "user", content: userContent }],
      }),
    })
    if (!resp.ok) {
      const text = await resp.text().catch(() => "")
      throw new Error(`Anthropic HTTP ${resp.status}: ${text.slice(0, 200)}`)
    }
    const data = await resp.json() as { content: Array<{ text: string }> }
    return data.content?.[0]?.text || "（无回复）"
  }

  // OpenAI-compatible
  const resp = await fetch(`${provider.baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${provider.apiKey}`,
    },
    body: JSON.stringify({
      model: provider.model,
      max_tokens: 1024,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userContent.map(p => p.text).join("\n") },
      ],
    }),
  })
  if (!resp.ok) {
    const text = await resp.text().catch(() => "")
    throw new Error(`OpenAI HTTP ${resp.status}: ${text.slice(0, 200)}`)
  }
  const data = await resp.json() as { choices: Array<{ message: { content: string } }> }
  return data.choices?.[0]?.message?.content || "（无回复）"
}

// --- Existing types ---

export interface ChatTurn {
  role: "user" | "assistant"
  content: string
}

export interface ChatRequest {
  message: string
  /** Earlier turns, oldest first. The server only keeps the newest few. */
  history?: ChatTurn[]
  context?: {
    title?: string
    url?: string
    content?: string
  }
  /** Two or more articles turn the turn into a cross-source comparison. */
  contexts?: Array<{
    title?: string
    url?: string
    content?: string
  }>
}

/** Fixed Semaform headings for a compare reply. Order is the product contract. */
export const SEMAFORM_HEADINGS = ["事实", "各源口径", "差异"] as const

export const COMPARE_USER_PROMPT = "按三段对比这几条：事实、各源口径、差异。数字和时间对不上的要写出来。"

export const COMPARE_SYSTEM_RULE = `本次是对比分析。先用一句话结论，再按三个标题输出（每个标题单独成行，可用 ##）：

事实
各源口径
差异

事实：只写各方都承认或可核对的内容。
各源口径：按来源分点，写各自强调什么、回避什么。
差异：数字、时间线、因果上的矛盾或缺口。信息不足写「未提及」，不要编，不要表格。`

/** True when the reply already has the three Semaform headings as their own lines. */
export function hasSemaformSections(text: string): boolean {
  if (!text) return false
  return SEMAFORM_HEADINGS.every(heading => hasSemaformHeading(text, heading))
}

function hasSemaformHeading(text: string, heading: string): boolean {
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  return new RegExp(`(^|\\n)\\s*#{0,3}\\s*${escaped}\\s*$`, "m").test(text)
}

/** One tool call the agent made while answering. */
export interface AgentStep {
  tool: string
  input?: unknown
  ok: boolean
  /** First line of the tool result, for the panel. */
  summary?: string
  /** Matches start/done events for the same call while streaming. */
  id?: string
}

const TOOL_LABELS: Record<string, string> = {
  search_news: "搜索新闻",
  list_sources: "列出源",
  get_source_items: "取源条目",
  create_tracker: "建立追踪",
}

export function toolLabel(tool: string): string {
  return TOOL_LABELS[tool] ?? tool
}

/** Chip text: the search query, not three identical 「搜索新闻」. */
export function toolChipLabel(step: { tool: string, input?: unknown }): string {
  if (step.input && typeof step.input === "object") {
    const input = step.input as Record<string, unknown>
    if (step.tool === "search_news" && input.query) return String(input.query)
    if (step.tool === "get_source_items" && input.id) return String(input.id)
  }
  return toolLabel(step.tool)
}

/** Follow-ups still have to hit the tools — MiniMax otherwise invents 「无结果」. */
export function shouldForceNewsTool(message: string): boolean {
  return /今天|最近|现在|搜|热点|大事|有什么|跟进|再挖|递归|盯|细节|后续|再看|具体看|再查/.test(message)
}

export function mockAgentReply(
  message: string,
  context?: ChatRequest["context"],
  degradedReason = "没有可用的模型",
): ChatResponse {
  const titleHint = context?.title ? `关于"${context.title}"` : ""
  return {
    reply: `[mock] 收到你的消息${titleHint}："${message.slice(0, 50)}${message.length > 50 ? "..." : ""}"。当前没有可用的模型，这条是本地占位回复。配置 NEWSNOW_LLM_API_KEY 或 NEWSNOW_LLM_FALLBACK_MINIMAX 后启用真实回答。`,
    model: "mock",
    mock: true,
    degradedReason,
    steps: [],
  }
}

/** Server → panel events over SSE (`data: <json>`). */
export type AgentStreamEvent =
  | { type: "start", provider: string, model: string }
  | { type: "reasoning", delta: string }
  | { type: "tool", id: string, tool: string, status: "start" | "done" | "error", input?: unknown, summary?: string }
  | { type: "text", delta: string }
  | { type: "replace", reply: string }
  | { type: "done", reply: string, steps: AgentStep[], provider?: string, model: string, mock?: boolean, degradedReason?: string }
  | { type: "error", reason: string }

export interface AgentStreamState {
  content: string
  steps: AgentStep[]
  provider?: string
  model?: string
  mock?: boolean
  degradedReason?: string
  streaming?: boolean
  reasoning?: string
}

export function parseAgentSseBlock(block: string): AgentStreamEvent | null {
  const data = block
    .split("\n")
    .filter(line => line.startsWith("data:"))
    .map(line => line.slice(5).trimStart())
    .join("\n")
  if (!data || data === "[DONE]") return null
  try {
    const parsed = JSON.parse(data) as { type?: unknown }
    if (!parsed || typeof parsed !== "object" || typeof parsed.type !== "string") return null
    return parsed as AgentStreamEvent
  } catch {
    return null
  }
}

export function splitSseBuffer(buffer: string): { events: AgentStreamEvent[], rest: string } {
  const parts = buffer.split("\n\n")
  const rest = parts.pop() ?? ""
  const events: AgentStreamEvent[] = []
  for (const part of parts) {
    const event = parseAgentSseBlock(part)
    if (event) events.push(event)
  }
  return { events, rest }
}

export function applyAgentStreamEvent(state: AgentStreamState, event: AgentStreamEvent): AgentStreamState {
  switch (event.type) {
    case "start":
      return { ...state, provider: event.provider, model: event.model, streaming: true }
    case "reasoning":
      return { ...state, reasoning: `${state.reasoning ?? ""}${event.delta}`, streaming: true }
    case "tool": {
      const steps = [...state.steps]
      const index = event.id ? steps.findIndex(step => step.id === event.id) : -1
      const previous = index >= 0 ? steps[index] : undefined
      const next: AgentStep = {
        id: event.id,
        tool: event.tool,
        input: event.input ?? previous?.input,
        ok: event.status !== "error",
        summary: event.summary ?? previous?.summary,
      }
      if (index >= 0) steps[index] = { ...previous, ...next }
      else steps.push(next)
      return { ...state, steps, streaming: true }
    }
    case "text":
      return { ...state, content: `${state.content}${event.delta}`, streaming: true }
    case "replace":
      return { ...state, content: event.reply, streaming: true }
    case "done":
      return {
        ...state,
        content: event.reply || state.content,
        steps: event.steps?.length ? event.steps : state.steps,
        provider: event.provider ?? state.provider,
        model: event.model ?? state.model,
        mock: event.mock,
        degradedReason: event.degradedReason,
        streaming: false,
      }
    case "error":
      return {
        ...state,
        streaming: false,
        mock: true,
        degradedReason: event.reason,
        content: state.content || `抱歉，请求失败了（${event.reason}）。请稍后再试。`,
      }
  }
}

export interface ChatResponse {
  reply: string
  model: string
  mock: boolean
  provider?: string
  /** Tool calls made for this reply (empty for a plain answer). */
  steps?: AgentStep[]
  /** Why the reply is a mock, when mock is true. */
  degradedReason?: string
}

/** Group tool calls by name so the panel can show "调了 3 次工具 · search_news ×2". */
export function summarizeSteps(steps: Array<{ tool: string }> = []): Array<{ label: string, count: number }> {
  const counts = new Map<string, number>()
  for (const step of steps) {
    counts.set(step.tool, (counts.get(step.tool) ?? 0) + 1)
  }
  return [...counts.entries()].map(([label, count]) => ({ label, count }))
}

export interface BriefingRequest {
  topic?: string
  days?: number
}

/** Message shape we persist for the agent panel (client adds its own id). */
export interface AgentChatMessage {
  role: "user" | "assistant"
  content: string
  timestamp: number
  context?: {
    title?: string
    url?: string
  }
  mock?: boolean
  steps?: AgentStep[]
  provider?: string
  model?: string
}

const HISTORY_LIMIT = 40
const HISTORY_CONTENT_LIMIT = 4000
const PROMPT_HISTORY_LIMIT = 8
const PROMPT_TURN_LIMIT = 1500

/**
 * Pick the turns that go back to the model: newest few, no placeholder
 * answers, each turn capped so a long reply cannot blow up the prompt.
 */
export function trimHistoryForPrompt(history: unknown, limit = PROMPT_HISTORY_LIMIT): ChatTurn[] {
  if (!Array.isArray(history)) return []

  return history
    .filter((turn): turn is Record<string, any> => !!turn && typeof turn === "object" && (turn.role === "user" || turn.role === "assistant") && typeof turn.content === "string")
    .filter(turn => turn.mock !== true && !turn.content.startsWith("[mock]"))
    .slice(-limit)
    .map(turn => ({
      role: turn.role as ChatTurn["role"],
      content: turn.content.slice(0, PROMPT_TURN_LIMIT),
    }))
}

/**
 * Bound what we write to the database: keep the newest messages, cut runaway
 * content, drop client-only fields. Pure so it can be unit tested.
 */
export function trimAgentHistory(messages: unknown, limit = HISTORY_LIMIT): AgentChatMessage[] {
  if (!Array.isArray(messages)) return []

  return messages
    .filter((m): m is Record<string, any> => !!m && typeof m === "object" && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .slice(-limit)
    .map(m => ({
      role: m.role,
      content: m.content.slice(0, HISTORY_CONTENT_LIMIT),
      timestamp: typeof m.timestamp === "number" ? m.timestamp : Date.now(),
      ...(m.context?.title || m.context?.url
        ? { context: { title: m.context?.title, url: m.context?.url } }
        : {}),
      ...(m.role === "assistant"
        ? {
            ...(m.mock ? { mock: true } : {}),
            ...(Array.isArray(m.steps) && m.steps.length ? { steps: m.steps } : {}),
            ...(m.provider ? { provider: m.provider } : {}),
            ...(m.model ? { model: m.model } : {}),
          }
        : {}),
    }))
}

export interface AgentHistoryResponse {
  messages: AgentChatMessage[]
  updatedTime: number
  /** false when nobody is logged in (dev without login config). */
  persisted: boolean
}

export interface BriefingResponse {
  summary: string
  model: string
  mock: boolean
  sourceCount: number
  provider?: string
  /** Tool calls the briefing made while gathering material. */
  steps?: AgentStep[]
  /** Why the summary is a placeholder, when mock is true. */
  degradedReason?: string
}
