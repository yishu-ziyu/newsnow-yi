import { useAtom, useSetAtom } from "jotai"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useDebounce } from "react-use"
import { clsx } from "clsx"
import { motion, useReducedMotion } from "framer-motion"
import type { NewsItem } from "@shared/types"
import { agentPanelActionsAtom, agentPanelAtom } from "~/atoms/agent-panel"
import { itemKey } from "~/atoms/compare-selection"
import { loadAgentHistory, saveAgentHistory } from "~/hooks/useAgentHistory"
import { type TrackersState, loadTrackers, removeTracker } from "~/hooks/useTrackers"
import { MarkdownLite } from "~/components/common/markdown-lite"

const PANEL_EASE = [0.23, 1, 0.32, 1] as const
const COMPARE_PROMPT = "对比这几条报道：各来源的说法差异在哪？谁讲了什么、口径差在哪、有没有相互矛盾的数字或时间线？"

function formatTime(ts: number) {
  return new Date(ts).toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })
}

function formatWhen(ts?: number) {
  if (!ts) return "未运行"
  return new Date(ts).toLocaleString("zh-CN", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" })
}

function formatInterval(ms: number) {
  const hours = ms / 3600000
  if (hours >= 24) return `${Math.round(hours / 24)} 天`
  if (hours >= 1) return `${Math.round(hours)} 小时`
  return `${Math.max(1, Math.round(ms / 60000))} 分钟`
}

export function describeStepInput(input: unknown): string {
  if (!input || typeof input !== "object") return ""
  return Object.entries(input as Record<string, unknown>)
    .filter(([, value]) => value !== undefined && value !== null && value !== "")
    .map(([key, value]) => `${key}=${String(value)}`)
    .join(" ")
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
      {message.mock && (
        <div
          className="text-xs px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-400 max-w-[85%]"
          title={message.degradedReason}
        >
          模拟回复 · 未接模型
        </div>
      )}
      <div className={clsx(
        "max-w-[85%] px-3 py-2 rounded-2xl text-sm leading-relaxed [text-wrap:pretty]",
        isUser
          ? "bg-primary/20 text-primary dark:bg-primary/30"
          : message.mock
            ? "bg-amber-500/5 border border-dashed border-amber-500/40 text-neutral-600 dark:text-neutral-300"
            : "bg-neutral-400/10 text-neutral-800 dark:text-neutral-200",
      )}
      >
        {isUser ? message.content : <MarkdownLite text={message.content} />}
      </div>
      {!!message.steps?.length && (
        <div className="flex flex-col gap-0.5 text-xs text-neutral-400/80 px-2 max-w-[85%]">
          <span className="opacity-60 tabular-nums">
            调了
            {message.steps.length}
            {" "}
            次工具
          </span>
          {message.steps.map((step, index) => (
            <span key={`${step.tool}-${index}`} className="truncate">
              {step.tool}
              {describeStepInput(step.input) && ` · ${describeStepInput(step.input)}`}
            </span>
          ))}
        </div>
      )}
      <span className="text-xs text-neutral-400/50 px-2 tabular-nums">
        {formatTime(message.timestamp)}
        {message.provider && message.model && (
          <span className="ml-2 opacity-70">
            {message.provider}
            {" "}
            ·
            {" "}
            {message.model}
          </span>
        )}
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

function SegmentedTabs({ value, onChange }: { value: "chat" | "trackers", onChange: (v: "chat" | "trackers") => void }) {
  const items: Array<{ id: "chat" | "trackers", label: string }> = [
    { id: "chat", label: "对话" },
    { id: "trackers", label: "追踪" },
  ]
  return (
    <div className="flex gap-1 rounded-full bg-neutral-400/10 p-0.5" role="tablist" aria-label="面板视图">
      {items.map(item => (
        <button
          key={item.id}
          type="button"
          role="tab"
          aria-selected={value === item.id}
          onClick={() => onChange(item.id)}
          className={clsx(
            "rounded-full px-2.5 py-1 text-xs transition-colors duration-150",
            value === item.id
              ? "bg-primary/15 text-primary"
              : "text-neutral-500 hover:bg-neutral-400/10 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200",
          )}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}

function TrackersView({ onStartTracking }: { onStartTracking?: () => void }) {
  const [state, setState] = useState<TrackersState>({ persisted: false, trackers: [], briefings: [] })
  const [loading, setLoading] = useState(true)
  const [confirmId, setConfirmId] = useState<string | null>(null)
  const [expandedBriefing, setExpandedBriefing] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setState(await loadTrackers())
    setLoading(false)
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const handleDelete = useCallback(async (id: string) => {
    await removeTracker(id)
    setConfirmId(null)
    await refresh()
  }, [refresh])

  if (loading) {
    return (
      <div className="flex flex-col gap-2 p-4" aria-busy="true">
        {[0, 1, 2].map(i => (
          <div key={i} className="h-14 rounded-xl bg-neutral-400/10" />
        ))}
      </div>
    )
  }

  if (!state.persisted) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-2 px-6 py-16 text-center text-sm text-neutral-500 dark:text-neutral-400">
        <span className="text-2xl">🗂️</span>
        <span>登录后才能保存追踪与简报。</span>
        <span className="text-xs">现在也可以在对话里直接问，只是不会留档。</span>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
      <section className="flex flex-col gap-2">
        <header className="flex items-baseline justify-between">
          <h3 className="text-xs font-semibold text-neutral-600 dark:text-neutral-300">追踪</h3>
          <span className="text-xs text-neutral-400 tabular-nums">
            {state.trackers.length}
            {" "}
            条
          </span>
        </header>

        {state.trackers.length === 0
          ? (
              <div className="flex flex-col items-start gap-2 rounded-xl border border-dashed border-neutral-400/25 px-3 py-4 text-xs text-neutral-600 dark:text-neutral-300">
                <span>还没有追踪。说一句「帮我盯 XX」，它就会出现在这里。</span>
                {onStartTracking && (
                  <button
                    type="button"
                    className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary transition-colors duration-150 hover:bg-primary/20"
                    onClick={onStartTracking}
                  >
                    去对话里建一条
                  </button>
                )}
              </div>
            )
          : state.trackers.map(tracker => (
              <article key={tracker.id} className="rounded-xl bg-neutral-400/10 px-3 py-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-sm text-neutral-800 dark:text-neutral-200">{tracker.topic}</p>
                    <p className="mt-0.5 text-xs text-neutral-400 tabular-nums">
                      每
                      {" "}
                      {formatInterval(tracker.intervalMs)}
                      {" "}
                      · 回看
                      {" "}
                      {tracker.days}
                      {" "}
                      天
                    </p>
                    <p className="text-xs text-neutral-400 tabular-nums">
                      上次
                      {" "}
                      {formatWhen(tracker.lastRun)}
                      {" "}
                      · 下次
                      {" "}
                      {formatWhen(tracker.nextRun)}
                    </p>
                  </div>
                  {confirmId === tracker.id
                    ? (
                        <div className="flex shrink-0 gap-1">
                          <button
                            type="button"
                            className="rounded px-2 py-1 text-xs text-red-600 hover:bg-red-500/10"
                            onClick={() => handleDelete(tracker.id)}
                          >
                            确认删除
                          </button>
                          <button
                            type="button"
                            className="rounded px-2 py-1 text-xs text-neutral-500 hover:bg-neutral-400/20"
                            onClick={() => setConfirmId(null)}
                          >
                            取消
                          </button>
                        </div>
                      )
                    : (
                        <button
                          type="button"
                          aria-label={`删除追踪 ${tracker.topic}`}
                          className="shrink-0 rounded px-2 py-1 text-xs text-neutral-400 hover:bg-neutral-400/20 hover:text-neutral-600"
                          onClick={() => setConfirmId(tracker.id)}
                        >
                          删除
                        </button>
                      )}
                </div>
              </article>
            ))}
      </section>

      <section className="flex flex-col gap-2">
        <header className="flex items-baseline justify-between">
          <h3 className="text-xs font-semibold text-neutral-600 dark:text-neutral-300">简报</h3>
          <span className="text-xs text-neutral-400 tabular-nums">
            {state.briefings.length}
            {" "}
            份
          </span>
        </header>

        {state.briefings.length === 0 && (
          <div className="rounded-xl border border-dashed border-neutral-400/25 px-3 py-4 text-xs text-neutral-600 dark:text-neutral-300">
            追踪跑过一轮后，简报会落在这里。
          </div>
        )}

        {state.briefings.map((briefing) => {
          const expanded = expandedBriefing === briefing.id
          return (
            <article key={briefing.id} className="rounded-xl bg-neutral-400/10 px-3 py-2.5">
              <button
                type="button"
                className="flex w-full items-start justify-between gap-2 text-left"
                aria-expanded={expanded}
                onClick={() => setExpandedBriefing(expanded ? null : briefing.id)}
              >
                <span className="min-w-0">
                  <span className="block truncate text-sm text-neutral-800 dark:text-neutral-200">{briefing.topic}</span>
                  <span className="mt-0.5 block text-xs text-neutral-400 tabular-nums">
                    {formatWhen(briefing.created)}
                    {" "}
                    ·
                    {briefing.sourceCount}
                    {" "}
                    源
                    {briefing.steps?.length ? ` · ${briefing.steps.length} 次工具` : ""}
                    {briefing.mock ? " · 占位" : ""}
                  </span>
                </span>
                <span className="shrink-0 text-xs text-neutral-400">{expanded ? "收起" : "展开"}</span>
              </button>
              <p className={clsx(
                "mt-2 text-xs leading-relaxed text-neutral-600 dark:text-neutral-300 [text-wrap:pretty]",
                expanded ? "" : "line-clamp-3",
              )}
              >
                {briefing.summary}
              </p>
            </article>
          )
        })}
      </section>
    </div>
  )
}

export function AgentPanel() {
  const [state] = useAtom(agentPanelAtom)
  const dispatch = useSetAtom(agentPanelActionsAtom)
  const panelRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const autoCompareSent = useRef(false)
  const reduceMotion = useReducedMotion()

  const compareItems = state.activeItems
  const isCompare = compareItems.length > 1

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [state.messages, scrollToBottom])

  useEffect(() => {
    if (state.open) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [state.open])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && state.open) {
        dispatch({ type: "close" })
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [state.open, dispatch])

  // Hydrate the stored conversation the first time the panel has nothing to show
  useEffect(() => {
    if (!state.open || state.messages.length > 0) return
    let cancelled = false
    loadAgentHistory().then((messages) => {
      if (!cancelled && messages.length > 0) {
        dispatch({ type: "set_messages", messages })
      }
    })
    return () => {
      cancelled = true
    }
  }, [state.open, state.messages.length, dispatch])

  useDebounce(() => {
    if (state.messages.length > 0) saveAgentHistory(state.messages)
  }, 800, [state.messages])

  const sendMessage = useCallback(async (content: string, items?: NewsItem[]) => {
    const primary = state.activeItem
    const compareList = items && items.length > 1 ? items : undefined

    dispatch({
      type: "add_user",
      content,
      context: primary && !compareList
        ? {
            title: primary.title,
            url: primary.url,
            content: primary.extra?.hover || primary.title,
          }
        : compareList
          ? { title: `对比 ${compareList.length} 条来源` }
          : undefined,
    })

    dispatch({ type: "set_loading", loading: true })

    try {
      const response = await fetch("/api/agent/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: content,
          history: state.messages
            .filter(m => !m.mock)
            .slice(-8)
            .map(m => ({ role: m.role, content: m.content })),
          context: primary && !compareList
            ? {
                title: primary.title,
                url: primary.url,
                content: primary.extra?.hover || primary.title,
              }
            : undefined,
          contexts: compareList?.map(item => ({
            title: item.title,
            url: item.url,
            content: item.extra?.hover || item.title,
          })),
        }),
      })
      const data = await response.json()
      dispatch({
        type: "add_assistant",
        content: data.reply || "（无回复）",
        meta: {
          mock: data.mock === true,
          steps: Array.isArray(data.steps) ? data.steps : [],
          provider: data.provider,
          model: data.model,
          degradedReason: data.degradedReason,
        },
      })
    } catch {
      dispatch({ type: "add_assistant", content: "抱歉，请求失败了。请稍后再试。", meta: { mock: true, degradedReason: "网络请求失败" } })
    } finally {
      dispatch({ type: "set_loading", loading: false })
    }
  }, [dispatch, state.activeItem, state.messages])

  // Compare mode fires once per open
  useEffect(() => {
    if (!state.open || !isCompare) {
      autoCompareSent.current = false
      return
    }
    if (autoCompareSent.current || state.loading) return
    autoCompareSent.current = true
    sendMessage(COMPARE_PROMPT, compareItems)
  }, [state.open, isCompare, compareItems, state.loading, sendMessage])

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
    const messages: Record<string, string> = {
      summary: "请用3条要点总结这篇新闻",
      translate: "请翻译成英文",
      explain: "请用大白话解释这个事件，告诉我背景和影响",
    }
    sendMessage(messages[action] || action)
  }

  const title = useMemo(() => {
    if (isCompare) return `对比 ${compareItems.length} 条来源`
    if (state.activeItem?.title) {
      const raw = state.activeItem.title
      return raw.length > 30 ? `${raw.slice(0, 30)}...` : raw
    }
    return "Agent 助手"
  }, [isCompare, compareItems.length, state.activeItem])

  if (!state.open) return null

  const panelMotion = reduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : { initial: { opacity: 0, x: 24 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 24 } }

  return (
    <div className="fixed inset-0 z-50">
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15, ease: PANEL_EASE }}
        onClick={() => dispatch({ type: "close" })}
      />

      <motion.div
        ref={panelRef}
        className={clsx(
          "absolute right-0 top-0 h-full w-full max-w-md",
          "bg-base/95 dark:bg-neutral-900/95 backdrop-blur-xl",
          "border-l border-neutral-200 dark:border-neutral-800",
          "flex flex-col shadow-2xl",
        )}
        initial={panelMotion.initial}
        animate={panelMotion.animate}
        exit={panelMotion.exit}
        transition={{ duration: reduceMotion ? 0.12 : 0.2, ease: PANEL_EASE }}
      >
        <div className="flex items-center justify-between border-b border-neutral-200 p-4 dark:border-neutral-800">
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <h2 className="truncate text-sm font-bold text-neutral-800 dark:text-neutral-200 [text-wrap:balance]">
              {title}
            </h2>
            <SegmentedTabs value={state.view} onChange={view => dispatch({ type: "set_view", view })} />
          </div>
          <div className="ml-2 flex gap-2">
            <button
              type="button"
              className="rounded bg-neutral-400/10 px-2 py-1 text-xs transition-colors duration-150 hover:bg-neutral-400/20"
              onClick={() => dispatch({ type: "clear" })}
            >
              清空
            </button>
            <button
              type="button"
              className="rounded bg-neutral-400/10 px-2 py-1 text-xs transition-colors duration-150 hover:bg-neutral-400/20"
              onClick={() => dispatch({ type: "close" })}
            >
              关闭
            </button>
          </div>
        </div>

        {isCompare && state.view === "chat" && (
          <div className="flex flex-wrap gap-1 border-b border-neutral-200/60 px-4 py-2 dark:border-neutral-800/60">
            {compareItems.map(item => (
              <span
                key={itemKey(item)}
                className="max-w-[45%] truncate rounded-full bg-neutral-400/10 px-2 py-0.5 text-xs text-neutral-500"
                title={item.title}
              >
                {item.title}
              </span>
            ))}
          </div>
        )}

        {state.view === "chat" && state.activeItem && (
          <div className="flex gap-2 border-b border-neutral-200/50 px-4 py-2 dark:border-neutral-800/50">
            {(["summary", "translate", "explain"] as const).map(action => (
              <button
                key={action}
                type="button"
                className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary transition-colors duration-150 hover:bg-primary/20 disabled:opacity-50"
                onClick={() => handleQuickAction(action)}
                disabled={state.loading}
              >
                {action === "summary" ? "要点总结" : action === "translate" ? "翻译" : "大白话解释"}
              </button>
            ))}
          </div>
        )}

        {state.view === "trackers"
          ? (
              <TrackersView
                onStartTracking={() => {
                  dispatch({ type: "set_view", view: "chat" })
                  requestAnimationFrame(() => {
                    const input = inputRef.current
                    if (input) {
                      input.value = "帮我盯 "
                      input.focus()
                    }
                  })
                }}
              />
            )
          : (
              <>
                <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
                  {state.messages.length === 0 && (
                    <div className="flex flex-1 flex-col items-center justify-center gap-2 py-12 text-sm text-neutral-500 dark:text-neutral-400">
                      <span className="text-3xl">💬</span>
                      <span>{isCompare ? "正在对比选中的来源…" : "选中新闻后，可以问我任何问题"}</span>
                      {!isCompare && (
                        <span className="text-xs">也可以直接问「今天有什么大事」，我会去检索当前抓到的条目。</span>
                      )}
                    </div>
                  )}
                  {state.messages.map(msg => (
                    <ChatMessageBubble key={msg.id} message={msg} />
                  ))}
                  {state.loading && (
                    <div className="flex items-center gap-1 px-2 text-sm text-neutral-500 dark:text-neutral-400">
                      <span className="animate-bounce motion-reduce:animate-none">.</span>
                      <span className="animate-bounce motion-reduce:animate-none" style={{ animationDelay: "0.1s" }}>.</span>
                      <span className="animate-bounce motion-reduce:animate-none" style={{ animationDelay: "0.2s" }}>.</span>
                      <span className="ml-1 text-xs">正在检索…</span>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <form onSubmit={handleSubmit} className="border-t border-neutral-200 p-4 dark:border-neutral-800">
                  <div className="flex gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      placeholder="问点什么..."
                      disabled={state.loading}
                      className={clsx(
                        "flex-1 rounded-full px-4 py-2 text-sm",
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
                        "rounded-full px-4 py-2 text-sm",
                        "bg-primary text-white",
                        "transition-opacity duration-150 hover:opacity-90",
                        "disabled:opacity-50",
                      )}
                    >
                      发送
                    </button>
                  </div>
                </form>
              </>
            )}
      </motion.div>
    </div>
  )
}
