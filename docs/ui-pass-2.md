# UI pass 2 实施记录：默认浅色 + 主色 + 面板表面

2026-09-12。范围：`docs/ui-pass-2-acceptance.md`。用户拍板的方向：默认浅色、主色加深一档、面板用同一张暖纸、diff=0 不显示。

## 根因回顾

- `index.html` 写死 `<html class="dark">`，`useDark` 的默认值也是 `"dark"` → 新访客一进来就是深色；而卡片墙全是写死的浅色 → "暖纸墙 + 近黑面板"。
- 主色：`uno.config.ts` 里 `primary = red` 整条色阶，`bg-primary` 落到 red-400 `#F87171` → 白字压上去 2.77:1。
- 面板深色覆盖不全：「清空 / 关闭」是继承来的深墨字 `rgb(44,44,44)` 压在近黑底上 → **1.04:1，等于看不见**。

## 改动

| 文件 | 改动 |
|---|---|
| `index.html` | 去掉写死的 `class="dark"`；`<head>` 里加首屏 inline 脚本，读 localStorage 的 `color-scheme`（jotai 存的是带引号的 JSON）决定是否加 `dark`，避免刷新闪一下 |
| `src/hooks/useDark.ts` | 默认值 `"dark"` → `"light"`（深色仍可切换，老用户存过的选择保留） |
| `agent-panel/index.tsx` | 「清空 / 关闭」补显式文字色；发送按钮 `bg-primary` → `bg-primary-600` + hover `primary-700`；tab / 用户气泡 / 快捷提问芯片从 `text-primary` 改为 `text-primary-800`（深色 `primary-200`）；placeholder 深色档 `neutral-400`；空态、步骤轨迹、时间戳等一批 `neutral-400/500` 提到 `neutral-600` |
| `column/morphing-list.tsx` | diff 徽章 `diff === 0` 直接不渲染；变化徽章与对比勾选图标改用 `primary-100/800`、`primary-600` |
| `common/compare-bar.tsx` | 「对比分析」按钮 `bg-primary` → `bg-primary-600` |
| `header/index.tsx` | 深色下的头部图标 `dark:text-primary` → `dark:text-primary-400` |
| `navbar.tsx` | 当前栏目选中色 `color-primary` → `color-primary-700`（深色 `primary-300`），浅色纸面上才够读 |

## 两个 gate 的前后

`node scripts/qa-ui-pass2.mjs`

| 检查项 | 改前 | 改后 |
|---|---:|---:|
| P1 新访客默认浅色 | FAIL（html.dark=true） | **PASS**（html.dark=false，无 localStorage 也能亮） |
| P1 页面底色是暖纸 | PASS 0.93 | PASS 0.93 |
| P2 面板表面与页面同色系 | FAIL（面板 rgb(34,34,34)，通道差 215） | **PASS**（面板 rgb(249,247,241)，通道差 0） |
| P3 面板文字对比度 | FAIL（清空/关闭 1.04，发送 2.77，对话 3.87） | **PASS**（9 个文字节点全部 ≥ 4.5） |
| P3 输入框 placeholder | FAIL 2.82:1 | **PASS** 4.11:1 |
| P4 主色实底上的白字 | FAIL 2.77:1 | **PASS** 4.83:1（白 on `#dc2626`） |
| P5 存过 dark 的老访客 | PASS | **PASS** |
| P6 diff=0 不渲染 | 空过 | PASS（本轮没触发到非零 diff 数据，改动只是提前 return，非零仍显示） |

深色模式补测（老用户切回去时）：面板内「清空」按钮对比度从 **1.04:1 → 10.62:1**。

`node scripts/qa-ui-pass1.mjs`（回归）：**PASS 10 / FAIL 0**，与 pass 1 收工时一致，卡片墙没有回退。

## 其他检查

- `npx eslint`：改动文件 0 error（agent-panel 里有 2 条既有 warning：react-refresh 只导出组件、索引做 key）。
- `npx tsc --noEmit -p tsconfig.app.json`：仍是 42 个既存错误，本轮没有新增。

## 截图

- 浅色墙：`/tmp/ui-pass2-wall.png`
- 浅色面板：`/tmp/ui-pass2-panel.png`
- 深色面板（老用户选择）：`/tmp/ui-pass2-panel-dark.png`

## 遗留

- 面板与页面只靠 1px 边框 + 阴影分层，颜色完全一致；用户如果觉得"糊在一起"，下一步可以给面板加一档更明显的阴影或轻微降饱和底色。
- 深色模式只是"没坏"，没有专门设计过（默认已经不走深色）。
- 评审 01 的 C 档（卡内滚动的显式入口、卡片等权布局）仍未动。
