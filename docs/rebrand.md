# 去上游化（二次开发换品牌）

2026-09-12。目标：把上游 NewsNow 的品牌痕迹从**界面和产物**里剥离，同时满足 MIT 的署名要求。

## 已经做完的

| 位置 | 改动 |
|---|---|
| `shared/brand.ts`（新） | 品牌单一入口：站点名、页头字标、描述、仓库、作者、上游署名。**换品牌改这一个文件** |
| `package.json` | `author` / `homepage` 指向 `yishu-ziyu/newsnow-yi`（`shared/consts.ts` 的 `Author` / `Homepage` 都读它） |
| `src/components/footer.tsx` | 「NewsNow © 2024 By ourongxing」→「基于 NewsNow 二次开发 · © 2024-<当年> yishu-ziyu」+ 保留 MIT LICENSE 链接 |
| `src/components/header/index.tsx` | 字标改读 `Brand.wordmark`；版本号链接指向本仓库 `/releases` |
| `src/components/header/menu.tsx` | 写死的上游仓库与 shields 徽章改为读 `Brand.repo` |
| `src/components/column/index.tsx` | 浏览器标题 `NewsNow \| …` → `${Brand.name} \| …` |
| `index.html` | title / description / keywords / OG / Twitter / Schema.org 全部换成新品牌；`og:url` 暂用仓库地址 |
| `index.html` | **移除上游的 Google Analytics**（那段 gtag 用的是上游作者的媒体资源，留着等于把访客数据交出去）。要统计就换成自己的 ID 或自托管方案 |
| `pwa.config.ts` | manifest 的 `name` / `short_name` / `description` 改读 `Brand` |
| `server/utils/agent-runner.ts` | Agent 自我介绍的站名读 `Brand.name` |
| `server/mcp/server.ts` | MCP server 名读 `Brand.name` |
| `server/api/oauth/github.ts` | OAuth User-Agent 读 `Brand.name` |

## 验证（生产构建）

```bash
pnpm build
grep -rl "ourongxing" dist/output/public/assets   # 只剩 Brand.upstream 那一处署名
```

- `dist/output/public/index.html` 的 `<title>` = 新闻墙，`manifest.webmanifest` 的 `name` = 新闻墙
- 两个调试角标（右下 TanStack Router、左下 TanStack Query）**不在生产产物里**：`src/routes/__root.tsx` 用 `import.meta.env.DEV` 包着

## 还必须留的（MIT 要求）

- 仓库根目录 `LICENSE`（`Copyright (c) 2024 ourongxing`）——MIT 允许修改、闭源、商用，但要求保留版权声明与许可声明。
- 页脚那句「基于 NewsNow 二次开发」+ 指向上游的链接，就是把这件事显式写在界面上。

## 还没做的（需要你给素材/决定）

1. **站名**：`shared/brand.ts` 里现在是占位「新闻墙」，改 `name` 与 `wordmark` 两行即可全站生效。
2. **图标与分享图**：`public/icon.svg`、`apple-touch-icon.png`、`pwa-192x192.png`、`pwa-512x512.png`、`og-image.png` 仍是上游素材，需要替换。
3. **域名**：`index.html` 的 `og:url` 现在指向仓库地址，上线后换成你的域名。
4. `README*.md` 与 `docs/` 里的上游说明按需重写。

## 第二批：仓库位置与镜像来源

- `docker-compose.yml`：原来 `image: ghcr.io/ourongxing/newsnow:latest`——`docker compose up` 跑的是**上游作者发布的镜像**，一行本仓库的改动都不含。改成 `build: .`（仓库里有 Dockerfile，默认端口 4444）。
- `README.zh-CN.md` / `README.ja-JP.md` 的 MCP 配置示例里 `BASE_URL` 原来指向上游的线上实例 `newsnow.busiyi.world`，改成自托管的 `http://127.0.0.1:4444`。

改完之后全仓库搜 `ourongxing/newsnow` 只剩三处，都是**故意保留的署名**：`shared/brand.ts`（页脚署名链接）、`README.md` 第 7 行与第 99 行（"基于 xxx 的增强版本" / "原项目"）。
