![](/public/og-image.png)

[English](README.md) | 简体中文

# NewsNow Pro - 优质信息聚合阅读器

> 🚀 基于 [ourongxing/newsnow](https://github.com/ourongxing/newsnow) 的增强版本，专注于**海外优质 AI 资讯与深度阅读**

**_优雅地阅读实时资讯与热点新闻_**

## ✨ 本项目的创新

在原项目的基础上，我们做了以下增强：

### 🌍 新增海外优质信息源

| 分类         | 源                 | 说明                        |
| ------------ | ------------------ | --------------------------- |
| **AI 资讯**  | TLDR               | 每日科技快讯摘要            |
|              | OpenAI Research    | OpenAI 官方研究动态         |
|              | Reddit AI Monitor  | Reddit AI 工具讨论监控      |
| **科技博客** | Stratechery        | Ben Thompson 的科技商业分析 |
|              | Lenny's Newsletter | 产品增长与用户运营洞察      |
|              | Paul Graham Essays | 创业与黑客精神              |
| **深度阅读** | Aeon               | 哲学与人文深度随笔          |
|              | Psyche             | 心理学与生活哲学            |
|              | Farnam Street      | 思维模型与决策智慧          |
| **中文精选** | 阮一峰的网络日志   | 科技爱好者周刊              |

### 🔧 技术改进

- **Foreign Source Proxy**：通过 RSS-to-JSON 代理解决海外源访问问题
- **信息分层架构**：新增 `english` 专栏，独立展示海外资讯
- **模块化设计**：`server/sources/foreign/` 目录专门管理海外源

---

## 原项目功能

- 简洁优雅的 UI 设计，带来最佳阅读体验
- 实时热点新闻更新
- GitHub OAuth 登录与数据同步
- 30 分钟默认缓存（登录用户可强制刷新）
- 自适应抓取间隔，优化资源使用
- 支持 MCP Server

## 部署

### 基础部署

无需登录和缓存功能：

1. Fork 本仓库
2. 导入到 Cloudflare Pages 或 Vercel

### Cloudflare Pages 配置

- 构建命令: `pnpm run build`
- 输出目录: `dist/output/public`

### 环境变量

参考 `example.env.server`，本地开发时重命名为 `.env.server`：

```env
G_CLIENT_ID=
G_CLIENT_SECRET=
JWT_SECRET=
INIT_TABLE=true
ENABLE_CACHE=true
```

### Docker 部署

```sh
docker compose up
```

## 开发

> 需要 Node.js >= 20

```sh
corepack enable
pnpm i
pnpm dev
```

### 添加新信息源

1. 在 `server/sources/foreign/` 创建源文件
2. 使用 `defineForeignSource` 封装 RSS URL
3. 在 `shared/pre-sources.ts` 注册源信息

详细说明见 [CONTRIBUTING.md](CONTRIBUTING.md)

## 致谢

- 原项目 [ourongxing/newsnow](https://github.com/ourongxing/newsnow)
- RSS-to-JSON API by rss2json.com

## License

[MIT](./LICENSE) © ourongxing

---

> 📫 如有问题或建议，欢迎提 Issue 或 PR
