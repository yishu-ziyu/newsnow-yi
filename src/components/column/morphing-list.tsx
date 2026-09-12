import { useCallback, useEffect, useState } from "react"
import { AnimatePresence, LayoutGroup, motion } from "framer-motion"
import type { NewsItem } from "@shared/types"
import { useWindowSize } from "react-use"
import { useAtomValue, useSetAtom } from "jotai"
import { agentPanelActionsAtom } from "~/atoms/agent-panel"
import { compareSelectionActionsAtom, compareSelectionAtom, itemKey } from "~/atoms/compare-selection"
import { layoutModeAtom } from "~/atoms/layout-mode"
import { useRelativeTime } from "~/hooks/useRelativeTime"

const SPRING = { type: "spring", stiffness: 300, damping: 25 }

export interface MorphingNewsListProps {
  items: NewsItem[]
  type: "hottest" | "realtime"
  sourceColor: string
}

export function MorphingNewsList({ items, sourceColor }: MorphingNewsListProps) {
  const layout = useAtomValue(layoutModeAtom)
  const [expandedId, setExpandedId] = useState<string | number | null>(null)
  const { width } = useWindowSize()
  const isMobile = width < 768
  const setAgentPanel = useSetAtom(agentPanelActionsAtom)

  const handleAgentClick = useCallback((e: React.MouseEvent, item: NewsItem) => {
    e.preventDefault()
    e.stopPropagation()
    setAgentPanel({ type: "open", item })
  }, [setAgentPanel])

  const toggleExpand = useCallback((id: string | number) => {
    setExpandedId(prev => prev === id ? null : id)
  }, [])

  if (!items.length) return null

  const isGrid = layout === "grid"

  // 身份色只留给细条与图标；卡片本身走中性面，屏上只保留一个 accent（primary）
  const identityBar = `bg-${sourceColor}-500`
  const c = "text-neutral-600"
  const bgSolid = "bg-neutral-900/[0.06] text-neutral-700"
  const accentSolid = "bg-primary/15 text-primary-800"

  // --- Nav button inside expanded card ---
  const NavBtn = ({ item }: { item: NewsItem }) => {
    const href = isMobile ? (item.mobileUrl || item.url) : item.url
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={$(
          "inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium",
          "transition-colors duration-150 hover:bg-neutral-900/[0.1]",
          bgSolid,
        )}
        title={item.title}
      >
        <span className="i-ph:arrow-square-out text-sm" />
        原文
      </a>
    )
  }

  // --- Grid ---
  const renderGridItem = (item: NewsItem, index: number) => {
    const isExpanded = expandedId === item.id
    const diff = item.extra?.diff
    const date = item.pubDate || item.extra?.date

    return (
      <motion.div
        key={item.id}
        layoutId={String(item.id)}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: isExpanded ? 1.02 : 1, zIndex: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={SPRING}
      >
        <div
          onClick={() => toggleExpand(item.id)}
          className={$(
            "cursor-pointer rounded-2xl shadow-sm overflow-hidden transition-[box-shadow,border-color] duration-150",
            "backdrop-blur-sm bg-white/70",
            "border border-neutral-200/60",
            "hover:shadow-md hover:border-neutral-900/15",
            isExpanded && "ring-2 ring-primary/35 shadow-md",
          )}
        >
          <div className={$("h-0.5 w-full rounded-full opacity-70", identityBar)} />
          <div className="p-3.5">
            <div className="flex items-start gap-2.5">
              <span className={$(
                "shrink-0 w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium tabular-nums",
                isExpanded ? accentSolid : bgSolid,
              )}
              >
                {index + 1}
              </span>
              <p className="text-sm font-bold leading-snug line-clamp-2 flex-1 text-neutral-800">{item.title}</p>
            </div>
            {isExpanded && item.extra?.hover && (
              <motion.p
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-neutral-500 mt-3 line-clamp-3 leading-relaxed"
              >
                {item.extra.hover}
              </motion.p>
            )}
            {isExpanded
              ? (
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <NavBtn item={item} />
                      <AgentBtn label={item.title} onClick={e => handleAgentClick(e, item)} />
                      <SelectBtn item={item} />
                    </div>
                    {diff != null && <DiffBadge diff={diff} />}
                  </div>
                )
              : (
                  <div className="flex items-center justify-between mt-2.5">
                    <div className="flex items-center gap-2">
                      {item.extra?.info && <span className={$("text-xs truncate", c)}>{item.extra.info}</span>}
                      {date && <NewsTime date={date} />}
                    </div>
                    {diff != null && <DiffBadge diff={diff} />}
                  </div>
                )}
          </div>
        </div>
      </motion.div>
    )
  }

  // --- List ---
  const renderListItem = (item: NewsItem, index: number) => {
    const isExpanded = expandedId === item.id
    const diff = item.extra?.diff
    const date = item.pubDate || item.extra?.date

    return (
      <motion.div
        key={item.id}
        layoutId={String(item.id)}
        initial={{ opacity: 0, y: 6 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: isExpanded ? 1.005 : 1,
          zIndex: 1,
        }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ ...SPRING, damping: 30 }}
      >
        <div
          onClick={() => toggleExpand(item.id)}
          className={$(
            "cursor-pointer rounded-xl px-3 py-2.5 -mx-1 transition-[background-color,box-shadow,border-color] duration-150",
            "border border-transparent",
            "hover:bg-white/70 hover:shadow-sm hover:border-neutral-900/10",
            isExpanded && "bg-white/80 shadow-sm border-primary/30",
          )}
        >
          <div className="flex items-center gap-3">
            <span className={$(
              "shrink-0 w-7 h-7 flex items-center justify-center rounded-lg text-xs font-medium tabular-nums",
              isExpanded ? accentSolid : bgSolid,
            )}
            >
              {index + 1}
            </span>
            <div className="min-w-0 flex-1">
              <p className={$("text-sm font-bold leading-snug line-clamp-1 text-neutral-800", isExpanded && "line-clamp-2")}>
                {item.title}
              </p>
              {isExpanded && item.extra?.hover && (
                <motion.p
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-neutral-500 mt-2 line-clamp-3 leading-relaxed"
                >
                  {item.extra.hover}
                </motion.p>
              )}
              {isExpanded
                ? (
                    <div className="flex items-center gap-2 mt-2">
                      <NavBtn item={item} />
                      <AgentBtn label={item.title} onClick={e => handleAgentClick(e, item)} />
                      <SelectBtn item={item} />
                      {date && <span className="text-xs text-neutral-500 tabular-nums"><NewsTime date={date} /></span>}
                    </div>
                  )
                : (
                    <div className="flex items-center gap-3 mt-1">
                      {item.extra?.info && (
                        <span className={$("text-xs truncate", c)}>{item.extra.info}</span>
                      )}
                      {date && <span className="text-xs text-neutral-500 tabular-nums"><NewsTime date={date} /></span>}
                    </div>
                  )}
            </div>
            <div className="shrink-0 flex items-center gap-1.5">
              {diff != null && <DiffBadge diff={diff} />}
              {!isExpanded && (
                <>
                  <AgentBtn label={item.title} onClick={e => handleAgentClick(e, item)} />
                  <SelectBtn item={item} />
                </>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="space-y-2.5">
      <LayoutGroup>
        <motion.div
          layout
          className={$(isGrid ? "grid grid-cols-2 gap-3" : "flex flex-col gap-1.5")}
        >
          <AnimatePresence mode="popLayout">
            {items.map((item, i) => isGrid ? renderGridItem(item, i) : renderListItem(item, i))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

    </div>
  )
}

// --- Sub-components ---

function NewsTime({ date }: { date: string | number }) {
  const relative = useRelativeTime(date)
  return <>{relative}</>
}

function DiffBadge({ diff }: { diff: number }) {
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    setVisible(true)
    const timer = setTimeout(() => setVisible(false), 5000)
    return () => clearTimeout(timer)
  }, [diff])

  // 位次没变（diff = 0）不值得占一个徽章：否则刷新后每行都挂一个「0」
  if (!diff) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.span
          initial={{ opacity: 0, y: -8, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.8 }}
          className={$(
            "text-[10px] font-medium px-1.5 py-0.5 rounded-md",
            "bg-primary-100 text-primary-800 dark:bg-primary-950 dark:text-primary-200",
          )}
        >
          {diff > 0 ? `+${diff}` : diff}
        </motion.span>
      )}
    </AnimatePresence>
  )
}

function AgentBtn({ onClick, label }: { onClick: (e: React.MouseEvent) => void, label?: string }) {
  return (
    <button
      type="button"
      aria-label={label ? `问 Agent：${label}` : "问 Agent"}
      className="i-ph:sparkle-duotone box-content rounded-md p-1.5 text-sm text-neutral-500 transition-colors duration-150 hover:bg-neutral-900/[0.06] hover:text-neutral-700"
      title="问 Agent"
      onClick={onClick}
    />
  )
}

/** Adds or removes one item from the compare selection (Layer 3b). */
function SelectBtn({ item }: { item: NewsItem }) {
  const selection = useAtomValue(compareSelectionAtom)
  const dispatch = useSetAtom(compareSelectionActionsAtom)
  const selected = selection.some(i => itemKey(i) === itemKey(item))

  return (
    <button
      type="button"
      aria-label={selected ? `取消对比：${item.title}` : `加入对比：${item.title}`}
      aria-pressed={selected}
      title={selected ? "已加入对比" : "加入对比"}
      className={$(selected
        ? "i-ph:check-circle-fill text-primary-600 dark:text-primary-400"
        : "i-ph:plus-circle text-neutral-500 hover:text-neutral-700", "box-content rounded-md p-1.5 text-sm transition-colors duration-150 hover:bg-neutral-900/[0.06]")}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        dispatch({ type: "toggle", item })
      }}
    />
  )
}
