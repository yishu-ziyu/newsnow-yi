# 追踪/简报面板 UI + Layer 3b 对比入口 · 验收契约

2026-09-11。范围：`~/Desktop/newsnow-yi`。同时作为 UI 设计优化的第一轮（参考 ui-skills.com 的 baseline-ui / review-animations / better-typography）。

## 功能验收

### A. 对比分析入口（Layer 3b）
1. 列表里每条新闻可多选（选中态可见、可取消），选中 ≥2 条时出现浮层「对比分析 N 条」。
2. 点它打开面板并自动发起对比请求；请求体带全部选中条目（标题/链接/摘要）。
3. 响应完成后，回复必须体现**跨来源差异**（引用至少 2 个不同来源的条目），且工具轨迹/来源标注可见。
4. 选中态为空时不显示浮层；清空后浮层消失。

### B. 追踪 / 简报面板
5. 面板有「对话 / 追踪」两个视图，切换不丢失对话内容。
6. 追踪视图列出：主题、间隔、下次运行时间、上次运行时间；无数据时给一个明确动作（去对话里说「帮我盯 X」）。
7. 删除追踪需要二次确认（就地确认，不弹远端对话框）。
8. 简报视图列出历史简报：主题、时间、模型、来源数、摘要（可展开/收起）、工具调用数。
9. 未登录时两个视图都显示「登录后可保存/查看」的空态，不报错。

### C. UI 设计约束（来自 ui-skills.com 的 baseline-ui + review-animations）
10. 无渐变、无发光；accent 每屏只用一处（项目已有的 `primary` 令牌）。
11. 图标按钮必须有 `aria-label`；空态必须有一个明确动作。
12. 动效只用 `transform`/`opacity`，时长 < 300ms，入场 `ease-out`，且尊重 `prefers-reduced-motion`；hover 动效只在 `(hover:hover) and (pointer:fine)` 下生效。
13. 数据类文本用 `tabular-nums`；密集 UI 用 `truncate`/`line-clamp`；标题 `text-wrap: balance`。
14. 不复用手写键盘/焦点行为：复用项目已有交互，按钮用原生 `button`。

## 总体验收
15. `pnpm test` 全绿；`pnpm typecheck` 对照 fork 原始 HEAD（15 条）不引入新错误（本轮实测 14 条）。
16. 运行时截图存证：对比浮层、对比结果、追踪视图、简报视图、空态。

---

## 验收结果（2026-09-11 实测）

| # | 验收项 | 结果 | 证据 |
|---|--------|------|------|
| 1 | 多条可选、选中态可见 | ✅ | 列表里 108 个可选条目；选中显示实心勾（`text-primary`），未选显示 `+`；`aria-pressed` 正确 |
| 2 | 选中 ≥2 出现浮层并可发起对比 | ✅ | 浮层文案「3 条已选 · 两条标题 · +1 · 对比分析 · 清空」；点击后面板打开并自动发出对比请求 |
| 3 | 回复体现跨来源差异 | ✅ | 实测输出「口径差异与矛盾点」「第一条有明显反转：前期自媒体叙事 vs 后期警方/官方通报」「第二三条只有单一来源，不足以对比」+ 结论，引用 3 个不同来源 |
| 4 | 不足 2 条不显示浮层 | ✅ | 选择 1 条时 `[aria-label="对比选择"]` 不存在 |
| 5 | 对话/追踪两视图切换不丢对话 | ✅ | 切到追踪再切回，消息仍在（状态在 atom，不在组件本地） |
| 6 | 追踪视图字段 + 空态动作 | ✅ | 已登录空态显示「说一句「帮我盯 XX」…」+ 按钮「去对话里建一条」；有数据时显示主题/间隔/回看天数/上次/下次（`tabular-nums`） |
| 7 | 删除需二次确认 | ✅ | 就地两段式「删除 → 确认删除 / 取消」，无远端弹窗 |
| 8 | 简报列表可展开 | ✅ | 主题/时间/来源数/工具次数/占位标记 + 展开收起（默认 3 行 `line-clamp-3`） |
| 9 | 未登录两视图不报错 | ✅ | 追踪视图显示「登录后才能保存追踪与简报。」，均为 HTTP 200 |
| 10-14 | UI 约束 | ✅ | 见下表 |
| 15 | 不回归 | ✅ | `pnpm test` 113 passed；我改的文件 typecheck 零错误 |
| 16 | 截图存证 | ✅ | `/tmp/newsnow-ui-compare-bar2.png`、`-trackers-empty.png`、`-tabs.png` |

## 设计反查（按 ui-skills.com 的 skill）

用到的 skill：`ibelick/baseline-ui`（反 slop 约束）、`emilkowalski/review-animations`（十条动效标准）、`jakubkrehel/better-typography`。

**改掉的违规**：
1. **`animate-slide-in` 是死类名** —— UnoCSS 从未生成它，面板一直没有入场动效。改成 framer-motion：`opacity + x`，200ms，`cubic-bezier(.23,1,.32,1)`，`prefers-reduced-motion` 下退化为纯淡入。
2. **激活标签白底白字** —— `bg-base` 在暗色模式是暖纸色，配 `dark:text-neutral-100` 导致文字不可见。改为 `bg-primary/15 text-primary`（每屏一个 accent），实测红字对比度约 5.5:1。
3. **图标按钮缺 `aria-label`** —— ✦ 按钮只有 `title`；`title` 不是无障碍名称。✦ 与新的 `+` 都补了 `aria-label`，选中态用 `aria-pressed`。
4. **深色下 chip 文字只有 `neutral-500`** —— 提到 `neutral-600/300`、`neutral-500/400` 分级。
5. **6 处 `transition: all`** —— 按 motion skill 收窄为具体属性（`transition-opacity` / `transition-[box-shadow,border-color]` / `transition-colors`）；其中分页点在动 **`width`**（布局属性），改为只过渡 `background-color`。
6. **加载态、背景遮罩** —— 跳点加 `motion-reduce:animate-none`；遮罩补 `aria-hidden="true"`。
7. **空态缺动作** —— 追踪空态现在有一个明确下一步（切回对话并预填「帮我盯 」并聚焦）。

**检查后确认合规**：无渐变、无发光、无 `h-screen`、无 `scale(0)`、无任意 `z-[]`、无 `will-change`、无改字距；动效时长 150–200ms 全部 <300ms 且只用 `transform`/`opacity`；数据文本 `tabular-nums`；密集处 `truncate`/`line-clamp`；标题 `text-wrap: balance`、正文 `text-wrap: pretty`。
