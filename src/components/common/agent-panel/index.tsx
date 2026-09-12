import { useAtom, useSetAtom } from "jotai"
import { useCallback, useEffect, useRef, useState } from "react"
import { useDebounce } from "react-use"
import { clsx } from "clsx"
import { motion, useReducedMotion } from "framer-motion"
import type { NewsItem } from "@shared/types"
import { COMPARE_USER_PROMPT, parseAgentSseBlock, splitSseBuffer, toolChipLabel } from "@shared/agent"
import { BRIEFING_LIST_LIMIT } from "@shared/tracker"
import { agentPanelActionsAtom, agentPanelAtom } from "~/atoms/agent-panel"
import { itemKey } from "~/atoms/compare-selection"
import { loadAgentHistory, saveAgentHistory } from "~/hooks/useAgentHistory"
import { type TrackersState, loadTrackers, removeTracker } from "~/hooks/useTrackers"
import { MarkdownLite } from "~/components/common/markdown-lite"

const PANEL_EASE = [0.23, 1, 0.32, 1] as const
const BRIEFING_READ_KEY = "wenjian-briefing-read"

function loadReadBriefings(): Set<string> {
  try {
    const raw = JSON.parse(localStorage.getItem(BRIEFING_READ_KEY) || "[]") as unknown
    return new Set(Array.isArray(raw) ? raw.filter(id => typeof id === "string") : [])
  } catch {
    return new Set()
  }
}

function saveReadBriefings(ids: Set<string>) {
  localStorage.setItem(BRIEFING_READ_KEY, JSON.stringify([...ids]))
}

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

const CHIP = "rounded-full border border-neutral-900/10 bg-white/50 px-2 py-0.5 text-[11px] text-taupe-secondary dark:border-neutral-700 dark:bg-neutral-800/60 dark:text-neutral-400"

function stepPending(step: NonNullable<import("~/atoms/agent-panel").ChatMessage["steps"]>[number], streaming?: boolean) {
  return streaming && !step.summary && step.ok !== false
}

/** Live checklist while the model works; collapses to 「想了 Ns」 when done. */
function ThinkingTrace({ message }: { message: import("~/atoms/agent-panel").ChatMessage }) {
  const [open, setOpen] = useState(!!message.streaming)
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    setOpen(!!message.streaming)
  }, [message.streaming, message.id])

  useEffect(() => {
    if (!message.streaming) return
    const started = message.startedAt ?? Date.now()
    const tick = () => setElapsed(Math.max(0, Math.round((Date.now() - started) / 1000)))
    tick()
    const timer = setInterval(tick, 250)
    return () => clearInterval(timer)
  }, [message.streaming, message.id, message.startedAt])

  const seconds = message.streaming
    ? elapsed
    : Math.max(1, Math.round((message.thoughtMs ?? 0) / 1000))
  const steps = message.steps ?? []
  if (!message.streaming && message.thoughtMs == null && !steps.length && !message.reasoning) return null

  return (
    <div className="flex w-full flex-col gap-1.5">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen(prev => !prev)}
        className="inline-flex items-center gap-1.5 self-start text-[11px] text-taupe-secondary transition-colors duration-150 hover:text-ink-text"
      >
        <span
          aria-hidden="true"
          className={clsx("i-ph:caret-right inline-block size-3 transition-transform duration-150", open && "rotate-90")}
        />
        {message.streaming
          ? (
              <>
                <span className="size-1.5 animate-pulse rounded-full bg-primary-600 motion-reduce:animate-none" />
                正在想
                <span className="tabular-nums">
                  {seconds}
                  s
                </span>
              </>
            )
          : (
              <span className="tabular-nums">
                想了
                {" "}
                {seconds}
                {" "}
                秒
              </span>
            )}
      </button>
      {open && (
        <ul className="flex flex-col gap-1 border-l border-neutral-900/10 pl-3 text-[12px] text-taupe-secondary dark:border-neutral-700">
          {message.reasoning && (
            <li className="whitespace-pre-wrap text-[11px] leading-relaxed [text-wrap:pretty]">{message.reasoning}</li>
          )}
          {steps.map((step, index) => {
            const pending = stepPending(step, message.streaming)
            return (
              <li key={step.id ?? `${step.tool}-${index}`} className="flex items-start gap-1.5">
                {pending
                  ? <span aria-hidden="true" className="mt-0.5 size-2.5 shrink-0 rounded-full border border-current" />
                  : <span aria-hidden="true" className="i-ph:check mt-0.5 inline-block size-3 shrink-0 text-primary-700" />}
                <span className="min-w-0 truncate">
                  {toolChipLabel(step)}
                  {step.tool !== "search_news" && describeStepInput(step.input) && (
                    <span className="text-taupe-secondary/80">
                      {" "}
                      ·
                      {" "}
                      {describeStepInput(step.input)}
                    </span>
                  )}
                </span>
              </li>
            )
          })}
          {message.streaming && !steps.length && !message.reasoning && (
            <li>准备工具…</li>
          )}
        </ul>
      )}
    </div>
  )
}

function ToolChips({ steps, streaming }: { steps: NonNullable<import("~/atoms/agent-panel").ChatMessage["steps"]>, streaming?: boolean }) {
  if (!steps.length) return null
  return (
    <div className="flex flex-wrap gap-1">
      {steps.map((step, index) => {
        const pending = stepPending(step, streaming)
        return (
          <span
            key={step.id ?? `${step.tool}-${index}`}
            className={clsx(CHIP, "inline-flex items-center gap-1")}
            title={step.summary || describeStepInput(step.input)}
          >
            {pending
              ? <span aria-hidden="true" className="size-1.5 animate-pulse rounded-full bg-primary-600 motion-reduce:animate-none" />
              : <span aria-hidden="true" className="i-ph:check inline-block size-3" />}
            {toolChipLabel(step)}
          </span>
        )
      })}
    </div>
  )
}

function ChatMessageBubble({ message, pinnedTitle }: ChatMessageBubbleProps & { pinnedTitle?: string }) {
  const isUser = message.role === "user"
  const showContext = message.context?.title && message.context.title !== pinnedTitle
  return (
    <div className={clsx("flex flex-col gap-1.5", isUser ? "items-end" : "items-start")}>
      {showContext && (
        <div className="max-w-[90%] truncate text-[11px] text-taupe-secondary">
          {message.context?.title}
        </div>
      )}
      {message.mock && (
        <span
          className="rounded-full bg-amber-100/80 px-2 py-0.5 text-[11px] text-amber-800 dark:bg-amber-950 dark:text-amber-300"
          title={message.degradedReason}
        >
          模拟回复
        </span>
      )}
      {!isUser && <ThinkingTrace message={message} />}
      {!isUser && !!message.steps?.length && <ToolChips steps={message.steps} streaming={message.streaming} />}
      {isUser
        ? (
            <div className="max-w-[80%] rounded-2xl rounded-br-md bg-primary-100 px-3 py-2 text-sm leading-relaxed text-primary-800 dark:bg-primary-950 dark:text-primary-200 [text-wrap:pretty]">
              {message.content}
            </div>
          )
        : (
            <div className={clsx(
              "w-full text-[13.5px] leading-[1.7] text-ink-text dark:text-neutral-200",
              message.mock && "text-taupe-secondary",
            )}
            >
              {message.content
                ? <MarkdownLite text={message.content} />
                : message.streaming
                  ? <span className="text-[11px] text-taupe-secondary">…</span>
                  : null}
              {message.streaming && !!message.content && (
                <span aria-hidden="true" className="ml-0.5 inline-block h-[0.9em] w-px translate-y-0.5 animate-pulse bg-primary-600 motion-reduce:animate-none" />
              )}
            </div>
          )}
      <span className="flex items-center gap-2 text-[10px] text-taupe-secondary/80 tabular-nums">
        {formatTime(message.timestamp)}
        {message.provider && message.model && (
          <span title={`${message.provider} · ${message.model}`}>{message.model}</span>
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
    <div className="flex gap-3" role="tablist" aria-label="面板视图">
      {items.map(item => (
        <button
          key={item.id}
          type="button"
          role="tab"
          aria-selected={value === item.id}
          onClick={() => onChange(item.id)}
          className={clsx(
            "border-b pb-0.5 text-xs transition-colors duration-150",
            value === item.id
              ? "border-primary-600 text-ink-text dark:text-neutral-100"
              : "border-transparent text-taupe-secondary hover:text-ink-text dark:hover:text-neutral-200",
          )}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}

function TrackersView({ onStartTracking, reloadToken = 0 }: { onStartTracking?: () => void, reloadToken?: number }) {
  const [state, setState] = useState<TrackersState>({ persisted: false, trackers: [], briefings: [] })
  const [loading, setLoading] = useState(true)
  const [confirmId, setConfirmId] = useState<string | null>(null)
  const [expandedBriefing, setExpandedBriefing] = useState<string | null>(null)
  const [readIds, setReadIds] = useState<Set<string>>(loadReadBriefings)

  const refresh = useCallback(async () => {
    setLoading(true)
    setState(await loadTrackers())
    setLoading(false)
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh, reloadToken])

  const handleDelete = useCallback(async (id: string) => {
    await removeTracker(id)
    setConfirmId(null)
    await refresh()
  }, [refresh])

  const markRead = useCallback((id: string) => {
    setReadIds((prev) => {
      if (prev.has(id)) return prev
      const next = new Set(prev)
      next.add(id)
      saveReadBriefings(next)
      return next
    })
  }, [])

  const markAllRead = useCallback(() => {
    setReadIds((prev) => {
      const next = new Set(prev)
      for (const briefing of state.briefings) next.add(briefing.id)
      saveReadBriefings(next)
      return next
    })
  }, [state.briefings])

  const briefings = state.briefings.slice(0, BRIEFING_LIST_LIMIT)
  const unreadCount = briefings.filter(b => !readIds.has(b.id)).length

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
      <div className="flex flex-1 flex-col items-start justify-center gap-2 px-5 py-16 text-sm text-taupe-secondary">
        <span>登录后才能保存追踪与简报。</span>
        <span className="text-xs">现在也可以在对话里直接问，只是不会留档。</span>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-5 py-5">
      <section className="flex flex-col gap-2">
        <header className="flex items-baseline justify-between">
          <h3 className="text-xs font-semibold text-neutral-600 dark:text-neutral-300">追踪</h3>
          <span className="flex items-center gap-2">
            <span className="text-xs text-neutral-600 dark:text-neutral-400 tabular-nums">
              {state.trackers.length}
              {" "}
              条
            </span>
            <button
              type="button"
              aria-label="刷新追踪与简报"
              onClick={refresh}
              className="rounded px-1.5 py-0.5 text-xs text-neutral-600 transition-colors duration-150 hover:bg-neutral-100 hover:text-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
            >
              刷新
            </button>
          </span>
        </header>

        {state.trackers.length === 0
          ? (
              <div className="flex flex-col items-start gap-2 rounded-xl border border-dashed border-neutral-400/25 px-3 py-4 text-xs text-neutral-600 dark:text-neutral-300">
                <span>还没有追踪。说一句「帮我盯 XX」，它就会出现在这里。</span>
                {onStartTracking && (
                  <button
                    type="button"
                    className="rounded-full bg-primary-100 px-3 py-1 text-xs text-primary-800 transition-colors duration-150 hover:bg-primary-200 dark:bg-primary-950 dark:text-primary-200 dark:hover:bg-primary-900"
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
          <span className="flex items-center gap-2">
            <span className="text-xs text-neutral-600 dark:text-neutral-400 tabular-nums">
              {briefings.length}
              /
              {BRIEFING_LIST_LIMIT}
            </span>
            {unreadCount > 0 && (
              <button
                type="button"
                className="rounded px-1.5 py-0.5 text-xs text-neutral-600 transition-colors duration-150 hover:bg-neutral-100 hover:text-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
                onClick={markAllRead}
              >
                全部已读
              </button>
            )}
          </span>
        </header>

        {briefings.length === 0 && (
          <div className="rounded-xl border border-dashed border-neutral-400/25 px-3 py-4 text-xs text-neutral-600 dark:text-neutral-300">
            追踪跑过一轮后，简报会落在这里。一天最多
            {" "}
            {BRIEFING_LIST_LIMIT}
            {" "}
            份。
          </div>
        )}

        {briefings.map((briefing) => {
          const expanded = expandedBriefing === briefing.id
          const unread = !readIds.has(briefing.id)
          return (
            <article
              key={briefing.id}
              className={clsx("rounded-xl px-3 py-2.5", unread ? "bg-neutral-400/15" : "bg-neutral-400/8")}
            >
              <button
                type="button"
                className="flex w-full items-start justify-between gap-2 text-left"
                aria-expanded={expanded}
                onClick={() => {
                  markRead(briefing.id)
                  setExpandedBriefing(expanded ? null : briefing.id)
                }}
              >
                <span className="min-w-0">
                  <span className="block text-[10px] font-medium tracking-wide text-primary-800 dark:text-primary-300">
                    {briefing.topic}
                  </span>
                  <span className={clsx(
                    "mt-0.5 block truncate text-sm",
                    unread ? "text-neutral-800 dark:text-neutral-100" : "text-neutral-500 dark:text-neutral-400",
                  )}
                  >
                    {briefing.summary.split("\n")[0].slice(0, 48) || briefing.topic}
                  </span>
                  <span className="mt-0.5 block text-xs text-neutral-400 tabular-nums">
                    {formatWhen(briefing.created)}
                    {" "}
                    ·
                    {briefing.sourceCount}
                    {" "}
                    源
                    {briefing.mock ? " · 占位" : ""}
                  </span>
                </span>
                <span className="shrink-0 text-xs text-neutral-400">{expanded ? "收起" : "展开"}</span>
              </button>
              {expanded && (
                <p className="mt-2 text-xs leading-relaxed text-neutral-600 dark:text-neutral-300 [text-wrap:pretty]">
                  {briefing.summary}
                </p>
              )}
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
  const abortRef = useRef<AbortController | null>(null)
  const [trackersToken, setTrackersToken] = useState(0)
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

  const wasOpen = useRef(false)
  useEffect(() => {
    if (!state.open && wasOpen.current) abortRef.current?.abort()
    wasOpen.current = state.open
  }, [state.open])

  useDebounce(() => {
    if (state.messages.length > 0 && !state.messages.some(message => message.streaming)) saveAgentHistory(state.messages)
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

    const assistantId = crypto.randomUUID()
    dispatch({
      type: "add_assistant",
      id: assistantId,
      content: "",
      meta: { streaming: true, startedAt: Date.now(), steps: [] },
    })
    dispatch({ type: "set_loading", loading: true })

    abortRef.current?.abort()
    const abort = new AbortController()
    abortRef.current = abort

    try {
      const jwt = safeParseString(localStorage.getItem("jwt"))
      const response = await fetch("/api/agent/chat?stream=1", {
        method: "POST",
        signal: abort.signal,
        headers: {
          "Content-Type": "application/json",
          "Accept": "text/event-stream",
          ...(jwt ? { Authorization: `Bearer ${jwt}` } : {}),
        },
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
      if (!response.ok) {
        const detail = await response.json().catch(() => null) as { message?: string } | null
        throw new Error(detail?.message ? `${detail.message}（HTTP ${response.status}）` : `HTTP ${response.status}`)
      }

      const ctype = response.headers.get("content-type") || ""
      if (!ctype.includes("text/event-stream")) {
        const data = await response.json() as { reply?: string, mock?: boolean, steps?: unknown, provider?: string, model?: string, degradedReason?: string }
        dispatch({
          type: "apply_stream",
          id: assistantId,
          event: {
            type: "done",
            reply: data.reply || "（无回复）",
            steps: Array.isArray(data.steps) ? data.steps : [],
            provider: data.provider,
            model: data.model || "mock",
            mock: data.mock === true,
            degradedReason: data.degradedReason,
          },
        })
        return
      }

      if (!response.body) throw new Error("没有响应流")
      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ""
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        const split = splitSseBuffer(buffer)
        buffer = split.rest
        for (const event of split.events) {
          dispatch({ type: "apply_stream", id: assistantId, event })
        }
      }
      const tail = parseAgentSseBlock(buffer)
      if (tail) dispatch({ type: "apply_stream", id: assistantId, event: tail })
    } catch (e) {
      if (e instanceof DOMException && e.name === "AbortError") {
        dispatch({ type: "apply_stream", id: assistantId, event: { type: "done", reply: "", steps: [], model: "" } })
        return
      }
      const reason = e instanceof Error ? e.message : "网络请求失败"
      dispatch({ type: "apply_stream", id: assistantId, event: { type: "error", reason } })
    } finally {
      if (abortRef.current === abort) abortRef.current = null
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
    sendMessage(COMPARE_USER_PROMPT, compareItems)
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

  const title = isCompare ? `对比 ${compareItems.length} 条` : "Agent 助手"

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
          "absolute right-0 top-0 h-full w-full max-w-lg",
          "bg-base dark:bg-neutral-900",
          "border-l border-neutral-900/10 dark:border-neutral-800",
          "flex flex-col shadow-[-8px_0_32px_rgba(20,16,12,0.08)]",
        )}
        initial={panelMotion.initial}
        animate={panelMotion.animate}
        exit={panelMotion.exit}
        transition={{ duration: reduceMotion ? 0.12 : 0.2, ease: PANEL_EASE }}
      >
        <div className="flex items-start justify-between gap-3 border-b border-neutral-900/10 px-5 py-4 dark:border-neutral-800">
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <h2 className="truncate font-serif-heading text-lg font-semibold leading-none text-ink-text dark:text-neutral-100 [text-wrap:balance]">
              {title}
            </h2>
            <SegmentedTabs
              value={state.view}
              onChange={(view) => {
                dispatch({ type: "set_view", view })
                // 每次切到追踪都重新拉一次，否则在别处新建的追踪/简报不会出现
                if (view === "trackers") setTrackersToken(token => token + 1)
              }}
            />
          </div>
          <div className="flex shrink-0 items-center gap-3 pt-0.5">
            <button
              type="button"
              className="btn text-xs"
              onClick={() => dispatch({ type: "clear" })}
            >
              清空
            </button>
            <button
              type="button"
              aria-label="关闭"
              className="btn text-base leading-none"
              onClick={() => dispatch({ type: "close" })}
            >
              ×
            </button>
          </div>
        </div>

        {state.view === "chat" && (isCompare || state.activeItem) && (
          <div className="flex flex-col gap-2 border-b border-neutral-900/8 px-5 py-2.5 dark:border-neutral-800/60">
            <div className="flex flex-wrap gap-1.5">
              {(isCompare ? compareItems : state.activeItem ? [state.activeItem] : []).map(item => (
                <a
                  key={itemKey(item)}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={clsx(CHIP, "max-w-[90%] truncate transition-colors duration-150 hover:text-ink-text")}
                  title={item.title}
                >
                  {item.title}
                </a>
              ))}
            </div>
            {state.activeItem && !isCompare && (
              <div className="flex gap-2">
                {(["summary", "translate", "explain"] as const).map(action => (
                  <button
                    key={action}
                    type="button"
                    className={clsx(CHIP, "transition-colors duration-150 hover:text-ink-text disabled:opacity-50")}
                    onClick={() => handleQuickAction(action)}
                    disabled={state.loading}
                  >
                    {action === "summary" ? "要点" : action === "translate" ? "翻译" : "大白话"}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {state.view === "trackers"
          ? (
              <TrackersView
                reloadToken={trackersToken}
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
                <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-5 py-5 select-text">
                  {state.messages.length === 0 && !state.loading && (
                    <div className="flex flex-col items-start gap-1.5 pt-6 text-sm text-taupe-secondary">
                      <span>
                        {isCompare
                          ? "正在对比选中的来源…"
                          : state.activeItem
                            ? "选一个动作，或直接问。"
                            : "选一条新闻，或直接问今天发生了什么。"}
                      </span>
                      {!isCompare && !state.activeItem && (
                        <span className="text-xs">也可以说「帮我盯 XX」，会记进追踪。</span>
                      )}
                    </div>
                  )}
                  {state.messages.map(msg => (
                    <ChatMessageBubble key={msg.id} message={msg} pinnedTitle={state.activeItem?.title} />
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                <form onSubmit={handleSubmit} className="px-4 pb-4 pt-1">
                  <div className="flex items-center gap-2 rounded-2xl border border-neutral-900/10 bg-white/55 px-3 py-2 dark:border-neutral-700 dark:bg-neutral-800/50">
                    <input
                      ref={inputRef}
                      type="text"
                      placeholder="问点什么…"
                      disabled={state.loading}
                      className={clsx(
                        "min-w-0 flex-1 bg-transparent py-1 text-sm",
                        "text-ink-text caret-primary dark:text-neutral-100",
                        "focus:outline-none",
                        "placeholder:text-taupe-secondary/70",
                        "disabled:opacity-50",
                      )}
                    />
                    <button
                      type="submit"
                      disabled={state.loading}
                      className="shrink-0 px-1 text-sm text-primary-700 transition-opacity duration-150 hover:opacity-80 disabled:opacity-40 dark:text-primary-300"
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
