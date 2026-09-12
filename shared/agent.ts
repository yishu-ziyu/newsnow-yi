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

/** One tool call the agent made while answering. */
export interface AgentStep {
  tool: string
  input?: unknown
  ok: boolean
  /** First line of the tool result, for the panel. */
  summary?: string
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
