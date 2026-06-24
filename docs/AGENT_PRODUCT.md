# NewsNow Agent — 产品方案

> 从"看新闻"到"用 Agent 工作"的升级路径。

## 产品定位

公开可部署的智能资讯平台。用户看新闻，Agent 帮你盯、筛、分析、生成决策。

## 三层架构

```
Layer 1: 看新闻（现有）    → 60 源多栏 Dashboard，纯阅读
Layer 2: 聊新闻            → 每条新闻旁对话，新闻自动注入上下文
Layer 3: Agent 替你工作    → 追踪简报 + 对比分析
```

三层用同一个 Agent backend，共享模型配置和工具集。

## Layer 2：聊新闻

- 每条新闻卡片旁加"↗ 问 Agent"按钮
- 打开侧边栏对话面板，新闻内容自动注入为系统上下文
- 用户可问："总结" / "翻译" / "和上周那条什么关系" / "立场偏向哪边"
- 对话历史存在 D1（user.data 字段，已有基础设施）

## Layer 3：Agent 替你工作

### 3a. 追踪简报（v0 优先）

- 用户说"帮我盯 XX"，Agent 每天定时执行
- 从 60 个源筛相关新闻 → 生成结构化简报
- 简报格式：过去 24 小时，N 条相关，M 条重要
- 存储在 D1，用户可查看历史简报

### 3b. 对比分析（v1）

- 用户选中多条新闻 → "对比分析"
- Agent 输出立场矩阵：不同来源对同一事件的报道差异
- 适用场景：重大事件的多方报道对比

## 技术方案

| 组件 | 方案 |
|------|------|
| 部署 | Cloudflare Pages + D1（不动） |
| Agent API | Cloudflare Functions (`/api/agent/*`) |
| 模型 | 多 provider fallback chain（见下方） |
| 对话历史 | D1 user.data（已有） |
| 追踪任务 | 新增 `trackers` 表 |
| 简报存储 | 新增 `briefings` 表 |

### LLM Provider Fallback Chain

按顺序尝试，任一成功即返回：

1. **Primary**（`NEWSNOW_LLM_API_KEY`）— 用户配置的 API，支持 OpenAI-compatible 和 Anthropic-compatible 两种协议
2. **Agnes**（免费，默认内置）— 公测期 $0，`agnes-2.0-flash`，无需额外配置

可选 fallback（通过环境变量启用）：
- **MiniMax** — `NEWSNOW_LLM_FALLBACK_MINIMAX`，Anthropic-compatible，`MiniMax-M2.7`
- **DeepSeek** — `NEWSNOW_LLM_FALLBACK_DEEPSEEK`，OpenAI-compatible，`deepseek-v4-pro`

所有 provider 都失败时，返回 mock 响应（带降级标记）。

**环境变量速查**：

| 变量 | 用途 | 必需 |
|------|------|------|
| `NEWSNOW_LLM_API_KEY` | Primary provider API key | 否（无则跳过） |
| `NEWSNOW_LLM_API_URL` | Primary base URL | 否（默认 OpenAI） |
| `NEWSNOW_LLM_MODEL` | Primary model name | 否 |
| `NEWSNOW_LLM_FALLBACK_MINIMAX` | MiniMax API key | 否 |
| `NEWSNOW_LLM_FALLBACK_DEEPSEEK` | DeepSeek API key | 否 |
| `NEWSNOW_LLM_FALLBACK_AGNES` | Agnes API key（默认用内置免费 key） | 否 |

响应字段新增 `provider`，标识实际使用的 provider 名称。

## 实施顺序

1. Agent backend（Cloudflare Function + 模型调用）
2. Layer 2 对话 UI
3. Layer 3a 追踪简报
4. Layer 3b 对比分析
