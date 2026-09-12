import process from "node:process"
import { type AgentHistoryResponse, trimAgentHistory } from "@shared/agent"
import { AgentHistoryTable } from "#/database/agent-history"

/**
 * Conversation history for the agent panel. Storage is the `agent_history`
 * table (one row per user) — not `user.data`, which /api/me/sync validates as
 * Record<string, string[]>.
 *
 * Without a logged-in user (dev has no login configured) we answer with
 * `persisted: false` instead of failing, so the panel keeps working.
 */
export default defineEventHandler<{ body: { messages?: unknown }, response: AgentHistoryResponse }>(async (event) => {
  const user = event.context.user as { id?: string } | undefined
  const db = await getDatabase()

  if (!user?.id || !db) {
    return { messages: [], updatedTime: 0, persisted: false }
  }

  const table = new AgentHistoryTable(db)
  if (process.env.INIT_TABLE !== "false") await table.init()

  if (event.method === "GET") {
    const { messages, updated } = await table.get(user.id)
    return { messages, updatedTime: updated, persisted: true }
  }

  const body = await readBody(event)
  const messages = trimAgentHistory(body?.messages)
  const updatedTime = await table.set(user.id, messages)
  return { messages, updatedTime, persisted: true }
})
