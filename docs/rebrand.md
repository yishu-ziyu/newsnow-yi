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

## 定稿（用户拍板）

- **站名**：闻见（`name: "闻见"`、`wordmark: ["闻","见"]`、`latin: "WENJIAN"`）。含义：**闻**是收到世界的消息，**见**是从消息里形成自己的判断。
- **一句对外文案**：闻见 — 从新闻里，看见值得追踪的事。
- **描述**：把几十个来源的实时资讯放在一起，追问、对比，并持续追踪真正重要的变化。
- **域名**：`https://wenjian.yishuziyu.cn/` —— `og:url`、Schema.org `url`、`public/sitemap.xml` 三处统一（sitemap 原来还写着上游的 `newsnow.busiyi.world`，已换）。

### 「信号点阵」品牌视觉

一套母版导出五个文件，**不要**报纸/地球/RSS/天线这些新闻 App 陳词：

| 文件 | 规格 | 生成方式 |
|---|---|---|
| `public/icon.svg` | 512×512 矢量母版：3×3 点阵，八个低权重信息（细点 + 方块），中心一个是红色信号点 | 手写 SVG |
| `public/apple-touch-icon.png` | 180×180 | `magick -background none -density 384 public/icon.svg -resize 180x180 public/apple-touch-icon.png` |
| `public/pwa-192x192.png` | 192×192 | 同上，`-resize 192x192` |
| `public/pwa-512x512.png` | 512×512 | `magick -background none -density 768 public/icon.svg -resize 512x512 public/pwa-512x512.png` |
| `public/og-image.png` | 1200×630：左侧「闻见 + 一句文案」，右侧一小片示意卡片墙，两条红色虚线从信号点汇进「值得追踪的变化」简报块 | 渲染 `scripts/brand/og-image.html` 后截图（用 `scripts/qa-cdp-lib.mjs` 起一次性无头浏览器，1200×630） |

色板固定：暖纸 `#F9F7F1`、炭黑 `#20201D`、强调红 `#F14D42`；无渐变、无玻璃、圆角很小；16px favicon 仍然只看得到「点阵 + 红色信号点」（已按 16/32px 放大目视核对）。

页头字标改用 `font-serif-heading`（原来那套 Baloo 2 是上游的拉丁字标字体，中文用不上，预加载链接一并去掉）；「见」用主色，对应"从消息里形成判断"。
