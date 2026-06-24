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

export interface ChatRequest {
  message: string
  context?: {
    title?: string
    url?: string
    content?: string
  }
}

export interface ChatResponse {
  reply: string
  model: string
  mock: boolean
  provider?: string
}

export interface BriefingRequest {
  topic?: string
  days?: number
}

export interface BriefingResponse {
  summary: string
  model: string
  mock: boolean
  sourceCount: number
}
