import { type ChatRequest, type ChatResponse, callLLM, getLLMProviders } from "@shared/agent"

export default defineEventHandler<{ body: ChatRequest, response: ChatResponse }>(async (event) => {
  const body = await readBody(event)
  const { message, context } = body

  if (!message || typeof message !== "string" || message.trim().length === 0) {
    throw createError({
      statusCode: 400,
      message: "message is required",
    })
  }

  const providers = getLLMProviders()

  if (providers.length === 0) {
    return mockChatReply(message, context)
  }

  const systemPrompt = buildSystemPrompt(context)
  const userContent = buildUserContent(message, context)

  for (const provider of providers) {
    try {
      const reply = await callLLM(provider, systemPrompt, userContent)
      console.log(`[agent/chat] provider=${provider.name} model=${provider.model} ok`)
      return {
        reply,
        model: provider.model,
        mock: false,
        provider: provider.name,
      }
    } catch (e) {
      console.error(`[agent/chat] provider=${provider.name} failed:`, e)
      continue
    }
  }

  // All providers failed — mock fallback
  console.error("[agent/chat] all providers failed, returning mock")
  return mockChatReply(message, context)
})

function mockChatReply(message: string, context?: ChatRequest["context"], model = "mock"): ChatResponse {
  const titleHint = context?.title ? `关于"${context.title}"` : ""
  return {
    reply: `[mock] 收到你的消息${titleHint}："${message.slice(0, 50)}${message.length > 50 ? "..." : ""}"。当前未配置 LLM API（设置 NEWSNOW_LLM_API_KEY 环境变量启用真实对话）。`,
    model,
    mock: true,
  }
}

function buildSystemPrompt(context?: ChatRequest["context"]): string {
  const ctx = context?.title ? `用户正在阅读文章《${context.title}》(${context.url || ""})。` : ""
  return `你是一个新闻助手，帮助用户理解和讨论新闻内容。${ctx}请用简洁、客观的方式回答。`
}

function buildUserContent(message: string, context?: ChatRequest["context"]): Array<{ type: string, text: string }> {
  const parts: Array<{ type: string, text: string }> = []

  if (context?.content) {
    parts.push({
      type: "text",
      text: `文章内容摘要：\n${context.content.slice(0, 4000)}`,
    })
  }

  parts.push({
    type: "text",
    text: message,
  })

  return parts
}
