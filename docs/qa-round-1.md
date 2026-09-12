# QA 第一轮：源体检 + 用户模拟

2026-09-12。目标：交付前把「用户点开就能用」这件事查实。两条线——**64 个源的体检**与**脚本化的用户旅程**。

## 一、源体检

工具：`scripts/audit-sources.mjs`（打本地 `/api/s`，与浏览器同一条路径）。
**并发必须 ≤2**：6 并发会把本机代理（Clash 7897）打爆，制造一片假超时。

| 轮次 | 正常 | 空 | 报错 |
|------|------|----|------|
| 首测（并发 6，假象） | 46 | 6 | 9 |
| 降并发复测 | 52 | 5 | 7 |
| 修完（本轮） | **56** | **3** | **5** |

### 修好的

| 源 | 症状 | 根因 | 修法 |
|----|------|------|------|
| `latepost` | 取不到 | 站点用 Let's Encrypt 新根 `ISRG Root YR`，Node 信任库没有（curl 会自动补根） | 存 `certs/isrg-root-yr.pem` + `NODE_EXTRA_CA_CERTS`（见 `docs/tls-extra-ca.md`） |
| 全部依赖外网的源 | 大面积超时 | **Node 的 fetch 默认不读 `http_proxy`**，本机是代理上网 | dev/start 加 `NODE_USE_ENV_PROXY=1`（Node 22 已支持） |
| `qbitai` | 0 条 | 上游 `Content-Type: application/rss+xml`，ofetch 按 JSON 解析成 `{}`，cheerio 拿到空对象 | `responseType: "text"` |
| `fastbull-express` | 0 条 | 行内没有详情链接（只有 `mailto:` 分享），代码要求 `href` 才收 | 用 `data-id` 去重、指向列表页 |
| `bilibili-hot-search` / `bilibili-hot-video` | 403 | RSSHub 公共实例对 B 站接口全 403/503（`rsshub.app`、`rssforever`、`pseudoyu` 全试过） | 改用 B 站官方接口（热词 / 热门） |
| `pcbeta-windows11` | `Cannot read properties of undefined (reading 'title')` | 论坛 RSS 返回 HTML，`rss2json` 里 `channel` 为 undefined 就取 `.title` | `rss2json` 加护栏；`defineRSSSource` 给可读错误「RSS 没有可用条目：<url>」 |

### 仍然坏着（建议处置，未动）

| 源 | 症状 | 根因 | 建议 |
|----|------|------|------|
| `kaopu` | 超时 | Azure blob 主机在本机网络不可达 | 换源或停用 |
| `bilibili-ranking` | 403 | 官方 ranking 接口被风控（39B 空响应），RSSHub 全挂 | 换实现或停用 |
| `cls-telegraph` | 404 | 财联社 API 路径/sign 变更 | 重写或停用 |
| `producthunt` | 缺 token | 未配 `PRODUCTHUNT_API_TOKEN` | **无 token 时应从源列表隐藏**（待做） |
| `freebuf` | 空 | 选择器漂移（页面已无 `news-item`/`bf-article`） | 重写选择器 |
| `reddit-ai-monitor` | 空 | 用的是个人 Google Alerts feed（易过期） | 换源或停用 |
| `36kr-renqi` | 空 | 热榜页是 JS 壳，gateway API 500 | 重写或停用 |

## 二、用户模拟（脚本化）

`qa-user-sim.mjs`（公共流程）+ `qa-logged-in.mjs`（登录态）。

**公共流程 17/17**：冷启动渲染与「不卡骨架」、卡片刷新、✦ 开面板、空输入不发请求、普通提问（带工具轨迹）、追问接上下文、多选浮层、对比出表格、对比不崩、接口 500 不崩且明确告知、失败后输入框可用、移动端无横向溢出、整轮无未捕获错误。

**登录态 8/8**：追踪空态、对话里建追踪、列表显示主题与下次运行、cron 触发运行、简报落接口、简报在面板渲染、删除二次确认、无未捕获错误。

### 这轮 QA 抓到的产品缺陷（都修了）

1. **面板输入框深色下隐形**：继承页面的墨色（`#2C2C2C`）在近黑面板上，对比度 1.1:1 → 显式给色，实测 16.44:1。
2. **失败源永远转骨架**：骨架条件写成「没有条目」而不是「正在加载」→ 改为只在加载中显示，结束后显示原因 + 重试。
3. **启动就报 506**：`/api/enable-login` 不在中间件白名单，每个访客控制台都有红色报错 → 加白名单。
4. **登录入口指向死链**：`enable-login` 恒返回 `enable:true`，未配 `G_CLIENT_ID` 时给出 `client_id=undefined` → 改为按配置返回。
5. **接口 500 被当成正常回复**：面板没查 `response.ok`，错误体被渲染成「（无回复）」→ 加检查并把原因显示给用户。
6. **对话请求不带登录态**：面板发 `/api/agent/chat` 没带 JWT，服务端拿不到用户 → `create_tracker` 无法落地 → 带上 `Authorization`。
7. **追踪视图不刷新**：只在挂载时加载一次，别处新建的简报不出现 → 切到该页签即重拉 + 加手动刷新按钮。
8. **对比结果不稳定出表格**：模型偶尔只给列表 → 服务端发现无表格时用一次无工具改写调用补出表格（实测 3/3 都有表格）。

### QA 自身的坑（记下来免得重踩）

- **不要删 devtools 的 DOM**：直接 `remove()` 会挖掉 React 子树，后续点击全部失效（表现为"面板打不开"）。正确做法是用 CSS 隐藏。
- **断言看文案会误报**：模型措辞每次不同（"追踪已建好" vs "已建立追踪"）。状态类断言一律查接口/查库。
- **删 DOM 之外的另一个坑**：nitro dev 的服务端 bundle 不是每次编辑都重建，判断生效要看 `dist/.nitro/dev/index.mjs` 的 mtime；且中文在 bundle 里被转义成 `\uXXXX`，grep 中文会误判。
