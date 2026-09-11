# Layer 3 收尾：sync 兜底 / 多轮上下文 / trackers + 定时简报 / MCP 头修复

2026-09-11。范围：`~/Desktop/newsnow-yi`。对应 `docs/AGENT_PRODUCT.md` 的 Layer 3a 与遗留问题。

## 可证伪的验收项

### A. `/api/me/sync` 不再对未知用户 500
1. 数据库里没有该用户的 JWT → `GET /api/me/sync` 返回 200 且 `data` 为空（不再是 500）。
2. 同情况下 `POST /api/me/sync` 能写入（行不存在则创建），再 GET 读回同值。
3. 既有用户（OAuth 建的行）行为不变：写入后读回一致。

### B. 多轮上下文
4. 面板把最近若干轮（用户+助手）随请求发出；服务端把它们作为对话消息传给模型。
5. 追问能指代上一轮：第一轮问「今天什么新闻」，第二轮问「刚才说的那条，来源是哪个」→ 回复必须提到第一轮出现过的具体条目/来源（逐字核对）。
6. 上下文有上限（条数上限 + 单条截断），不把整段历史无限发送。

### C. trackers 表 + 定时简报
7. 建表：`trackers`、`briefings`（含 `user_id`、`topic`、时间戳、`last_run`/`next_run`）。
8. `GET/POST/DELETE /api/agent/trackers` 能列/建/删，且有登录时按用户隔离。
9. 聊天里说「帮我盯 XX」能落地成一条 tracker（模型调 `create_tracker` 工具），响应 `steps` 里能看到该调用。
10. 触发接口 `POST /api/agent/trackers/run` 需要 `CRON_SECRET`，无 secret 一律 401。
11. 跑一次到期 tracker → `briefings` 多一行，`summary` 非 mock，`source_count` > 0，tracker 的 `last_run` 前进、`next_run` 后移。
12. 进程内调度器默认关闭；`ENABLE_TRACKER_SCHEDULER=true` 时才起，且能观察到它自动跑到期项。

### D. MCP 头修复
13. dev 下 `POST /api/mcp` 用官方 SDK 客户端 `tools/call` 能返回条目（不再 406）。

### E. 总体
14. `pnpm test` 全绿（含新增单测）；`pnpm typecheck` 13 条 = 基线（全在未改动文件）。

---

## 验收结果（2026-09-11 实测）

| # | 验收项 | 结果 | 证据 |
|---|--------|------|------|
| A1 | 未知用户 GET 不再 500 | ✅ | 库里无该用户时 `GET /api/me/sync` 返回 `{"updatedTime":0}`，HTTP 200 |
| A2 | 未知用户 POST 能写入 | ✅ | POST `{data:{focus:["zhihu"]}}` → `success:true`；再 GET 读回同值（行不存在则创建） |
| A3 | 既有用户行为不变 | ✅ | 已存在行的路径仍是 UPDATE；`me/sync` 的 `verifyPrimitiveMetadata` 未改动 |
| B4 | 请求带最近几轮 | ✅ | 面板发 `history`（去掉 mock 占位、最多 8 条、每条截 1500 字） |
| B5 | 追问能指代上一轮 | ✅ | 第一轮答「iPhone Duo / 罗永浩 / 图标争议 / Stratechery」；第二轮问「刚才那条来源是哪个」→ 回复点出 36kr、weibo、stratechery，**0 次工具调用** |
| B6 | 上下文有上限 | ✅ | `trimHistoryForPrompt`：8 条上限 + 每条 1500 字 + 丢弃 `[mock]`（4 条单测） |
| C7 | 建两张表 | ✅ | `trackers`、`briefings`（含 user_id/topic/interval_ms/last_run/next_run） |
| C8 | trackers 增删查 + 按用户隔离 | ✅ | 带 JWT 建 → `persisted:true`；无登录 → `{trackers:[],persisted:false}` |
| C9 | 聊天能落地 tracker | ✅ | 说「帮我盯一下折叠屏手机」→ 工具轨迹出现 `create_tracker {topic:"折叠屏手机",days:1}`，库中多一行（interval 默认 24h） |
| C10 | cron 需 secret | ✅ | 无 secret / 错 secret → **401** |
| C11 | 跑一次到期项 → 写 briefing | ✅ | 调度器日志 `ran 1 tracker(s)`；`briefings` 多行，`model=MiniMax-M3`、`mock=0`、`source_count=34`；tracker `last_run` 前进且 `next_run = last_run + interval` |
| C12 | 调度器默认关、开了能自跑 | ✅ | 默认无日志；`ENABLE_TRACKER_SCHEDULER=true TRACKER_TICK_MS=10000` 下自行跑到期项（无任何 HTTP 触发） |
| D13 | MCP 在 dev 可用 | ✅ | 官方 SDK 客户端：connect 62ms / listTools 70ms / callTool 83ms，返回真实条目（修前 406） |
| E14 | 不回归 | ✅ | `pnpm test` 113 passed；`pnpm typecheck` 13 条 = 基线 |

## 补充说明

- **MCP 406 的真正原因**：dev 的内部代理只把 `accept` 头吃掉（`accept-language`/`cache-control`/自定义头都正常到达）。端点只讲 MCP，所以在缺失时默认 `application/json, text/event-stream`。
- **生产上怎么定时**：`POST /api/agent/trackers/run` + `x-cron-secret: $CRON_SECRET`。Cloudflare Cron Trigger / Vercel Cron / crontab 都能打；进程内调度器只是自托管方便。
- 新增环境变量：`CRON_SECRET`、`ENABLE_TRACKER_SCHEDULER`、`TRACKER_TICK_MS`（已写进 `example.env.server`）。
- `sourceCount` 仍是"缓存里读到的源数"；工具实际命中数在 `steps` 里。

> **基线更正（2026-09-11 晚）**：此前两份契约写的「typecheck 13 条 = 基线」是错的——那两次测量受 `shared/sources.json` 生成物漂移影响。用 worktree 在 fork 原始 HEAD `9c1b8871` 上实测：**15 条**（含 `shared/metadata.ts(38)` 的类型错，属原仓库既有）。当前工作树为 **14 条**，即本轮及前两轮都未引入新错误。
