import type { ChatRequest, ChatResponse } from "@shared/agent"
import { runNewsAgent } from "#/utils/agent-runner"

export default defineEventHandler<{ body: ChatRequest, response: ChatResponse }>(async (event) => {
  const body = await readBody(event)
  const { message, context, history, contexts } = body
  const user = event.context.user as { id?: string } | undefined

  if (!message || typeof message !== "string" || message.trim().length === 0) {
    throw createError({
      statusCode: 400,
      message: "message is required",
    })
  }

  const result = await runNewsAgent(message.trim(), context, history, { userId: user?.id, contexts })

  if (result.ok) {
    return {
      reply: result.reply,
      model: result.model,
      provider: result.provider,
      mock: false,
      steps: result.steps,
    } satisfies ChatResponse
  }

  return mockChatReply(message, context, result.reason)
})

function mockChatReply(
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
