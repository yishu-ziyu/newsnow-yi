# DEVLOG

本文件记录**这个仓库**的开发流水与关键事实。多产品环境下最容易搞混的是"哪个数据库属于哪个产品"，所以数据库归属表放在最前面，改动时请顺手更新。

## 数据库与外部服务归属（别记混）

| 产品 | 仓库 | 数据库 / 存储 | 位置 | 谁在写 |
|---|---|---|---|---|
| **闻见**（本仓库） | `yishu-ziyu/newsnow-yi` | **Neon Postgres**，项目 `wenjian-db`（Neon ID `spring-wave-56611505`，区域 Singapore） | 通过 Vercel 集成安装，连接串以 `DATABASE_URL` 注入 Vercel 项目 `wenjian`（Production + Preview，Sensitive 不可回读） | 应用运行时写 `cache` / `user` / `agent_history` / `trackers` / `briefings` 五张表 |
| 作品集站点 | `yishu-ziyu/yishu-archive-site-vercel` | **Supabase** 项目 `yishu-ziyu's Project`（ref `qrmmlolsslnxiamznicf`） | Supabase 组织 `yishu-archive` | Storage 桶 `project-covers` + 线上 `projects` 表 |
| ABQ Roleplay Lab | （本地应用） | **Supabase** 项目 `abq-roleplay`（ref `uacopbotolzdhoidrhjn`） | 同上组织 | ABQ 自己的表 |
| Aegis-Manim | `yishu-ziyu/Aegis-Manim` | Supabase 项目 `Aegis-Manim`（**已暂停**） | 同上组织 | — |

**本地开发不连线上库**：没有 `DATABASE_URL` 时用仓库里 `.data/db.sqlite3`（Node 内置 `node:sqlite`），离线可跑。生产才用 Neon。

⚠️ Supabase 免费版一个账号只能有 **2 个活跃项目**，当前两个活跃的都在给上面两个产品用。所以闻见**没有**占用 Supabase，走的是 Neon（免费档 0.5 GB/项目，无需信用卡）。

## 部署

| 项 | 值 |
|---|---|
| 托管 | Vercel 项目 `wenjian`（团队 `sheldons-projects-6ef373e4`） |
| 线上域名 | `https://wenjian.yishuziyu.cn`（`A`/`CNAME` 在阿里云 DNS，见 `docs/deploy.md`） |
| 生产别名 | `https://wenjian-steel.vercel.app` |
| 自动部署 | GitHub 仓库已连接，push 到 `main` 会自动部署 |
| 函数运行时 | **Node.js**（`nitro.config.ts` 里 Vercel 分支必须是 `preset: "vercel"`，不是 `vercel-edge`） |
| 环境变量（Production） | `DATABASE_URL`（Neon 集成注入）、`NEWSNOW_LLM_FALLBACK_MINIMAX`、`JWT_SECRET`；**未配** `G_CLIENT_ID/G_CLIENT_SECRET`（即登录功能关闭） |

## 流水

### 2026-09-12 — 上线 + 打通数据库

- 域名 `wenjian.yishuziyu.cn` 上线：Vercel 部署 + 阿里云 DNS。**记录类型用 CNAME**（`3b08bd462ba5ffd7.vercel-dns-017.com`），Vercel 一开始推荐的 `A 76.76.21.21` 是 legacy 方案，证书会卡在 "Generating SSL Certificate"。
- 接入 Neon Postgres 作为缓存/用户/追踪/简报的数据库。踩到并修掉四个坑，都记在 `docs/handoff-2026-09-12.md` 的"根因"一节：
  1. Vercel 分支被上游写成 `vercel-edge` → Edge Runtime 没有 `node:net`，Postgres 驱动起不来；
  2. nitro 的 `database` 配置在运行时按名字动态 import 连接器，Vercel 函数产物里没有 `node_modules` → 静默失败，缓存永远不生效；
  3. 本地 SQLite 曾用 `better-sqlite3`（原生模块）→ 函数启动即崩；改 `node:sqlite`；
  4. 表结构用 `INTEGER` 存毫秒时间戳 → Postgres 32 位溢出；改 `BIGINT`。另外表名 `user` 是 Postgres 保留字，改为 `"user"`。
- 关掉 `routeRules` 里的全站 ISR（`"/**": { isr: 3600 }`）：实测它会把 `/api/s` 包装成 ISR 函数后稳定失败（`FUNCTION_INVOCATION_FAILED`）。源数据已经有数据库缓存，不需要 ISR。

（更早的历史见 git log：QA 第一轮源体检、UI 评审 01 的 A/B 档、主题与主色、去上游化 rebrand。相关文档都在 `docs/`。）
