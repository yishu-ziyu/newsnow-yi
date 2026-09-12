# 部署：把 闻见 放到 wenjian.yishuziyu.cn

2026-09-12。**线上现在是空的**：`wenjian.yishuziyu.cn` 在 DNS 里根本不存在（`dig` 返回 NXDOMAIN），仓库也还没部署过任何环境。所以浏览器报「拒绝连接」不是服务挂了，而是「没有解析 + 没有服务」两件事同时成立。

父域 `yishuziyu.cn` 的 NS 在阿里云（`dns19/dns20.hichina.com`），已经有一条 `gun.yishuziyu.cn` 指向 ECS `121.89.90.68`。下面三条路任选一条，都要在两处动手：**① 部署代码 ② 在阿里云 DNS 加一条记录**。

## A. Vercel（最快，CLI 已登录）

本仓库已经就绪：`nitro.config.ts` 里 `preset` 会按环境切成 `vercel`，`VERCEL=1 pnpm build` 能产出 `.vercel/output`（已实测）。

```bash
vercel link           # 建/关联项目（当前 CLI 登录身份：yishu-ziyu）
vercel env add NEWSNOW_LLM_API_KEY        # Agent 面板要的模型 key（不配就是"模拟回复 · 未接模型"）
vercel env add JWT_SECRET                 # 登录态签名
vercel --prod
```

- **DNS**：Vercel 项目里 `Add Domain` → `wenjian.yishuziyu.cn`，它会给一个 CNAME 目标（通常是 `cname.vercel-dns.com`）。去阿里云 DNS 加：`记录类型 CNAME`、`主机记录 wenjian`、`记录值 <Vercel 给的目标>`。证书 Vercel 自动签。
- **数据库**：不配也能跑——新闻墙和 Agent 对话可用，缓存/登录/追踪/简报会退化（`getCacheTable()` 在 DB 不可用时会静默跳过）。要完整功能就接一个 Postgres（Vercel 市场里的 Neon 等），把 `nitro.config.ts` 的 `database.default.connector` 换成对应 db0 connector，并设 `DATABASE_URL`。
- **定时简报**：Vercel 上用 Cron 打 `POST /api/agent/trackers/run`（带 `CRON_SECRET`），不要开 `ENABLE_TRACKER_SCHEDULER`。

## B. Cloudflare Pages（上游主推，D1 内置）

```bash
wrangler login                       # 现在未登录，token 已过期
wrangler d1 create wenjian-db        # ⚠️ wrangler.toml 里现在的 database_id 是上游作者的，必须换掉
# 把新 id 写回 wrangler.toml，并把 name 从 newsnow 改成你的项目名
pnpm deploy                          # = CF_PAGES=1 build + wrangler pages deploy
```

- **DNS**：CF 里给 Pages 项目加自定义域；若 DNS 仍托管在阿里云，需要 CNAME 到 `<project>.pages.dev`（CF 会用它自己的证书）。
- 这套的定时任务本来就走 cron endpoint。

## C. 自己那台阿里云 ECS（和 gun.yishuziyu.cn 一套）

```bash
# 服务器上
git clone https://github.com/yishu-ziyu/newsnow-yi && cd newsnow-yi
cp example.env.server .env.server     # 填 key
docker compose up -d --build          # compose 已改成从本仓库构建，只监听 127.0.0.1:4444
```

- 前面需要一个反向代理 + 证书：Caddy 最省事（`wenjian.yishuziyu.cn { reverse_proxy 127.0.0.1:4444 }` 自动申请 Let's Encrypt），或 nginx + certbot。
- **DNS**：阿里云 DNS 加 `A` 记录、`主机记录 wenjian`、`记录值 121.89.90.68`（和 gun 同机，注意端口别冲突）。
- 想要定时简报就把 `ENABLE_TRACKER_SCHEDULER=true` 写进 compose 环境变量。

## 三条路的取舍

| | Vercel | Cloudflare Pages | 自有 ECS |
|---|---|---|---|
| 现在能不能立刻做 | 能（CLI 已登录，构建已验证） | 要重新登录 wrangler + 建 D1 | 要登录服务器 |
| 数据库 | 需外接 Postgres（可不配，功能退化） | D1 内置 | 本地 SQLite，最省心 |
| 定时任务 | Cron 打接口 | Cron 打接口 | 进程内调度器可用 |
| 证书 | 自动 | 自动 | Caddy 自动 |
| 成本 | 免费额度够用 | 免费额度够用 | 现有机器 |

**我的建议**：先走 A 把域名跑通（今天就能开），数据库留到需要登录/追踪时再接；如果更希望"数据在自己机器上"，走 C，因为那台 ECS 已经在跑东西了，加一个容器 + Caddy 配置最省事。
