# 对话历史持久化 + 简报接工具层 · 验收契约

2026-09-11。范围：`~/Desktop/newsnow-yi`。

## 与产品文档的一处偏差（需确认）

`docs/AGENT_PRODUCT.md` 写「对话历史存在 D1（user.data 字段）」。实际 `user.data` 列被 `/api/me/sync` 的 `verifyPrimitiveMetadata` 约束为 `Record<string, string[]>`（关注/收藏），塞消息对象会让那个接口 500。
**改法**：新建 `agent_history` 表（`id` = userId、`data` = JSON、`updated`），不动 `user` 表。后续 `trackers`/`briefings` 也走同一模式。

## 可证伪的验收项

1. **历史能存能读**：`POST /api/agent/history` 存 3 条消息 → `GET /api/agent/history` 读回同样 3 条（同内容同顺序）。
2. **未登录不报错**：登录未配置（dev 现状）时，两个方法都返回 `persisted:false` 与空列表，HTTP 200，不抛 500。
3. **不污染现有同步**：`/api/me/sync` 的 payload 形状与校验不变；`pnpm test` 全绿。
4. **简报走工具**：种子标题里没有的主题（例如「量子计算」）提问时，响应 `steps` 至少含一次工具调用，且摘要里引用的标题能在源里逐条核对到。
5. **简报降级保留**：无 provider 时仍返回 `mock:true` 的占位摘要。
6. **上限**：简报与对话共用 6 步上限。
7. **不回归**：`pnpm test` 全绿；`pnpm typecheck` 13 条 = 基线（全在未改动文件）。
8. **界面可见**：重新打开面板能看到上一轮对话（截图存证）。

---

## 验收结果（2026-09-11 实测）

| # | 验收项 | 结果 | 证据 |
|---|--------|------|------|
| 1 | 历史能存能读 | ✅ | 带 JWT 存 3 条 → 读回 3 条，顺序一致，assistant 那条的 `steps`/`model` 都保留 |
| 2 | 未登录不报错 | ✅ | 无 token 时 `GET/POST /api/agent/history` 均返回 `{messages:[],persisted:false}`，HTTP 200 |
| 3 | 不污染现有同步 | ✅ | `/api/me/sync` 及其 `verifyPrimitiveMetadata` 未改动；`pnpm test` 105 passed |
| 4 | 简报走工具 | ✅ | 主题「量子计算」（种子标题里没有）：`steps` 14 次工具调用，跨 8 组源检索；摘要如实报告"零命中"，未编造；主题「iPhone」：0 次工具调用，直接基于种子写出带来源的简报 |
| 5 | 简报降级保留 | ✅ | 无缓存/无 provider 两条 mock 分支都补了 `degradedReason` |
| 6 | 上限 | ✅ | 对话与简报共用 `stopWhen: stepCountIs(6)`（一个 step 内模型可并发多个工具调用） |
| 7 | 不回归 | ✅ | `pnpm test` 105 passed；`pnpm typecheck` 13 条 = 基线，全在未改动文件 |
| 8 | 界面可见 | ✅ | 注入 JWT + 建好对应用户行后，打开面板读回三条历史，含 `minimax · MiniMax-M3` 标注 |

## 过程中发现并处理的两件事

1. **中间件不给 `/api/agent/*` 解析 JWT**：`server/middleware/auth.ts` 只在 `/api/s`、`/api/me` 上挂 `event.context.user`，所以历史接口永远拿不到用户。已把 `/api/agent` 加进那段（只在有 token 时附加用户，不通过也不 401）。
2. **`/api/me/sync` 对未知用户 500**（既有行为）：`UserTable.getData` 查不到行就抛。任何"本地造 JWT 但库里没有该用户"的情况都会让页面白屏。本轮没有改它，测试时先往 `user` 表建了行；**建议后续单独处理**（例如 `getData` 返回空 data 而不是抛错）。

## 已知限制

- 历史按用户存储，**没有登录就只在内存里**（dev 默认如此）。
- 历史不参与对话上下文：面板只带当前问题 + 当前文章；跨轮追问依赖模型在单次请求内的工具结果。
- briefing 的 `sourceCount` 仍是"读过缓存的源数"，不是"工具实际命中过的源数"。
