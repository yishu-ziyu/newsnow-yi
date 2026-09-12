import process from "node:process"
import { type BriefingRequest, type BriefingResponse, getLLMProviders } from "@shared/agent"
import { runBriefing } from "#/utils/agent-runner"
import type { CacheInfo } from "#/types"

export default defineEventHandler<{ body: BriefingRequest, response: BriefingResponse }>(async (event) => {
  const body = await readBody(event)
  const days = body.days || 1
  const topic = body.topic

  if (process.env.ENABLE_CACHE === "false") {
    throw createError({
      statusCode: 503,
      message: "缓存未启用，无法生成简报",
    })
  }

  const db = await getDatabase()

  // Fetch recent cache rows
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000
  const rows = (await db.prepare(
    "SELECT id, data, updated FROM cache WHERE updated >= ?",
  ).all(cutoff)) as any

  const results = rows.results ?? rows ?? []
  const cacheItems: CacheInfo[] = results
    .map((row: any) => {
      try {
        return {
          id: row.id,
          updated: row.updated,
          items: JSON.parse(row.data),
        }
      } catch {
        return null
      }
    })
    .filter(Boolean) as CacheInfo[]

  const totalItems = cacheItems.reduce((sum, c) => sum + c.items.length, 0)

  if (totalItems === 0) {
    return {
      summary: topic
        ? `过去 ${days} 天内没有找到关于"${topic}"的新闻缓存。`
        : `过去 ${days} 天内没有新闻缓存数据。`,
      model: "mock",
      mock: true,
      sourceCount: 0,
      degradedReason: "缓存里没有条目",
    }
  }

  const firstTitles = cacheItems
    .flatMap(c => c.items)
    .map(item => item.title)
    .filter(Boolean)
    .slice(0, 30)
    .join("\n")

  if (getLLMProviders().length === 0) {
    return {
      summary: `[mock] 发现 ${totalItems} 条新闻，来自 ${cacheItems.length} 个来源。${topic ? `主题：${topic}。` : ""}前几条标题：\n${firstTitles.slice(0, 500)}\n\n配置模型后可生成简报。`,
      model: "mock",
      mock: true,
      sourceCount: cacheItems.length,
      degradedReason: "没有配置任何 LLM provider",
    }
  }

  const run = await runBriefing({
    days,
    topic,
    seeds: cacheItems.map(c => ({ id: String(c.id), titles: c.items.map(i => i.title).filter(Boolean) })),
  })

  if (run.ok) {
    return {
      summary: run.summary,
      model: run.model,
      provider: run.provider,
      mock: false,
      sourceCount: run.sourceCount,
      steps: run.steps,
    }
  }

  return {
    summary: `[fallback] ${totalItems} 条新闻，${cacheItems.length} 个来源。简报生成失败。前几条：\n${firstTitles.slice(0, 500)}`,
    model: "mock",
    mock: true,
    sourceCount: cacheItems.length,
    degradedReason: run.reason,
  }
})
