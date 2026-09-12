# QA 第二轮：源健康

2026-09-12。目标：修复仍有可用上游的空白源；无法抓取或缺凭证的源统一进入停用状态，不再显示空卡片，也不再被 agent 推荐。

## 一、逐源结论

| 源 | 结论 | 根因 | 处置 |
|----|------|------|------|
| `freebuf` | 已修复 | 首页改为 JavaScript 渲染，旧 Cheerio 选择器失效 | 改用 `/fapi/frontend/home/article` JSON 接口，补 UA 和 Referer；空数据抛错 |
| `36kr-renqi` | 已修复 | 日期热榜页只剩 JavaScript 空壳 | 改用 36氪 gateway 热榜 POST 接口；`36kr`、`36kr-quick` 保持不变 |
| `cls-telegraph` | 已修复 | `/nodeapi/updateTelegraphList` 已返回 404 | 改用 `/v1/roll/get_roll_list`，沿用 `getSearchParams()` 签名；`cls-depth`、`cls-hot` 保持不变 |
| `reddit-ai-monitor` | 已修复 | 原个人 Google Alerts feed 已无条目；Reddit 会限制通用浏览器 UA | 改用 `r/artificial` 官方 Atom feed，使用描述性 UA，并让 `rss2json` 按文本读取 Atom；刷新间隔保持 30 分钟 |
| `kaopu` | 已停用 | Azure Blob JSON 已 404，站点虽为 SSR，但没有替代数据接口 | 标记为 `upstream-dead`，保留源实现和元数据 |
| `pcbeta-windows11` | 已停用 | RSS 与列表页都返回 JavaScript 挑战脚本 | 标记为 `js-challenge`，保留源实现和元数据 |
| `producthunt` | 按凭证启停 | GraphQL API 必须提供 token | 缺 `PRODUCTHUNT_API_TOKEN` 时标记为 `missing-credential`；配置后自动恢复 |
| `bilibili-ranking` | 已移除死代码 | 实现依赖返回 403 的 `rsshub.app`，且源元数据中没有该 ID | 只删除 `server/sources/bilibili.ts` 内无入口的 ranking getter；其余三个 B 站源不变 |

四个修复源都保留真实上游数据路径。解析不到可用条目时会抛出可读错误，不会用空数组或 mock 数据冒充成功。

## 二、源健康接口

```text
GET /api/sources/health
```

响应示例：

```json
{
  "updatedAt": 1789196528627,
  "disabled": {
    "kaopu": {
      "kind": "upstream-dead",
      "reason": "上游数据地址已失效，站点暂无可用数据接口",
      "since": "2026-09-12"
    },
    "pcbeta-windows11": {
      "kind": "js-challenge",
      "reason": "上游启用了 JavaScript 挑战，当前无法稳定获取内容",
      "since": "2026-09-12"
    },
    "producthunt": {
      "kind": "missing-credential",
      "reason": "缺少 Product Hunt API 凭证",
      "requires": "PRODUCTHUNT_API_TOKEN"
    }
  }
}
```

`GET /api/s?id=<id>` 会在读取缓存前检查该状态。停用源返回 503，例如：

```json
{
  "statusCode": 503,
  "message": "源已停用：上游数据地址已失效，站点暂无可用数据接口"
}
```

前端只消费健康接口返回的 ID 集合，在新闻墙和搜索结果渲染时过滤。`shared/metadata.ts` 和 localStorage 中的用户源配置不改动。agent 的 `list_sources`、默认搜索范围和单源取数也使用同一份服务端状态。

浏览器复核：最热页渲染 27 张卡片，页面文本中没有「靠谱新闻」「远景论坛 / PCbeta」「Product Hunt」。截图见 [`source-health-wall.png`](./source-health-wall.png)。

## 三、体检四桶

运行：

```bash
node scripts/audit-sources.mjs
```

脚本先请求 `/api/sources/health`，再逐源检查。默认并发为 2。

- `ok`：接口成功且至少有一条新闻。
- `empty`：接口成功，但没有条目。
- `error`：请求超时、抓取失败或接口返回错误。
- `disabled`：健康接口明确标记为停用；不发起抓取，也不计入 `error`。

明细仍写入 `/tmp/source-audit.json`。可用 `AUDIT_BASE`、`AUDIT_CONCURRENCY`、`AUDIT_TIMEOUT` 调整地址、并发与超时；`AUDIT_IDS` 可用逗号分隔的 ID 限定检查范围。

## 四、自动 gate

```bash
node scripts/qa-source-health.mjs
```

脚本先通过 `node -e` 和 `better-sqlite3` 清空 `.data/db.sqlite3` 的 `cache` 表，再验证四个修复源、停用响应、健康接口、前端过滤和体检四桶。每项输出证据，末行输出 `PASS n / FAIL n`，进程退出码等于 FAIL 数。

| 轮次 | PASS | FAIL | 证据 |
|------|-----:|-----:|------|
| 首轮 | 9 | 1 | Reddit 请求被限流，暴露通用 UA 与 Atom 响应解析问题 |
| 修正后 | 10 | 0 | 四个修复源分别返回 20、30、15、25 条；三个停用源全部进入 `disabled` 桶 |

## 补充（同日，换品牌那轮跑 build 时发现）

`shared/sources.json` 和 `shared/pinyin.json` 是**生成物**：`pnpm dev` / `pnpm build` 都会跑 `scripts/source.ts`，从 `shared/pre-sources.ts` 重新生成。仓库里那份是旧的，重新生成后多了 `bilibili-hot-video` / `bilibili-ranking` 等条目——于是出现一个**幽灵卡**：`bilibili-ranking` 在列表里，但 QA 第二轮已经把它的实现删了（`server/sources/bilibili.ts` 里没有对应 getter）→ `/api/s?id=bilibili-ranking` 返回 `Invalid source id`。

处置：不给它停用，而是补回一个**能用的实现**——官方 `/x/web-interface/ranking/v2` 有风控（同一出口偶发成功、多数 `-352`，实测 4 次里 1 次通），不稳定；改用稳定的旧接口 `ranking/index?day=3`（连续 4 次 `code 0`），代价是条目少（约 8 条）。实测 `/api/s?id=bilibili-ranking` → `status: success`，8 条。

复测全量体检（`node scripts/audit-sources.mjs`，并发 2）：**ok 61 / empty 0 / error 0 / disabled 3**。
