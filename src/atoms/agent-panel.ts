import { atom } from "jotai"
import type { NewsItem } from "@shared/types"

export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: number
  context?: {
    title?: string
    url?: string
    content?: string
  }
}

export interface AgentPanelState {
  open: boolean
  messages: ChatMessage[]
  loading: boolean
  activeItem: NewsItem | null
}

const initialState: AgentPanelState = {
  open: false,
  messages: [],
  loading: false,
  activeItem: null,
}

export const agentPanelAtom = atom<AgentPanelState>(initialState)

// Action types
type Action =
  | { type: "open", item: NewsItem }
  | { type: "open_chat" }
  | { type: "close" }
  | { type: "set_messages", messages: ChatMessage[] }
  | { type: "add_user", content: string, context?: ChatMessage["context"] }
  | { type: "add_assistant", content: string }
  | { type: "set_loading", loading: boolean }
  | { type: "clear" }

// Write-only atom for actions
export const agentPanelActionsAtom = atom(null, (get, set, action: Action) => {
  const state = get(agentPanelAtom)

  switch (action.type) {
    case "open":
      set(agentPanelAtom, { ...state, open: true, activeItem: action.item, messages: [] })
      break
    case "open_chat":
      set(agentPanelAtom, { ...state, open: true, activeItem: null })
      break
    case "close":
      set(agentPanelAtom, { ...state, open: false })
      break
    case "set_messages":
      set(agentPanelAtom, { ...state, messages: action.messages })
      break
    case "add_user":
      set(agentPanelAtom, {
        ...state,
        messages: [...state.messages, {
          id: crypto.randomUUID(),
          role: "user",
          content: action.content,
          timestamp: Date.now(),
          context: action.context,
        }],
      })
      break
    case "add_assistant":
      set(agentPanelAtom, {
        ...state,
        messages: [...state.messages, {
          id: crypto.randomUUID(),
          role: "assistant",
          content: action.content,
          timestamp: Date.now(),
        }],
      })
      break
    case "set_loading":
      set(agentPanelAtom, { ...state, loading: action.loading })
      break
    case "clear":
      set(agentPanelAtom, { ...state, messages: [] })
      break
  }
})

// Convenience action creators
export function openAgentPanel(item: NewsItem): Action {
  return { type: "open", item }
}

export function openAgentChat(): Action {
  return { type: "open_chat" }
}

export function closeAgentPanel(): Action {
  return { type: "close" }
}

export function setAgentMessages(messages: ChatMessage[]): Action {
  return { type: "set_messages", messages }
}

export function addUserMessage(content: string, context?: ChatMessage["context"]): Action {
  return { type: "add_user", content, context }
}

export function addAssistantMessage(content: string): Action {
  return { type: "add_assistant", content }
}

export function setAgentLoading(loading: boolean): Action {
  return { type: "set_loading", loading }
}

export function clearAgentMessages(): Action {
  return { type: "clear" }
}
