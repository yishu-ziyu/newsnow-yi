import { useCallback, useEffect, useState } from "react"
import { AnimatePresence, LayoutGroup, motion } from "framer-motion"
import type { NewsItem } from "@shared/types"
import { useWindowSize } from "react-use"
import { useSetAtom } from "jotai"
import { agentPanelActionsAtom } from "~/atoms/agent-panel"
import { useRelativeTime } from "~/hooks/useRelativeTime"

const SWIPE_THRESHOLD = 50
const SPRING = { type: "spring", stiffness: 300, damping: 25 }

export type LayoutMode = "stack" | "grid" | "list"

export interface MorphingNewsListProps {
  items: NewsItem[]
  type: "hottest" | "realtime"
  sourceColor: string
}

export function MorphingNewsList({ items, sourceColor }: MorphingNewsListProps) {
  const [layout, setLayout] = useState<LayoutMode>("list")
  const [expandedId, setExpandedId] = useState<string | number | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const { width } = useWindowSize()
  const isMobile = width < 768
  const setAgentPanel = useSetAtom(agentPanelActionsAtom)

  const handleAgentClick = useCallback((e: React.MouseEvent, item: NewsItem) => {
    e.preventDefault()
    e.stopPropagation()
    setAgentPanel({ type: "open", item })
  }, [setAgentPanel])

  const handleDragEnd = useCallback((_event: MouseEvent | TouchEvent | PointerEvent, info: { offset: { x: number }, velocity: { x: number } }) => {
    const { offset, velocity } = info
    const swipe = offset.x * velocity.x
    if (offset.x < -SWIPE_THRESHOLD || swipe < -1000) {
      setActiveIndex(prev => (prev + 1) % items.length)
    } else if (offset.x > SWIPE_THRESHOLD || swipe > 1000) {
      setActiveIndex(prev => (prev - 1 + items.length) % items.length)
    }
  }, [items.length])

  const toggleExpand = useCallback((id: string | number) => {
    setExpandedId(prev => prev === id ? null : id)
  }, [])

  if (!items.length) return null

  const isStack = layout === "stack"
  const isGrid = layout === "grid"
  const stackVisibleCount = 3

  const stackItems = isStack
    ? Array.from({ length: Math.min(stackVisibleCount, items.length) }, (_, i) => {
        const idx = (activeIndex + i) % items.length
        return { item: items[idx], stackPos: i }
      })
    : null

  const c = `color-${sourceColor}`
  const bgSolid = `bg-${sourceColor}-500`
  const borderC = `border-${sourceColor}/30`

  // --- Nav button inside expanded card ---
  const NavBtn = ({ item }: { item: NewsItem }) => {
    const href = isMobile ? (item.mobileUrl || item.url) : item.url
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={$(
          "inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg",
          "transition-all hover:opacity-80",
          `${bgSolid} text-white`,
        )}
        title={item.title}
      >
        <span className="i-ph:arrow-square-out text-sm" />
        原文
      </a>
    )
  }

  // --- Stack ---
  const renderStackItem = (item: NewsItem, _index: number, stackPos: number) => {
    const isExpanded = expandedId === item.id
    const isTopCard = stackPos === 0
    const diff = item.extra?.diff
    const date = item.pubDate || item.extra?.date

    return (
      <motion.div
        key={item.id}
        layoutId={String(item.id)}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{
          opacity: 1,
          scale: isExpanded ? 1.01 : (1 - stackPos * 0.03),
          y: stackPos * 8,
          x: stackPos * 3,
          zIndex: stackVisibleCount - stackPos,
          rotate: (stackPos - 1) * 1.5,
        }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        transition={SPRING}
        drag={isTopCard ? "x" : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.7}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd}
        whileDrag={{ scale: 1.02 }}
      >
        <div
          onClick={() => toggleExpand(item.id)}
          className={$(
            "cursor-pointer rounded-2xl border shadow-md transition-all",
            "backdrop-blur-sm bg-white/70",
            borderC,
            isTopCard && `hover:shadow-lg hover:border-${sourceColor}/50`,
            isExpanded && `ring-2 ring-${sourceColor}/50 shadow-lg`,
            isStack && "absolute w-full",
          )}
        >
          <div className="p-4">
            <div className="flex items-start gap-3">
              <span className={$(
                "shrink-0 w-9 h-9 flex items-center justify-center rounded-xl text-base font-black text-white",
                bgSolid,
              )}
              >
                {activeIndex + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className={$("font-bold leading-snug line-clamp-2 text-neutral-800", isExpanded && "text-base")}>
                  {item.title}
                </p>
                {isExpanded && item.extra?.hover && (
                  <motion.p
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-neutral-500 mt-3 line-clamp-3 leading-relaxed"
                  >
                    {item.extra.hover}
                  </motion.p>
                )}
                {isExpanded && (
                  <div className="flex items-center gap-2 mt-3">
                    <NavBtn item={item} />
                    <AgentBtn onClick={e => handleAgentClick(e, item)} />
                  </div>
                )}
                <div className="flex items-center gap-3 mt-2">
                  {item.extra?.info && (
                    <span className={$("text-xs font-semibold truncate", c)}>{item.extra.info}</span>
                  )}
                  {date && <span className="text-xs text-neutral-400"><NewsTime date={date} /></span>}
                </div>
              </div>
              <div className="shrink-0 flex flex-col items-end gap-1">
                {diff != null && <DiffBadge diff={diff} color={sourceColor} />}
                {!isExpanded && <AgentBtn onClick={e => handleAgentClick(e, item)} />}
              </div>
            </div>
          </div>
          {isTopCard && (
            <div className="text-center pb-2">
              <span className="text-[10px] text-neutral-400">Swipe to navigate</span>
            </div>
          )}
        </div>
      </motion.div>
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
            "cursor-pointer rounded-2xl shadow-sm overflow-hidden transition-all",
            "backdrop-blur-sm bg-white/70",
            "border border-neutral-200/60",
            `hover:shadow-md hover:border-${sourceColor}/40`,
            isExpanded && `ring-2 ring-${sourceColor}/40 shadow-md`,
          )}
        >
          <div className={$("h-2 w-full", bgSolid)} />
          <div className="p-3.5">
            <div className="flex items-start gap-2.5">
              <span className={$(
                "shrink-0 w-8 h-8 flex items-center justify-center rounded-lg text-sm font-black text-white",
                bgSolid,
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
                      <AgentBtn onClick={e => handleAgentClick(e, item)} />
                    </div>
                    {diff != null && <DiffBadge diff={diff} color={sourceColor} />}
                  </div>
                )
              : (
                  <div className="flex items-center justify-between mt-2.5">
                    <div className="flex items-center gap-2">
                      {item.extra?.info && <span className={$("text-xs font-semibold truncate", c)}>{item.extra.info}</span>}
                      {date && <NewsTime date={date} />}
                    </div>
                    {diff != null && <DiffBadge diff={diff} color={sourceColor} />}
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
            "cursor-pointer rounded-xl transition-all px-3 py-2.5 -mx-1",
            "backdrop-blur-sm bg-white/60",
            "border border-transparent",
            `hover:bg-white/80 hover:shadow-sm hover:border-${sourceColor}/30`,
            isExpanded && `bg-white/80 shadow-sm border-${sourceColor}/40`,
          )}
        >
          <div className="flex items-center gap-3">
            <span className={$(
              "shrink-0 w-7 h-7 flex items-center justify-center rounded-lg text-xs font-black text-white",
              bgSolid,
            )}
            >
              {index + 1}
            </span>
            <div className="min-w-0 flex-1">
              <p className={$("text-sm font-semibold leading-snug line-clamp-1 text-neutral-800", isExpanded && "line-clamp-2")}>
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
                      <AgentBtn onClick={e => handleAgentClick(e, item)} />
                      {date && <span className="text-xs text-neutral-400"><NewsTime date={date} /></span>}
                    </div>
                  )
                : (
                    <div className="flex items-center gap-3 mt-1">
                      {item.extra?.info && (
                        <span className={$("text-xs truncate", c)}>{item.extra.info}</span>
                      )}
                      {date && <span className="text-xs text-neutral-400"><NewsTime date={date} /></span>}
                    </div>
                  )}
            </div>
            <div className="shrink-0 flex items-center gap-1.5">
              {diff != null && <DiffBadge diff={diff} color={sourceColor} />}
              {!isExpanded && <AgentBtn onClick={e => handleAgentClick(e, item)} />}
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="space-y-2.5">
      {/* Layout Toggle */}
      <div className="flex items-center justify-center gap-0.5 rounded-lg bg-black/10 p-0.5 w-fit mx-auto">
        {(["stack", "grid", "list"] as LayoutMode[]).map(mode => (
          <button
            type="button"
            key={mode}
            onClick={() => setLayout(mode)}
            className={$(
              "rounded-md px-3 py-1.5 text-xs font-bold transition-all",
              layout === mode ? `${bgSolid} text-white` : "text-neutral-500 hover:text-foreground hover:bg-neutral-400/10",
            )}
          >
            {mode === "stack" ? "Stack" : mode === "grid" ? "Grid" : "List"}
          </button>
        ))}
      </div>

      <LayoutGroup>
        <motion.div
          layout
          className={$(
            isStack && "relative h-[26rem]",
            isGrid && "grid grid-cols-2 gap-3",
            !isStack && !isGrid && "flex flex-col gap-1.5",
          )}
        >
          <AnimatePresence mode="popLayout">
            {isStack && stackItems
              ? stackItems.map(({ item, stackPos }) => renderStackItem(item, activeIndex + stackPos, stackPos))
              : items.map((item, i) =>
                  isGrid ? renderGridItem(item, i) : renderListItem(item, i),
                )}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      {isStack && items.length > 1 && (
        <div className="flex justify-center gap-1.5 pt-1">
          {items.map((item, index) => (
            <button
              type="button"
              key={item.id}
              onClick={() => setActiveIndex(index)}
              className={$(
                "h-1.5 rounded-full transition-all",
                index === activeIndex ? `w-5 ${bgSolid}` : "w-1.5 bg-neutral-400/25 hover:bg-neutral-400/50",
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// --- Sub-components ---

function NewsTime({ date }: { date: string | number }) {
  const relative = useRelativeTime(date)
  return <>{relative}</>
}

function DiffBadge({ diff, color }: { diff: number, color: string }) {
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    setVisible(true)
    const timer = setTimeout(() => setVisible(false), 5000)
    return () => clearTimeout(timer)
  }, [diff])

  return (
    <AnimatePresence>
      {visible && (
        <motion.span
          initial={{ opacity: 0, y: -8, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.8 }}
          className={$(
            "text-[10px] font-black px-1.5 py-0.5 rounded-md",
            `bg-${color}-500 text-white`,
          )}
        >
          {diff > 0 ? `+${diff}` : diff}
        </motion.span>
      )}
    </AnimatePresence>
  )
}

function AgentBtn({ onClick }: { onClick: (e: React.MouseEvent) => void }) {
  return (
    <button
      type="button"
      className="i-ph:sparkle-duotone text-sm text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-opacity px-1"
      title="Ask Agent"
      onClick={onClick}
    />
  )
}
