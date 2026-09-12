# 源健康（QA 第二轮）验收契约

2026-09-12。上游：`docs/qa-round-1.md` 里"仍然坏着的 7 个源"+ 一个新出现的坏源（`pcbeta-windows11`，站点在本轮开始返回 JS 挑战页）。

目标是两件事：**能修的修好**，**修不了的不再冒充"有内容的卡片"**——它们从新闻墙和搜索里消失，接口给出可读原因，而不是空白卡片或 500。

## Change（用户可观察）

1. 新闻墙、搜索里不再出现停用源：`kaopu`、`pcbeta-windows11`。没有 `PRODUCTHUNT_API_TOKEN` 时 `producthunt` 同样不出现；配上 token 后自动恢复。
2. 四个曾空白的源恢复出条目，`GET /api/s?id=<id>` 返回 `status: "success"` 且 `items.length >= 10`：`freebuf`、`36kr-renqi`、`cls-telegraph`、`reddit-ai-monitor`。
3. `GET /api/s?id=kaopu` 返回 4xx 且 body.message 是中文可读原因（含"停用"字样），不再是 500，也不再返回空 items。
4. 新增 `GET /api/sources/health` → `{ updatedAt: number, disabled: Record<SourceID, { kind, reason, since? }> }`；`kind ∈ upstream-dead | js-challenge | missing-credential`。
5. `node scripts/audit-sources.mjs` 输出四个桶 `ok / empty / error / disabled`，停用源计入 disabled，不再计入 error。

## Not this（不算数）

- 删掉源实现文件，或从 `shared/sources.json` 里抹掉条目（实现要留着，配好凭证/上游恢复后能重新启用）。
- 前端硬编码一份坏源名单（名单以服务端 `/api/sources/health` 为准，前端只消费）。
- 只在 UI 隐藏，接口仍去抓取（`/api/s` 必须在查缓存之前就拒绝停用源）。
- 用 try/catch 把抓取错误吞成空数组，让体检"看起来没报错"。
- 用假数据/mock 让体检变绿。

## Gate（数字，不是"通过/不通过"）

`node scripts/qa-source-health.mjs`（新脚本，打本地 dev server），逐条断言 Change 1–5，输出 `PASS n / FAIL n` 和每条的证据行；退出码 = FAIL 数。运行前清空 `.data/db.sqlite3` 的 cache 表（否则 4 个源会命中旧的空缓存，误判）。

## Evaluator

- 独立 validator：不看实现过程，跑 gate 脚本 + 手工复核其中 3 条（curl 原始输出）；每条 FAIL 必须给 file:line 或原始响应。
- 浏览器复核：CDP 打开 `http://127.0.0.1:5173/`，新闻墙和"最热/实时"里找不到 `靠谱新闻`、`PCbeta`、`Product Hunt` 卡片，且控制台无未捕获错误。

## Evidence

- gate 脚本改动前后各一次的输出（前后对比表）。
- `docs/qa-round-2.md`：逐源结论表（修好的 / 停用的 + 根因）、新接口用法、体检脚本新桶说明。
- 新闻墙截图一张。
