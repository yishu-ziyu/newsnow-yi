# 闻见

从新闻里，看见值得追踪的事。

线上：[wenjian.yishuziyu.cn](https://wenjian.yishuziyu.cn)

把几十个来源的实时资讯放在一起，追问、对比，并持续追踪真正重要的变化。

基于 [NewsNow](https://github.com/ourongxing/newsnow) 二次开发。

## 能做什么

- **新闻墙**：知乎、微博、HN 等几十个源并排看，热榜实时更新
- **追问**：点一条新闻问 Agent，总结、翻译、对比口径
- **登录后**：同步关注源；对 Agent 说「帮我盯 XX」，追踪和简报会记在你的账号下

目前只接 GitHub 登录。没登录也能看墙、问 Agent。

## 本地开发

需要 Node.js >= 20。

```bash
corepack enable
pnpm i
cp example.env.server .env.server
pnpm dev
```

打开 [http://127.0.0.1:5173](http://127.0.0.1:5173)。端口被占用时会直接报错（`--strictPort`）。

本地默认用 SQLite（`.data/db.sqlite3`）。**不要**把生产 `DATABASE_URL` 写进 `.env.server`，否则本地会往线上库写数据。

Agent 至少配一个模型 key（见 `example.env.server`）；不配也能跑，对话会走内置免费兜底或模拟回复。

## 部署

当前生产跑在 **Vercel（Node 函数）+ Neon Postgres**，域名 `wenjian.yishuziyu.cn`。push 到 `main` 会自动部署。

要用登录和缓存，在托管平台配置：

| 变量 | 用途 |
|---|---|
| `DATABASE_URL` | Postgres（生产是 Neon） |
| `JWT_SECRET` | 登录态签名 |
| `G_CLIENT_ID` / `G_CLIENT_SECRET` | GitHub OAuth App。回调地址：`https://你的域名/api/oauth/github` |
| `NEWSNOW_LLM_FALLBACK_MINIMAX` 等 | Agent 模型；不配则走内置兜底 |

GitHub OAuth 建的是 [OAuth App](https://github.com/settings/applications/new)，不是 GitHub App。

Docker：

```bash
docker compose up --build
```

## MCP

```json
{
  "mcpServers": {
    "wenjian": {
      "command": "npx",
      "args": ["-y", "newsnow-mcp-server"],
      "env": {
        "BASE_URL": "https://wenjian.yishuziyu.cn"
      }
    }
  }
}
```

自托管时把 `BASE_URL` 换成你的域名。

## License

[MIT](./LICENSE)。原作 © [ourongxing](https://github.com/ourongxing)；本仓库二次开发 © [yishu-ziyu](https://github.com/yishu-ziyu)。
