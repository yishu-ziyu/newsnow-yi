import { type BriefingRequest, type BriefingResponse, callLLM, getLLMProviders } from "@shared/agent"
import type { CacheInfo } from "#/types"

export default defineEventHandler<{ body: BriefingRequest, response: BriefingResponse }>(async (event) => {
  const body = await readBody(event)
  const days = body.days || 1
  const topic = body.topic

  // eslint-disable-next-line node/prefer-global/process
  if (process.env.ENABLE_CACHE === "false") {
    throw createError({
      statusCode: 503,
      message: "缓存未启用，无法生成简报",
    })
  }

  const db = useDatabase()

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
    }
  }

  const providers = getLLMProviders()

  if (providers.length === 0) {
    const titles = cacheItems
      .flatMap(c => c.items)
      .map(item => item.title)
      .filter(Boolean)
      .slice(0, 30)
      .join("\n")

    return {
      summary: `[mock] 发现 ${totalItems} 条新闻，来自 ${cacheItems.length} 个来源。${topic ? `主题：${topic}。` : ""}前几条标题：\n${titles.slice(0, 500)}\n\n设置 NEWSNOW_LLM_API_KEY 环境变量可启用 AI 简报。`,
      model: "mock",
      mock: true,
      sourceCount: cacheItems.length,
    }
  }

  const sourcesText = cacheItems
    .map(c => `## ${c.id}\n${c.items.map(i => `- ${i.title}`).join("\n")}`)
    .join("\n\n")

  const topicHint = topic ? `聚焦主题：${topic}。` : ""
  const systemPrompt = `你是一个新闻简报助手。${topicHint}请基于提供的新闻标题列表，生成一份简洁的中文简报。格式：按主题分组，每组 2-3 条，每条一句话摘要。控制在 300 字以内。`
  const userText = `以下是过去 ${days} 天的新闻标题列表：\n\n${sourcesText.slice(0, 8000)}`
  const userContent = [{ type: "text", text: userText }]

  for (const provider of providers) {
    try {
      const summary = await callLLM(provider, systemPrompt, userContent)
      console.log(`[agent/briefing] provider=${provider.name} model=${provider.model} ok`)
      return {
        summary,
        model: provider.model,
        mock: false,
        sourceCount: cacheItems.length,
      }
    } catch (e) {
      console.error(`[agent/briefing] provider=${provider.name} failed:`, e)
      continue
    }
  }

  // All providers failed
  const titles = cacheItems
    .flatMap(c => c.items)
    .map(item => item.title)
    .filter(Boolean)
    .slice(0, 30)
    .join("\n")

  return {
    summary: `[fallback] ${totalItems} 条新闻，${cacheItems.length} 个来源。LLM 调用失败。前几条：\n${titles.slice(0, 500)}`,
    model: providers[0]?.model || "unknown",
    mock: true,
    sourceCount: cacheItems.length,
  }
})
