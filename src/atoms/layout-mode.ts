import { atomWithStorage } from "jotai/utils"

/**
 * 新闻墙的视图：单列条目的「列表」和两列卡片的「网格」。
 * 全局一个，放在导航行右侧；选择记在 localStorage，刷新后保持。
 */
export type LayoutMode = "list" | "grid"

export const layoutModeAtom = atomWithStorage<LayoutMode>("newsnow:layout-mode", "list")
