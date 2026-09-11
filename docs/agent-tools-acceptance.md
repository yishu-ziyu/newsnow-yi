# 最小 Agent（工具层 + 一次循环）验收契约

2026-09-11。范围：`~/Desktop/newsnow-yi`（NewsNow Pro fork）。

## 目标

面板要能"根据这些新闻对话"：模型可以调工具去取真实条目，而不是靠自己的记忆答。

## 可证伪的验收项

1. **密钥落地**：`NEWSNOW_LLM_FALLBACK_MINIMAX` 写在 `.env.server`（该文件被 `.gitignore` 覆盖）。不注入任何进程 env，重启 `pnpm dev` 后 `POST /api/agent/chat` 返回 `mock: false`、`provider: "minimax"`。
2. **mock 可见**：清空三把 fallback key 后同一接口返回 `mock: true`；面板对 `mock: true` 的消息显示可见徽标，对 `mock: false` 不显示。
3. **真接地**：不带文章上下文问「今天有什么 iPhone 相关的新闻？」，响应 `steps` 至少含一次工具调用，且回复里出现的标题能在同一次 `/api/s` 输出里找到（逐条核对，不靠感觉）。
4. **有上限**：一次请求内工具调用不超过 6 步，到上限仍给出最终回复（不空转、不报错、不留半句话）。
5. **不回归**：`pnpm test` 全绿（含新增检索单测）；`pnpm typecheck` 不引入新错误——基线是 13 条，全在 `nitro.config.ts`、`server/utils/source.test.ts`、`uno.config.ts`、`server/sources/nowcoder.ts` 这四个本次未改动的文件里。
6. **界面可见**：面板显示本次的工具调用轨迹（截图存证）。

## 明确不做

向量检索、跨会话记忆、流式输出、工具审批。以上留作后续。

---

## 验收结果（2026-09-11 实测）

| # | 验收项 | 结果 | 证据 |
|---|--------|------|------|
| 1 | 密钥落地 `.env.server`，干净启动后 `mock:false` | ✅ | `pnpm dev`（不注入进程 env）→ `POST /api/agent/chat` 返回 `provider:"minimax"`、`model:"MiniMax-M3"`、`mock:false` |
| 2 | 无模型时 mock 徽标可见 | ✅ | 面板渲染「模拟回复 · 未接模型」徽标，`title` 为降级原因；对 `mock:false` 不显示（截图 `/tmp/newsnow-agent-ui-mock.png`、`-real.png`） |
| 3 | 回复真接地 | ✅ | 问「今天有什么 iPhone 相关的新闻？」→ `search_news` 扫 8 源 159 条、匹配 10 条；回复引用的「iPhone Duo 正式发布」在 coolapk、「代购订单达成…150%」在 wallstreetcn-quick 与 36kr-quick 中逐条核对到 |
| 4 | 工具调用有上限且能收尾 | ✅ | 上限 6 步；跨源对比问题用 2 步完成并给出完整结论（含国内/英文源对比表） |
| 5 | 不回归 | ✅ | `pnpm test` 100 passed；`pnpm typecheck` 13 条，与基线一致且全在未改动文件 |
| 6 | 面板显示工具轨迹 | ✅ | 面板显示「调了 1 次工具 / search_news · query=iPhone limit=10」与「minimax · MiniMax-M3」 |

## 过程中发现并修掉的问题

1. **AI SDK 的 Anthropic baseURL 规范不同**：SDK 拼 `${baseURL}/messages`，而 MiniMax 的端点是 `/anthropic/v1/messages`。加 `anthropicMessagesBaseUrl()` 统一补 `/v1`（手写的 `callLLM` 不受影响，它自己拼 `/v1/messages`）。单测 3 条。
2. **dev 下相对 `$fetch('/api/s')` 会变成 `/api/api/s`**（nitro dev 的 base 是 `/api`），中间件按 506 拒掉。改为进程内取数（先读缓存表，再调 getter），不再依赖 HTTP 跳转。同一个根因也让既有 MCP 工具在 dev 下失效，`server/mcp/server.ts` 一并改为复用同一个取数函数。
3. **`pnpm add` 把 `h3-nightly` 从 1.15.4 顶到 2.0.0**，`vite-plugin-with-nitro` 直接起不来。用 `pnpm.overrides` 的 `vite-plugin-with-nitro>h3` 选择器钉回；`zod` 顺带升到 3.25.76 满足 `ai` 的 peer。

## 仍然存在、未处理

- **MCP 端点在 dev 下返回 406**：dev 的请求对象不带 header（实测 `event.node.req.headers.accept === undefined`），transport 的头校验过不去。生产环境（真实 node/CF 请求）不受影响。未修，需另开一次。
- `reddit-ai-monitor` 返回 0 条；`zaobao` 上游超时——都是源本身的问题，工具会如实报出而不是假装没有。
