import { useAtomValue, useSetAtom } from "jotai"
import { motion, useReducedMotion } from "framer-motion"
import { agentPanelActionsAtom, openComparePanel } from "~/atoms/agent-panel"
import { compareSelectionActionsAtom, compareSelectionAtom, itemKey } from "~/atoms/compare-selection"

const EASE = [0.23, 1, 0.32, 1] as const

/**
 * Floating bar for the cross-source comparison entry (Layer 3b).
 * Shows up only when two or more items are picked.
 */
export function CompareBar() {
  const selection = useAtomValue(compareSelectionAtom)
  const dispatchSelection = useSetAtom(compareSelectionActionsAtom)
  const setAgentPanel = useSetAtom(agentPanelActionsAtom)
  const reduceMotion = useReducedMotion()

  if (selection.length < 2) return null

  const start = () => {
    setAgentPanel(openComparePanel(selection))
    dispatchSelection({ type: "clear" })
  }

  return (
    <motion.div
      className="fixed bottom-5 left-1/2 z-40 flex max-w-[92vw] -translate-x-1/2 items-center gap-2 rounded-full border border-neutral-200 bg-base/95 px-3 py-2 shadow-lg backdrop-blur-md dark:border-neutral-700 dark:bg-neutral-900/95"
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
      animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.16, ease: EASE }}
      role="region"
      aria-label="对比选择"
    >
      <span className="shrink-0 text-xs text-neutral-600 tabular-nums dark:text-neutral-300">
        {selection.length}
        {" "}
        条已选
      </span>

      <div className="flex min-w-0 gap-1">
        {selection.slice(0, 2).map(item => (
          <span
            key={itemKey(item)}
            className="max-w-[16ch] truncate rounded-full bg-neutral-400/10 px-2 py-0.5 text-xs text-neutral-600 dark:text-neutral-300"
            title={item.title}
          >
            {item.title}
          </span>
        ))}
        {selection.length > 2 && (
          <span className="px-1 text-xs text-neutral-500 tabular-nums dark:text-neutral-400">
            +
            {selection.length - 2}
          </span>
        )}
      </div>

      <button
        type="button"
        className="shrink-0 rounded-full bg-primary-600 px-3 py-1 text-xs text-white transition-colors duration-150 hover:bg-primary-700"
        onClick={start}
      >
        对比分析
      </button>
      <button
        type="button"
        aria-label="清空选择"
        className="shrink-0 rounded-full px-2 py-1 text-xs text-neutral-500 transition-colors duration-150 hover:bg-neutral-400/20 hover:text-neutral-700 dark:text-neutral-300 dark:hover:text-neutral-100"
        onClick={() => dispatchSelection({ type: "clear" })}
      >
        清空
      </button>
    </motion.div>
  )
}
