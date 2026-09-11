# UI 设计优化 · 第 1 轮：卡片墙配色

2026-09-11。参考 `ui-skills.com` 的 `ibelick/baseline-ui`（每屏一个 accent、无渐变、不用大面积动效、空态给动作）与 `emilkowalski/review-animations`。

## 问题

八张源卡各自把整卡铺成自己的色（`bg-{color}-500 bg-op-60`），肉眼是一堵**八色齐喊**的墙；卡片里还叠了一层 `sprinkle-{color}` 径向渐变，加载时整卡 `animate-pulse`。

## 改法

| 位置 | 改前 | 改后 |
|------|------|------|
| 卡片面 | `bg-{color}-500 bg-op-60` 整卡色块 | 半透明白 `bg-white/55` + `border-neutral-900/10` + 极轻阴影，保持暖纸底色 |
| 源身份 | 整卡色块 + 彩色标题 + 彩色图标组 | **只剩一条 2px 顶部细色条**（`aria-hidden`）+ 原本的源图标 |
| 排序号 | 实心 `bg-{color}-500 text-white` | 中性 `bg-neutral-900/[0.06] text-neutral-600`；**展开的那一条**才用 `bg-primary text-white` |
| hover / 展开 | `ring-{color}` `border-{color}` | 统一到 `ring-primary/40`、`border-primary/30`，hover 走中性 |
| 列表行 | 白色胶囊 `bg-white/60 backdrop-blur-sm` | 透明底，hover/展开才起白 |
| 新增标记 DiffBadge | `bg-{color}-500 text-white` | `bg-primary/15 text-primary`（唯一 accent） |
| 布局切换（Stack/Grid/List） | 激活项 `bg-{color}-500 text-white` | 激活项 `bg-neutral-900/80 text-white`（中性深色，红只留给语义） |
| 卡片装饰 | `sprinkle-{color}` 径向渐变 | 删除 |
| 加载 | 整卡 `animate-pulse` + 列表 `op-20` | 结构化骨架屏（6 行占位）+ 轻微 `op-80` |
| 浅底上的 `dark:` 文本 | `text-neutral-500 dark:text-neutral-400` | 去掉 `dark:` 变体（卡片面始终是浅纸，`html.dark` 会让浅底浅字） |

## 实测

对比度（WCAG，卡片底 `rgba(255,255,255,.55)` 叠在 `#F9F7F1` 上）：

```
AA✅ 标题        15.13
AA✅ 卡片头部信息 13.97
AA✅ 元信息(热度) 7.81   ← 改前 2.52（neutral-400 被 dark: 变体覆盖）
```

`pnpm test` 113 passed；本轮改动的文件 typecheck 零错误。

## 刻意保留的

- **每个源仍有身份色**：顶部细色条 + 源图标。识别度不靠大面积色块，靠一条线。
- 卡片间距、圆角、双击/拖动等既有交互未动。
- 面板（抽屉）仍是深色面：它与卡片墙不在同一层，深色是它的既有语言，未纳入本轮。

## 下一轮

- （任务 3）对比结果做成**立场矩阵**：按来源横向对齐的多列结构，替代现在的纯文本段落。
- （任务 1）面板信息层级：工具轨迹收成一行可展开、provider 标注弱化。

---

# 第 2 轮：对比结果用 markdown 渲染（任务 3）

## 做了什么

不做服务端结构化，改成**把助手回复按 markdown 子集渲染**，其中包含表格——模型给出的对比表本身就是立场矩阵。

- `shared/markdown.ts`：纯解析器，输出块结构（标题/段落/列表/代码/表格）+ 行内 `**粗体**`、`` `代码` ``；8 条单测。
- `src/components/common/markdown-lite.tsx`：把块渲染成 React 节点，**不用 `dangerouslySetInnerHTML`**，恶意回复无法注入标记。
- 面板助手气泡改走 `MarkdownLite`；用户气泡仍是纯文本。
- 对比指令改成明确要求表格：「先给一句结论，再用 markdown 表格逐维度对比（表头固定为「维度 | 来源 | 说法」），最后列出矛盾点或信息缺口」。

## 实测

跨源选三条 → 面板自动对比，回复渲染为：

```
标题：对比 3 条来源
正文段落 + 表格（表头：维度 | 来源 | 说法，4 行）+ 列表（矛盾点或信息缺口）
工具轨迹：调了 2 次工具（search_news / list_sources）· minimax · MiniMax-M3
```

DOM 断言：`tables: 1`、`header: ["维度","来源","说法"]`、`rows: 4`、页面无错误。

## 途中踩到的四个坑（都值得记）

1. **python 替换没加断言 → 静默失败**：`MarkdownLite` 的 import 语句没插进去，JSX 用了未定义标识符，面板每次渲染回复都进错误边界（"Something went wrong! MarkdownLite is not defined"）。**症状是表格数一直是 0**，我一度以为是模型不吐表格。教训：批量文本替换必须 `assert`。
2. **`tool_choice` 在这个网关不可用**：MiniMax 的 Anthropic 兼容端点接受 `{"type":"any"}`，**拒绝 `"auto"`（400 invalid params）**，忽略 `{"type":"tool","name":…}`；指定工具的强制调用会报 `tool is not defined`。所以放弃"第二次调用强制工具提交矩阵"的方案。
3. **`generateObject` 的 JSON mode 不稳定**：同一段输入 3 次里只有 1 次通过 schema（嵌套数组的 zod→JSON Schema 转换对网关不友好）。
4. **nitro dev 的服务端 bundle 不会随每次编辑立即重建**：改完 `agent-runner.ts` 后测到的仍是旧提示词。判断办法是看 `dist/.nitro/dev/index.mjs` 的 mtime；另外**中文在 bundle 里是 `\uXXXX` 转义的**，直接 grep 中文会误判成"没生效"。

## 遗留

- 模型对"输出表格"的服从度不是 100%：内容单薄时它可能只给列表。渲染层已能处理任意组合，所以不影响可用性。
- 任务 1（面板信息层级：工具轨迹收成一行可展开、provider 标注弱化）未做。
