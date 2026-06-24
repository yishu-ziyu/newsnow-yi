import { beforeEach, describe, expect, it, vi } from "vitest"

// getLLMProviders, getLLMConfig, callLLM are auto-injected via unimport from shared/ dir

const ORIGINAL_ENV = { ...process.env }

function resetEnv() {
  delete process.env.NEWSNOW_LLM_API_KEY
  delete process.env.NEWSNOW_LLM_API_URL
  delete process.env.NEWSNOW_LLM_MODEL
  delete process.env.NEWSNOW_LLM_FALLBACK_MINIMAX
  delete process.env.NEWSNOW_LLM_FALLBACK_DEEPSEEK
  delete process.env.NEWSNOW_LLM_FALLBACK_AGNES
}

beforeEach(() => {
  resetEnv()
  Object.assign(process.env, ORIGINAL_ENV)
  vi.restoreAllMocks()
})

describe("getLLMProviders", () => {
  it("always includes Agnes (free tier)", () => {
    const providers = getLLMProviders()
    const agnes = providers.find(p => p.name === "agnes")
    expect(agnes).toBeDefined()
    expect(agnes!.model).toBe("agnes-2.0-flash")
    expect(agnes!.baseUrl).toBe("https://apihub.agnes-ai.com/v1")
    expect(agnes!.protocol).toBe("openai")
  })

  it("uses built-in Agnes key by default", () => {
    const providers = getLLMProviders()
    const agnes = providers.find(p => p.name === "agnes")
    expect(agnes!.apiKey).toBeTruthy()
    expect(agnes!.apiKey).toContain("sk-")
  })

  it("uses custom Agnes key when env var set", () => {
    process.env.NEWSNOW_LLM_FALLBACK_AGNES = "custom-agnes-key"
    const providers = getLLMProviders()
    const agnes = providers.find(p => p.name === "agnes")
    expect(agnes!.apiKey).toBe("custom-agnes-key")
  })

  it("includes primary provider when API key is set", () => {
    process.env.NEWSNOW_LLM_API_KEY = "primary-key"
    process.env.NEWSNOW_LLM_API_URL = "https://api.openai.com/v1"
    process.env.NEWSNOW_LLM_MODEL = "gpt-4o-mini"
    const providers = getLLMProviders()
    const primary = providers.find(p => p.name === "primary")
    expect(primary).toBeDefined()
    expect(primary!.apiKey).toBe("primary-key")
    expect(primary!.baseUrl).toBe("https://api.openai.com/v1")
    expect(primary!.model).toBe("gpt-4o-mini")
    expect(primary!.protocol).toBe("openai")
  })

  it("detects anthropic protocol from URL", () => {
    process.env.NEWSNOW_LLM_API_KEY = "test-key"
    process.env.NEWSNOW_LLM_API_URL = "https://api.minimaxi.com/anthropic"
    const providers = getLLMProviders()
    const primary = providers.find(p => p.name === "primary")
    expect(primary!.protocol).toBe("anthropic")
  })

  it("normalizes URL with /v1 for OpenAI providers", () => {
    process.env.NEWSNOW_LLM_API_KEY = "test-key"
    process.env.NEWSNOW_LLM_API_URL = "https://api.deepseek.com"
    const providers = getLLMProviders()
    const primary = providers.find(p => p.name === "primary")
    expect(primary!.baseUrl).toBe("https://api.deepseek.com/v1")
  })

  it("does not normalize Anthropic URLs", () => {
    process.env.NEWSNOW_LLM_API_KEY = "test-key"
    process.env.NEWSNOW_LLM_API_URL = "https://api.minimaxi.com/anthropic"
    const providers = getLLMProviders()
    const primary = providers.find(p => p.name === "primary")
    expect(primary!.baseUrl).toBe("https://api.minimaxi.com/anthropic")
  })

  it("includes optional MiniMax when env var set", () => {
    process.env.NEWSNOW_LLM_FALLBACK_MINIMAX = "mx-key"
    const providers = getLLMProviders()
    const minimax = providers.find(p => p.name === "minimax")
    expect(minimax).toBeDefined()
    expect(minimax!.model).toBe("MiniMax-M3")
    expect(minimax!.protocol).toBe("anthropic")
  })

  it("skips MiniMax when env var not set", () => {
    const providers = getLLMProviders()
    expect(providers.find(p => p.name === "minimax")).toBeUndefined()
  })

  it("includes optional DeepSeek when env var set", () => {
    process.env.NEWSNOW_LLM_FALLBACK_DEEPSEEK = "ds-key"
    const providers = getLLMProviders()
    const ds = providers.find(p => p.name === "deepseek")
    expect(ds).toBeDefined()
    expect(ds!.model).toBe("deepseek-v4-pro")
    expect(ds!.protocol).toBe("openai")
  })

  it("returns ordered list: primary → optional fallbacks → Agnes", () => {
    process.env.NEWSNOW_LLM_API_KEY = "primary-key"
    process.env.NEWSNOW_LLM_FALLBACK_MINIMAX = "mx-key"
    process.env.NEWSNOW_LLM_FALLBACK_DEEPSEEK = "ds-key"
    const providers = getLLMProviders()
    const names = providers.map(p => p.name)
    expect(names).toEqual(["primary", "minimax", "deepseek", "agnes"])
  })

  it("returns only Agnes when no other env vars set", () => {
    const providers = getLLMProviders()
    expect(providers).toHaveLength(1)
    expect(providers[0].name).toBe("agnes")
  })

  it("getLLMConfig returns enabled with providers", () => {
    const config = getLLMConfig()
    expect(config.enabled).toBe(true)
    expect(config.providers.length).toBeGreaterThan(0)
  })
})

describe("callLLM", () => {
  const mockFetch = vi.fn()
  const systemPrompt = "test system"
  const userContent = [{ type: "text", text: "hello" }]

  beforeEach(() => {
    globalThis.fetch = mockFetch as typeof fetch
  })

  it("calls Anthropic endpoint and parses response", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ content: [{ text: "anthropic reply" }] }),
    })
    const reply = await callLLM(
      { name: "test", apiKey: "k", baseUrl: "https://api.minimaxi.com/anthropic", model: "test", protocol: "anthropic" },
      systemPrompt,
      userContent,
    )
    expect(reply).toBe("anthropic reply")
    expect(mockFetch).toHaveBeenCalledWith("https://api.minimaxi.com/anthropic/v1/messages", expect.any(Object))
    const headers = mockFetch.mock.calls[0][1]!.headers as Record<string, string>
    expect(headers["x-api-key"]).toBe("k")
    expect(headers["anthropic-version"]).toBe("2023-06-01")
    const body = JSON.parse(mockFetch.mock.calls[0][1]!.body as string)
    expect(body.system).toBe(systemPrompt)
    expect(body.messages).toEqual([{ role: "user", content: userContent }])
  })

  it("calls OpenAI endpoint and parses response", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ choices: [{ message: { content: "openai reply" } }] }),
    })
    const reply = await callLLM(
      { name: "test", apiKey: "k", baseUrl: "https://api.deepseek.com/v1", model: "test", protocol: "openai" },
      systemPrompt,
      userContent,
    )
    expect(reply).toBe("openai reply")
    expect(mockFetch).toHaveBeenCalledWith("https://api.deepseek.com/v1/chat/completions", expect.any(Object))
    const headers = mockFetch.mock.calls[0][1]!.headers as Record<string, string>
    expect(headers.Authorization).toBe("Bearer k")
    const body = JSON.parse(mockFetch.mock.calls[0][1]!.body as string)
    expect(body.messages).toEqual([
      { role: "system", content: systemPrompt },
      { role: "user", content: "hello" },
    ])
  })

  it("throws on HTTP error with status detail", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 429,
      text: async () => "rate limited",
    })
    await expect(
      callLLM(
        { name: "t", apiKey: "k", baseUrl: "https://api.openai.com/v1", model: "m", protocol: "openai" },
        systemPrompt,
        userContent,
      ),
    ).rejects.toThrow(/429/)
  })

  it("returns (无回复) when Anthropic content is empty", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ content: [] }),
    })
    const reply = await callLLM(
      { name: "t", apiKey: "k", baseUrl: "https://api.minimaxi.com/anthropic", model: "m", protocol: "anthropic" },
      systemPrompt,
      userContent,
    )
    expect(reply).toBe("（无回复）")
  })
})
