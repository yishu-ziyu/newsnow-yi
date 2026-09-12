import { createEventStream } from "h3"
import type { ChatRequest, ChatResponse } from "@shared/agent"
import { mockAgentReply } from "@shared/agent"
import { runNewsAgent, streamNewsAgent } from "#/utils/agent-runner"

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

  const trimmed = message.trim()
  const accept = getHeader(event, "accept") || ""
  // nitro-go/vite 在 dev 里经常丢 Accept；面板用 ?stream=1 作可靠开关。
  const streamFlag = String((getQuery(event) as { stream?: unknown }).stream ?? "")
  const stream = accept.includes("text/event-stream") || streamFlag === "1" || streamFlag === "true"

  if (!stream) {
    const result = await runNewsAgent(trimmed, context, history, { userId: user?.id, contexts })
    if (result.ok) {
      return {
        reply: result.reply,
        model: result.model,
        provider: result.provider,
        mock: false,
        steps: result.steps,
      } satisfies ChatResponse
    }
    return mockAgentReply(trimmed, context, result.reason)
  }

  const eventStream = createEventStream(event)
  const abort = new AbortController()
  event.node?.req?.once?.("close", () => abort.abort())

  void (async () => {
    try {
      const result = await streamNewsAgent(
        trimmed,
        context,
        history,
        { userId: user?.id, contexts, abortSignal: abort.signal },
        event => eventStream.push(JSON.stringify(event)),
      )
      if (!result.ok) {
        const mock = mockAgentReply(trimmed, context, result.reason)
        await eventStream.push(JSON.stringify({
          type: "done",
          reply: mock.reply,
          steps: [],
          model: mock.model,
          mock: true,
          degradedReason: mock.degradedReason,
        }))
      }
    } catch (e) {
      const reason = e instanceof Error ? e.message : "生成失败"
      await eventStream.push(JSON.stringify({ type: "error", reason: reason.slice(0, 160) }))
    } finally {
      await eventStream.close()
    }
  })()

  return eventStream.send()
})
