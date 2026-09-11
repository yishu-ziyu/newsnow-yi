import { atom } from "jotai"
import type { NewsItem } from "@shared/types"

/**
 * Items picked for a cross-source comparison. Lives outside the panel so any
 * card in any column can add to it and the floating bar can read it.
 */
export const compareSelectionAtom = atom<NewsItem[]>([])

export interface CompareSelectionAction {
  type: "toggle" | "remove" | "clear"
  item?: NewsItem
}

export const compareSelectionActionsAtom = atom(null, (get, set, action: CompareSelectionAction) => {
  const current = get(compareSelectionAtom)

  switch (action.type) {
    case "toggle": {
      if (!action.item) return
      const exists = current.some(i => String(i.id) === String(action.item!.id))
      set(compareSelectionAtom, exists
        ? current.filter(i => String(i.id) !== String(action.item!.id))
        : [...current, action.item])
      break
    }
    case "remove":
      if (!action.item) return
      set(compareSelectionAtom, current.filter(i => String(i.id) !== String(action.item!.id)))
      break
    case "clear":
      set(compareSelectionAtom, [])
      break
  }
})

/** Stable key for an item, used for selection checks. */
export function itemKey(item: Pick<NewsItem, "id">) {
  return String(item.id)
}
