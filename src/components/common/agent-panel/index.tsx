import { useAtom, useSetAtom } from "jotai"
import { useCallback, useEffect, useRef } from "react"
import { clsx } from "clsx"
import { agentPanelActionsAtom, agentPanelAtom } from "~/atoms/agent-panel"

function formatTime(ts: number) {
  const d = new Date(ts)
  return d.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })
}

interface ChatMessageBubbleProps {
  message: import("~/atoms/agent-panel").ChatMessage
}

function ChatMessageBubble({ message }: ChatMessageBubbleProps) {
  const isUser = message.role === "user"
  return (
    <div className={clsx("flex flex-col gap-1", isUser ? "items-end" : "items-start")}>
      {message.context?.title && (
        <div className="text-xs text-neutral-400/70 max-w-[85%] truncate px-2">
          {message.context.title}
        </div>
      )}
      <div className={clsx(
        "max-w-[85%] px-3 py-2 rounded-2xl text-sm leading-relaxed",
        isUser
          ? "bg-primary/20 text-primary dark:bg-primary/30"
          : "bg-neutral-400/10 text-neutral-800 dark:text-neutral-200",
      )}
      >
        {message.content}
      </div>
      <span className="text-xs text-neutral-400/50 px-2">
        {formatTime(message.timestamp)}
        {message.context?.url && (
          <a
            href={message.context.url}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 underline opacity-60 hover:opacity-100"
          >
            原文
          </a>
        )}
      </span>
    </div>
  )
}

export function AgentPanel() {
  const [state] = useAtom(agentPanelAtom)
  const dispatch = useSetAtom(agentPanelActionsAtom)
  const panelRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [state.messages, scrollToBottom])

  // Auto-focus input when panel opens
  useEffect(() => {
    if (state.open) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [state.open])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && state.open) {
        dispatch({ type: "close" })
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [state.open, dispatch])

  // Send message to backend
  const sendMessage = useCallback(async (content: string) => {
    const activeItem = state.activeItem
    dispatch({ type: "add_user", content, context: activeItem
      ? {
          title: activeItem.title,
          url: activeItem.url,
          content: activeItem.extra?.hover || activeItem.title,
        }
      : undefined })

    dispatch({ type: "set_loading", loading: true })

    try {
      const response = await fetch("/api/agent/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: content,
          context: activeItem
            ? {
                title: activeItem.title,
                url: activeItem.url,
                content: activeItem.extra?.hover || activeItem.title,
              }
            : undefined,
        }),
      })
      const data = await response.json()
      dispatch({ type: "add_assistant", content: data.reply || "（无回复）" })
    } catch {
      dispatch({ type: "add_assistant", content: "抱歉，请求失败了。请稍后再试。" })
    } finally {
      dispatch({ type: "set_loading", loading: false })
    }
  }, [dispatch, state.activeItem])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const input = inputRef.current
    const content = input?.value.trim()
    if (!content || state.loading) return
    sendMessage(content)
    if (input) input.value = ""
  }

  const handleQuickAction = (action: string) => {
    if (state.loading) return
    const context = state.activeItem
    if (!context) return

    const messages: Record<string, string> = {
      summary: "请用3条要点总结这篇新闻",
      translate: "请翻译成英文",
      explain: "请用大白话解释这个事件，告诉我背景和影响",
    }

    sendMessage(messages[action] || action)
  }

  if (!state.open) return null

  const title = state.activeItem?.title
    ? state.activeItem.title.slice(0, 30) + (state.activeItem.title.length > 30 ? "..." : "")
    : "Agent 助手"

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={() => dispatch({ type: "close" })}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className={clsx(
          "absolute right-0 top-0 h-full w-full max-w-md",
          "bg-base/95 dark:bg-neutral-900/95 backdrop-blur-xl",
          "border-l border-neutral-200 dark:border-neutral-800",
          "flex flex-col shadow-2xl",
          "animate-slide-in",
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex flex-col gap-1 min-w-0 flex-1">
            <h2 className="text-sm font-bold text-neutral-800 dark:text-neutral-200 truncate">
              {title}
            </h2>
            {state.activeItem && (
              <span className="text-xs text-neutral-400 truncate">
                {state.activeItem.extra?.info || ""}
              </span>
            )}
          </div>
          <div className="flex gap-2 ml-2">
            <button
              type="button"
              className="text-xs px-2 py-1 rounded bg-neutral-400/10 hover:bg-neutral-400/20 transition-colors"
              onClick={() => dispatch({ type: "clear" })}
            >
              清空
            </button>
            <button
              type="button"
              className="text-xs px-2 py-1 rounded bg-neutral-400/10 hover:bg-neutral-400/20 transition-colors"
              onClick={() => dispatch({ type: "close" })}
            >
              关闭
            </button>
          </div>
        </div>

        {/* Quick actions (only when there's an active item) */}
        {state.activeItem && (
          <div className="flex gap-2 px-4 py-2 border-b border-neutral-200/50 dark:border-neutral-800/50">
            <button
              type="button"
              className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              onClick={() => handleQuickAction("summary")}
              disabled={state.loading}
            >
              要点总结
            </button>
            <button
              type="button"
              className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              onClick={() => handleQuickAction("translate")}
              disabled={state.loading}
            >
              翻译
            </button>
            <button
              type="button"
              className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              onClick={() => handleQuickAction("explain")}
              disabled={state.loading}
            >
              大白话解释
            </button>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
          {state.messages.length === 0 && (
            <div className="flex-1 flex flex-col items-center justify-center text-neutral-400/60 text-sm gap-2 py-12">
              <span className="text-3xl">💬</span>
              <span>选中新闻后，可以问我任何问题</span>
              {state.activeItem && (
                <span className="text-xs max-w-[80%] text-center line-clamp-2">
                  {state.activeItem.title}
                </span>
              )}
            </div>
          )}
          {state.messages.map(msg => (
            <ChatMessageBubble key={msg.id} message={msg} />
          ))}
          {state.loading && (
            <div className="flex items-center gap-1 text-neutral-400 text-sm px-2">
              <span className="animate-bounce">.</span>
              <span className="animate-bounce" style={{ animationDelay: "0.1s" }}>.</span>
              <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>.</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-neutral-200 dark:border-neutral-800">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              placeholder="问点什么..."
              disabled={state.loading}
              className={clsx(
                "flex-1 px-4 py-2 rounded-full text-sm",
                "bg-neutral-400/10 border border-neutral-400/20",
                "focus:outline-none focus:border-primary/50",
                "placeholder:text-neutral-400/50",
                "disabled:opacity-50",
              )}
            />
            <button
              type="submit"
              disabled={state.loading}
              className={clsx(
                "px-4 py-2 rounded-full text-sm",
                "bg-primary text-white",
                "hover:opacity-90 transition-opacity",
                "disabled:opacity-50",
              )}
            >
              发送
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
