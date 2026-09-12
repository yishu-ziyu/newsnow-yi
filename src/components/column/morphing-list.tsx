import { useCallback, useEffect, useMemo, useState } from "react"
import { AnimatePresence, LayoutGroup, motion } from "framer-motion"
import { useQueryClient } from "@tanstack/react-query"
import type { NewsItem, SourceID } from "@shared/types"
import { relatedNewsItems } from "@shared/news-search"
import { useWindowSize } from "react-use"
import { useAtomValue, useSetAtom } from "jotai"
import { agentPanelActionsAtom } from "~/atoms/agent-panel"
import { compareSelectionActionsAtom, compareSelectionAtom, itemKey } from "~/atoms/compare-selection"
import { layoutModeAtom } from "~/atoms/layout-mode"
import { useRelativeTime } from "~/hooks/useRelativeTime"

const SPRING = { type: "spring", stiffness: 300, damping: 25 }
/** Glance-style collapse-after. Fits ~8 rows in the 500px card without inner scroll. */
const COLLAPSE_AFTER = 8

interface WallItem extends NewsItem {
  source: string
  sourceName: string
}

function useWallPeers(sourceId: SourceID, items: NewsItem[]) {
  const queryClient = useQueryClient()
  const [tick, setTick] = useState(0)
  useEffect(() => {
    return queryClient.getQueryCache().subscribe((event) => {
      if (event.query?.queryKey?.[0] === "source") setTick(n => n + 1)
    })
  }, [queryClient])

  return useMemo(() => {
    const corpus: WallItem[] = []
    for (const [id, resp] of cacheSources) {
      if (id === sourceId) continue
      const sourceName = sources[id]?.name ?? String(id)
      for (const item of resp.items ?? []) {
        corpus.push({ ...item, source: id, sourceName })
      }
    }
    const map = new Map<string, WallItem[]>()
    for (const item of items) {
      const peers = relatedNewsItems({ ...item, source: sourceId }, corpus)
      if (peers.length) map.set(itemKey(item), peers)
    }
    return map
  }, [items, sourceId, tick])
}

export interface MorphingNewsListProps {
  items: NewsItem[]
  type: "hottest" | "realtime"
  sourceColor: string
  sourceId: SourceID
}

export function MorphingNewsList({ items, sourceColor, sourceId }: MorphingNewsListProps) {
  const layout = useAtomValue(layoutModeAtom)
  const [expandedId, setExpandedId] = useState<string | number | null>(null)
  const [showAll, setShowAll] = useState(false)
  const { width } = useWindowSize()
  const isMobile = width < 768
  const setAgentPanel = useSetAtom(agentPanelActionsAtom)
  const peersByItem = useWallPeers(sourceId, items)
  const visibleItems = showAll || items.length <= COLLAPSE_AFTER ? items : items.slice(0, COLLAPSE_AFTER)
  const hiddenCount = items.length - visibleItems.length

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
            {isExpanded && <ClusterPeers peers={peersByItem.get(itemKey(item)) ?? []} isMobile={isMobile} />}
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
                    <div className="flex items-center gap-2 min-w-0">
                      <PeerBadge count={peersByItem.get(itemKey(item))?.length ?? 0} />
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
              {isExpanded && <ClusterPeers peers={peersByItem.get(itemKey(item)) ?? []} isMobile={isMobile} />}
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
                      <PeerBadge count={peersByItem.get(itemKey(item))?.length ?? 0} />
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
            {visibleItems.map((item, i) => isGrid ? renderGridItem(item, i) : renderListItem(item, i))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>
      {hiddenCount > 0 && (
        <button
          type="button"
          className="w-full rounded-lg py-1.5 text-xs text-neutral-500 transition-colors duration-150 hover:bg-neutral-900/[0.06] hover:text-neutral-700"
          onClick={() => setShowAll(true)}
        >
          还有
          {" "}
          {hiddenCount}
          {" "}
          条
        </button>
      )}

    </div>
  )
}

// --- Sub-components ---

function PeerBadge({ count }: { count: number }) {
  if (count < 1) return null
  return (
    <span className="shrink-0 text-[10px] text-neutral-500 tabular-nums">
      {count + 1}
      {" "}
      源
    </span>
  )
}

function ClusterPeers({ peers, isMobile }: { peers: WallItem[], isMobile: boolean }) {
  if (!peers.length) return null
  return (
    <ul className="mt-2 flex flex-col gap-1 border-t border-neutral-900/10 pt-2">
      {peers.map((peer) => {
        const href = isMobile ? (peer.mobileUrl || peer.url) : peer.url
        return (
          <li key={`${peer.source}:${peer.url}`} className="flex items-center gap-1 min-w-0">
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-w-0 flex-1 items-center gap-2 text-xs text-neutral-700 hover:text-neutral-900"
              onClick={e => e.stopPropagation()}
            >
              <span className="shrink-0 text-neutral-500">{peer.sourceName}</span>
              <span className="truncate">{peer.title}</span>
            </a>
            <SelectBtn item={peer} />
          </li>
        )
      })}
    </ul>
  )
}

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
