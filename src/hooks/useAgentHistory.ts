import type { AgentChatMessage, AgentHistoryResponse } from "@shared/agent"
import type { ChatMessage } from "~/atoms/agent-panel"
import { safeParseString } from "~/utils"

function authHeader(): Record<string, string> {
  const jwt = safeParseString(localStorage.getItem("jwt"))
  return jwt ? { Authorization: `Bearer ${jwt}` } : {}
}

/**
 * Conversation history lives in the `agent_history` table. Without a login
 * (dev has no login config) the API answers `persisted: false` and we simply
 * keep the panel in-memory.
 */
export async function loadAgentHistory(): Promise<ChatMessage[]> {
  if (!safeParseString(localStorage.getItem("jwt"))) return []

  try {
    const res = await myFetch("/agent/history", { headers: authHeader() }) as AgentHistoryResponse
    if (!res?.persisted) return []
    return (res.messages ?? []).map((message: AgentChatMessage) => ({
      ...message,
      id: crypto.randomUUID(),
    }))
  } catch {
    return []
  }
}

export async function saveAgentHistory(messages: ChatMessage[]): Promise<boolean> {
  if (!safeParseString(localStorage.getItem("jwt")) || messages.length === 0) return false

  try {
    const res = await myFetch("/agent/history", {
      method: "POST",
      headers: authHeader(),
      body: { messages },
    }) as { persisted?: boolean }
    return res?.persisted === true
  } catch {
    return false
  }
}
