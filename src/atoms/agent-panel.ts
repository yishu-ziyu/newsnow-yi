import { atom } from "jotai"
import type { AgentStep } from "@shared/agent"
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
  /** True when the backend answered with the local placeholder instead of a model. */
  mock?: boolean
  /** Tool calls the agent made for this reply. */
  steps?: AgentStep[]
  provider?: string
  model?: string
  degradedReason?: string
}

/** Extra fields the backend returns alongside a reply. */
export type AssistantMeta = Pick<ChatMessage, "mock" | "steps" | "provider" | "model" | "degradedReason">

export interface AgentPanelState {
  open: boolean
  messages: ChatMessage[]
  loading: boolean
  activeItem: NewsItem | null
  /** Items selected for a cross-source comparison (2+). */
  activeItems: NewsItem[]
  view: "chat" | "trackers"
}

const initialState: AgentPanelState = {
  open: false,
  messages: [],
  loading: false,
  activeItem: null,
  activeItems: [],
  view: "chat",
}

export const agentPanelAtom = atom<AgentPanelState>(initialState)

// Action types
type Action =
  | { type: "open", item: NewsItem }
  | { type: "open_compare", items: NewsItem[] }
  | { type: "open_chat" }
  | { type: "close" }
  | { type: "set_view", view: AgentPanelState["view"] }
  | { type: "set_messages", messages: ChatMessage[] }
  | { type: "add_user", content: string, context?: ChatMessage["context"] }
  | { type: "add_assistant", content: string, meta?: AssistantMeta }
  | { type: "set_loading", loading: boolean }
  | { type: "clear" }

// Write-only atom for actions
export const agentPanelActionsAtom = atom(null, (get, set, action: Action) => {
  const state = get(agentPanelAtom)

  switch (action.type) {
    case "open":
      set(agentPanelAtom, { ...state, open: true, activeItem: action.item, activeItems: [], messages: [] })
      break
    case "open_compare":
      if (action.items.length < 2) return
      set(agentPanelAtom, { ...state, open: true, activeItem: null, activeItems: action.items, view: "chat" })
      break
    case "open_chat":
      set(agentPanelAtom, { ...state, open: true, activeItem: null, activeItems: [] })
      break
    case "set_view":
      set(agentPanelAtom, { ...state, view: action.view })
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
          ...action.meta,
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

export function openComparePanel(items: NewsItem[]): Action {
  return { type: "open_compare", items }
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

export function addAssistantMessage(content: string, meta?: AssistantMeta): Action {
  return { type: "add_assistant", content, meta }
}

export function setAgentLoading(loading: boolean): Action {
  return { type: "set_loading", loading }
}

export function clearAgentMessages(): Action {
  return { type: "clear" }
}
