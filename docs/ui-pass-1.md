# UI pass 1 实施记录

2026-09-12。范围：UI 评审 01 的 A + B 档。

## 改动

- 序号保留中性底色，默认态改为 `text-neutral-700 / font-medium`；展开态改为浅主色底配 `text-primary-800`，不再使用低对比白字。
- 「原文」改为中性浅底配深色字，hover 改为背景色变化。
- 列表与网格标题统一为 w700；来源名降为 14px/w500；序号降为 w500；meta 和变化徽章同步减重。
- ✦ / ⊕ 使用 `box-content p-1.5`，点击区从 17×17 增至 29×29，并保留行内间距。
- 刷新、收藏、拖动三个卡片头部图标补齐动态 `aria-label` 和 `title`。

## Gate 前后实测

命令：`node scripts/qa-ui-pass1.mjs`

| 检查项 | 改前 | 改后 |
|---|---:|---:|
| 序号对比度（列表） | 1.16:1 | 8.91:1 |
| 行内按钮点击区（列表） | 17×17 / 17×17 | 29×29 / 29×29 |
| 头部图标 aria-label | 3 个缺失 | 0 个缺失 |
| 标题字重 vs 来源名字重 | w600 vs w700 | w700 vs w500 |
| 来源名字号 | 20px | 14px |
| 序号字重 | w900 | w500 |
| 「原文」按钮对比度 | 1.14:1 | 9.13:1 |
| 序号对比度（展开态） | 2.77:1 | 7.14:1 |
| 序号对比度（网格） | 1.14:1 | 9.10:1 |
| 行内按钮点击区（网格展开） | 17×17 / 17×17 | 29×29 / 29×29 |

结果：`PASS 10 / FAIL 0`。

同尺寸截图：

- 列表：`/tmp/ui-pass1-list.png`（1440×1250）
- 网格：`/tmp/ui-pass1-grid.png`（1440×1250）

## 其他检查

- `npx eslint src/components/column/morphing-list.tsx src/components/column/card.tsx`：通过。
- `npx tsc --noEmit -p tsconfig.app.json`：仓库仍有 42 个既存错误；本轮改动没有新增错误。输出中的 `src/components/column/card.tsx:107` 隐式 `any` 来自本轮前已有的 `findIndex` 回调。
- `git diff --check`：通过。

## 遗留问题

A + B 验收项已全部通过。C 档不在本轮范围：固定高度卡片仍依赖内部滚动和底部渐隐，没有“还有 N 条”的文字入口；27 张卡片仍保持等权布局。
