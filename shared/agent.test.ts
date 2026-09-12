import { beforeEach, describe, expect, it, vi } from "vitest"
import { anthropicMessagesBaseUrl, applyAgentStreamEvent, hasSemaformSections, parseAgentSseBlock, shouldForceNewsTool, splitSseBuffer, summarizeSteps, toolChipLabel, toolLabel, trimAgentHistory, trimHistoryForPrompt } from "@shared/agent"
import { TRACKER_DEFAULT_INTERVAL_MS, TRACKER_MIN_INTERVAL_MS, clampInterval } from "@shared/tracker"

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

describe("anthropicMessagesBaseUrl", () => {
  it("appends /v1 for gateways that only expose the bare path", () => {
    expect(anthropicMessagesBaseUrl("https://api.minimaxi.com/anthropic")).toBe("https://api.minimaxi.com/anthropic/v1")
  })

  it("keeps an explicit /v1 and ignores trailing slashes", () => {
    expect(anthropicMessagesBaseUrl("https://api.minimaxi.com/anthropic/v1/")).toBe("https://api.minimaxi.com/anthropic/v1")
  })

  it("leaves a plain OpenAI-shaped host alone", () => {
    expect(anthropicMessagesBaseUrl("https://api.anthropic.com")).toBe("https://api.anthropic.com/v1")
  })
})

describe("trimAgentHistory", () => {
  const msg = (role: string, content: string, extra: Record<string, unknown> = {}) => ({ role, content, timestamp: 1, ...extra })

  it("keeps only the newest messages up to the limit", () => {
    const many = Array.from({ length: 50 }, (_, i) => msg("user", `m${i}`))
    const trimmed = trimAgentHistory(many)
    expect(trimmed).toHaveLength(40)
    expect(trimmed.at(-1)!.content).toBe("m49")
  })

  it("drops client-only ids and article bodies but keeps the title", () => {
    const trimmed = trimAgentHistory([msg("user", "hi", { id: "abc", context: { title: "标题", url: "https://a/1", content: "很长的正文" } })])
    expect(trimmed[0]).not.toHaveProperty("id")
    expect(trimmed[0].context).toEqual({ title: "标题", url: "https://a/1" })
  })

  it("keeps mock flag and steps on assistant messages only", () => {
    const trimmed = trimAgentHistory([
      msg("assistant", "答案", { mock: true, steps: [{ tool: "search_news", ok: true }], provider: "minimax", model: "MiniMax-M3" }),
      msg("user", "问题", { mock: true }),
    ])
    expect(trimmed[0]).toMatchObject({ mock: true, provider: "minimax", model: "MiniMax-M3" })
    expect(trimmed[0].steps).toHaveLength(1)
    expect(trimmed[1]).not.toHaveProperty("mock")
  })

  it("cuts runaway content", () => {
    const trimmed = trimAgentHistory([msg("assistant", "x".repeat(9000))])
    expect(trimmed[0].content).toHaveLength(4000)
  })

  it("ignores junk input", () => {
    expect(trimAgentHistory(undefined)).toEqual([])
    expect(trimAgentHistory("nope")).toEqual([])
    expect(trimAgentHistory([{ role: "system", content: "x" }, null, { role: "user" }])).toEqual([])
  })
})

describe("trimHistoryForPrompt", () => {
  const turn = (role: string, content: string, extra: Record<string, unknown> = {}) => ({ role, content, ...extra })

  it("keeps the newest turns up to the limit", () => {
    const many = Array.from({ length: 12 }, (_, i) => turn(i % 2 ? "assistant" : "user", `t${i}`))
    const trimmed = trimHistoryForPrompt(many)
    expect(trimmed).toHaveLength(8)
    expect(trimmed.at(-1)!.content).toBe("t11")
  })

  it("drops placeholder answers so they do not poison the context", () => {
    const trimmed = trimHistoryForPrompt([
      turn("user", "问"),
      turn("assistant", "本地占位", { mock: true }),
      turn("user", "[mock] 旧格式占位"),
      turn("assistant", "真回答"),
    ])
    expect(trimmed.map(t => t.content)).toEqual(["问", "真回答"])
  })

  it("caps each turn", () => {
    expect(trimHistoryForPrompt([turn("assistant", "y".repeat(3000))])[0].content).toHaveLength(1500)
  })

  it("ignores junk", () => {
    expect(trimHistoryForPrompt(undefined)).toEqual([])
    expect(trimHistoryForPrompt([{ role: "system", content: "x" }, null])).toEqual([])
  })
})

describe("clampInterval", () => {
  it("defaults to a day", () => {
    expect(clampInterval(undefined)).toBe(TRACKER_DEFAULT_INTERVAL_MS)
  })
  it("refuses intervals faster than a minute", () => {
    expect(clampInterval(1000)).toBe(TRACKER_MIN_INTERVAL_MS)
    expect(clampInterval(-5)).toBe(TRACKER_MIN_INTERVAL_MS)
  })
  it("keeps sane values", () => {
    expect(clampInterval(3600000)).toBe(3600000)
  })
  it("falls back on junk", () => {
    expect(clampInterval(Number.NaN)).toBe(TRACKER_DEFAULT_INTERVAL_MS)
  })
})

describe("hasSemaformSections", () => {
  it("accepts the three headings as their own lines", () => {
    expect(hasSemaformSections("先看口径。\n\n## 事实\n都在谈同一场发布。\n\n## 各源口径\n- 酷安谈价格\n\n## 差异\n时间对不上")).toBe(true)
  })

  it("rejects a table-shaped compare reply", () => {
    expect(hasSemaformSections("| 维度 | 来源 | 说法 |\n|---|---|---|\n| 定价 | 酷安 | 15999 |")).toBe(false)
  })

  it("ignores the words when they are not headings", () => {
    expect(hasSemaformSections("事实是各源口径都有差异，但没有分段。")).toBe(false)
  })
})

describe("summarizeSteps", () => {
  it("groups repeats and keeps order", () => {
    expect(summarizeSteps([{ tool: "search_news" }, { tool: "list_sources" }, { tool: "search_news" }]))
      .toEqual([{ label: "search_news", count: 2 }, { label: "list_sources", count: 1 }])
  })

  it("handles empty input", () => {
    expect(summarizeSteps()).toEqual([])
    expect(summarizeSteps([])).toEqual([])
  })
})

describe("agent stream events", () => {
  it("parses an SSE data block and ignores a partial tail", () => {
    const { events, rest } = splitSseBuffer("data: {\"type\":\"text\",\"delta\":\"今\"}\n\ndata: {\"type\":\"text\",\"delta\":\"天")
    expect(events).toEqual([{ type: "text", delta: "今" }])
    expect(rest).toBe("data: {\"type\":\"text\",\"delta\":\"天")
    expect(parseAgentSseBlock("not-sse")).toBeNull()
  })

  it("applies tool start/done then text then done", () => {
    const empty = { content: "", steps: [] }
    const started = applyAgentStreamEvent(empty, { type: "start", provider: "minimax", model: "MiniMax-M3" })
    const calling = applyAgentStreamEvent(started, { type: "tool", id: "t1", tool: "search_news", status: "start", input: { query: "今天" } })
    const doneTool = applyAgentStreamEvent(calling, { type: "tool", id: "t1", tool: "search_news", status: "done", summary: "命中 8 条" })
    const text = applyAgentStreamEvent(doneTool, { type: "text", delta: "有" })
    const done = applyAgentStreamEvent(text, {
      type: "done",
      reply: "有几件大事。",
      steps: doneTool.steps,
      provider: "minimax",
      model: "MiniMax-M3",
    })
    expect(calling.steps).toHaveLength(1)
    expect(calling.steps[0].summary).toBeUndefined()
    expect(doneTool.steps[0].summary).toBe("命中 8 条")
    expect(text.content).toBe("有")
    expect(done.content).toBe("有几件大事。")
    expect(done.streaming).toBe(false)
  })

  it("labels known tools in Chinese", () => {
    expect(toolLabel("search_news")).toBe("搜索新闻")
    expect(toolLabel("unknown_tool")).toBe("unknown_tool")
  })

  it("puts the search query on the chip", () => {
    expect(toolChipLabel({ tool: "search_news", input: { query: "iPhone", limit: 10 } })).toBe("iPhone")
    expect(toolChipLabel({ tool: "search_news" })).toBe("搜索新闻")
    expect(toolChipLabel({ tool: "get_source_items", input: { id: "zhihu" } })).toBe("zhihu")
  })

  it("forces a tool on a fresh news ask, not on 翻译/要点", () => {
    expect(shouldForceNewsTool("今天有什么 iPhone 相关的新闻？")).toBe(true)
    expect(shouldForceNewsTool("是的，你可以做一些更详细的递归搜索。")).toBe(true)
    expect(shouldForceNewsTool("可以具体看一下细节吧和后续反应。")).toBe(true)
    expect(shouldForceNewsTool("这个被泄密是什么意思？")).toBe(false)
    expect(shouldForceNewsTool("请翻译成英文")).toBe(false)
    expect(shouldForceNewsTool("请用3条要点总结这篇新闻")).toBe(false)
  })
})
