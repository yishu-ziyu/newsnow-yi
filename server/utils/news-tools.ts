import { tool } from "ai"
import { z } from "zod"
import type { NewsItem, SourceID } from "@shared/types"
import { sources } from "@shared/sources"
import { searchNewsItems } from "@shared/news-search"
import { clampInterval } from "@shared/tracker"
import { getters } from "#/getters"
import { getCacheTable } from "#/database/cache"
import { TrackerTable } from "#/database/tracker"
import { assertSourceEnabled, getDisabledSources } from "#/utils/source-health"

/** Cap on sources touched by one search so a single question stays cheap. */
const MAX_SOURCES_PER_SEARCH = 8

export interface SourceBrief {
  id: string
  name: string
  column: string
  type?: string
}

const COLUMNS = ["china", "world", "tech", "finance", "ai", "english"] as const

/** All real sources (alias rows with `redirect` point at another id). */
export function listSourceBriefs(column?: string): SourceBrief[] {
  const disabled = getDisabledSources()
  return Object.entries(sources as Record<string, any>)
    .filter(([id, value]) => value && !value.redirect && !disabled[id])
    .filter(([, value]) => !column || value.column === column)
    .map(([id, value]) => ({ id, name: value.name, column: value.column, type: value.type }))
}

export type ItemFetcher = (id: string) => Promise<NewsItem[]>

/** Follow `redirect` aliases, so either id works. */
export function resolveSourceId(id: string): string {
  const entry = (sources as Record<string, any>)[id]
  return entry?.redirect ?? id
}

/**
 * Same data path as `/api/s`, but in-process: serve a fresh cache row, else hit
 * the source getter and write the cache back. No HTTP hop, so it works in dev
 * (a relative $fetch there resolves to `/api/api/...`) and on every preset.
 */
export const fetchSourceItems: ItemFetcher = async (id: string) => {
  const sourceId = resolveSourceId(id) as SourceID
  const getter = getters[sourceId]
  if (!getter) throw new Error(`未知源：${id}`)
  assertSourceEnabled(sourceId)

  const cacheTable = await getCacheTable()
  const cache = cacheTable ? await cacheTable.get(sourceId) : undefined
  const interval = (sources as Record<string, any>)[sourceId]?.interval ?? 0
  if (cache && Date.now() - Number(cache.updated) < interval) return cache.items

  try {
    const items = (await getter()).slice(0, 30)
    if (cacheTable && items.length) await cacheTable.set(sourceId, items)
    return items
  } catch (e) {
    if (cache) return cache.items
    throw e
  }
}

function toLine(item: NewsItem, sourceName: string) {
  const when = item.pubDate ? ` · ${new Date(item.pubDate).toISOString().slice(0, 16).replace("T", " ")}` : ""
  const hover = item.extra?.hover ? `\n   ${String(item.extra.hover).slice(0, 160)}` : ""
  return `- [${sourceName}] ${item.title}${when}\n   ${item.url}${hover}`
}

/** Pick a spread of sources to search when the caller does not name any. */
function defaultSearchScope(column?: string): SourceBrief[] {
  const briefs = listSourceBriefs(column).filter(b => b.type !== undefined)
  if (column) return briefs.slice(0, MAX_SOURCES_PER_SEARCH)

  const byColumn = new Map<string, SourceBrief[]>()
  for (const brief of briefs) {
    const list = byColumn.get(brief.column) ?? []
    list.push(brief)
    byColumn.set(brief.column, list)
  }

  const picked: SourceBrief[] = []
  const columns = [...byColumn.keys()]
  let round = 0
  while (picked.length < MAX_SOURCES_PER_SEARCH) {
    let added = false
    for (const col of columns) {
      const candidate = byColumn.get(col)?.[round]
      if (candidate && picked.length < MAX_SOURCES_PER_SEARCH) {
        picked.push(candidate)
        added = true
      }
    }
    if (!added) break
    round += 1
  }
  return picked
}

export interface SearchNewsOptions {
  column?: string
  ids?: string[]
  limit?: number
  fetchItems?: ItemFetcher
}

/**
 * Search across sources: fetch the scope (bounded), score titles and hover
 * text, return the top matches with their source label.
 */
export async function searchNews(query: string, options: SearchNewsOptions = {}) {
  const { column, ids, limit = 10, fetchItems = fetchSourceItems } = options
  const availableBriefs = listSourceBriefs()
  const availableIDs = new Set(availableBriefs.map(brief => brief.id))
  const scope = ids?.length
    ? ids
        .filter(id => availableIDs.has(resolveSourceId(id)))
        .slice(0, MAX_SOURCES_PER_SEARCH)
        .map(id => ({
          id,
          name: availableBriefs.find(b => b.id === resolveSourceId(id))?.name ?? id,
          column: "",
        }))
    : defaultSearchScope(column)

  const settled = await Promise.all(scope.map(async (brief) => {
    try {
      const items = await fetchItems(brief.id)
      return {
        brief,
        error: "",
        items: items.map(item => ({
          id: item.id,
          title: item.title,
          url: item.url,
          text: item.extra?.hover ? String(item.extra.hover) : "",
          source: brief.name,
        })),
      }
    } catch (e) {
      const reason = e instanceof Error ? e.message : String(e)
      console.error(`[news-tools] source ${brief.id} failed:`, reason)
      return { brief, error: reason.slice(0, 80), items: [] }
    }
  }))

  const flat = settled.flatMap(s => s.items)
  const failed = settled.filter(s => s.error)
  return {
    scanned: flat.length,
    scope: scope.map(s => s.name),
    failed: failed.map(s => `${s.brief.id}(${s.error})`),
    matches: searchNewsItems(flat, query, limit),
  }
}

export interface NewsToolOptions {
  /** When present, the agent may register trackers for this user. */
  userId?: string
  fetchItems?: ItemFetcher
}

export function createNewsTools(options: NewsToolOptions = {}) {
  const fetchItems = options.fetchItems ?? fetchSourceItems

  return {
    list_sources: tool({
      description: "列出可用的新闻源（id、名称、栏目）。搜索或取新闻前先用它确认有没有相关源。",
      inputSchema: z.object({
        column: z.enum(COLUMNS).optional().describe("只列某个栏目：china/world/tech/finance/ai/english"),
      }),
      execute: async ({ column }) => {
        const briefs = listSourceBriefs(column)
        return `${briefs.length} 个源：\n${briefs.map(b => `${b.id} (${b.column}) ${b.name}`).join("\n")}`
      },
    }),

    get_source_items: tool({
      description: "取某一个源当前的热榜或最新条目。知道源 id 时用它。",
      inputSchema: z.object({
        id: z.string().describe("源 id，例如 zhihu、tldr、github-trending-today"),
        count: z.number().int().min(1).max(30).default(10).describe("返回条数"),
      }),
      execute: async ({ id, count }) => {
        const name = listSourceBriefs().find(b => b.id === id)?.name ?? id
        try {
          const items = await fetchSourceItems(id)
          if (!items.length) return `源 ${id}（${name}）当前没有条目。`
          return `${name} 前 ${Math.min(count, items.length)} 条：\n${items.slice(0, count).map(i => toLine(i, name)).join("\n")}`
        } catch (e) {
          return `取源 ${id} 失败：${e instanceof Error ? e.message : String(e)}。可以换一个源，或稍后重试。`
        }
      },
    }),

    search_news: tool({
      description: "按关键词在当前抓到的新闻里搜索，返回最相关的条目（标题、链接、来源）。问“今天有什么关于 X 的新闻”时用它。",
      inputSchema: z.object({
        query: z.string().describe("关键词，支持中英文"),
        column: z.enum(COLUMNS).optional().describe("限定栏目，不给就在多个栏目里分散取源"),
        limit: z.number().int().min(1).max(20).default(10).describe("返回条数"),
      }),
      execute: async ({ query, column, limit }) => {
        const { scanned, scope, failed, matches } = await searchNews(query, { column, limit, fetchItems })
        const failNote = failed.length ? `\n取数失败的源：${failed.join("、")}` : ""
        if (!matches.length) {
          return `在 ${scope.join("、")} 这 ${scope.length} 个源（共 ${scanned} 条）里没搜到「${query}」。可以换关键词，或先 list_sources 换个源。${failNote}`
        }
        return `在 ${scope.join("、")} 这 ${scope.length} 个源（共 ${scanned} 条）里匹配 ${matches.length} 条：\n${
          matches.map(m => toLine({ id: m.item.id, title: m.item.title, url: m.item.url }, m.item.source ?? "")).join("\n")
        }${failNote}`
      },
    }),

    create_tracker: tool({
      description: "为用户建立长期追踪：之后按间隔自动生成该主题的简报。用户说「帮我盯 X」「以后每天给我 X 的简报」时调用它，而不是自己承诺定时。",
      inputSchema: z.object({
        topic: z.string().describe("要盯的主题，越具体越好"),
        days: z.number().int().min(1).max(7).default(1).describe("每次简报回看几天内的缓存"),
        intervalMs: z.number().int().optional().describe("间隔毫秒，默认一天；最小一分钟"),
      }),
      execute: async ({ topic, days, intervalMs }) => {
        if (!options.userId) {
          return "没有登录用户，无法建立追踪。请告知用户：登录后再说一次「帮我盯 X」即可。"
        }

        try {
          const db = useDatabase()
          const table = new TrackerTable(db)
          await table.init()
          const tracker = await table.createTracker({
            userId: options.userId,
            topic,
            days,
            intervalMs: clampInterval(intervalMs),
          })
          const hours = Math.round(tracker.intervalMs / 3600000)
          return `已建立追踪「${tracker.topic}」，每 ${hours >= 1 ? `${hours} 小时` : `${Math.round(tracker.intervalMs / 60000)} 分钟`}跑一次，回看 ${tracker.days} 天；首次运行排在下一次调度。追踪 id：${tracker.id}`
        } catch (e) {
          return `建立追踪失败：${e instanceof Error ? e.message : String(e)}`
        }
      },
    }),
  }
}

export const newsTools = createNewsTools()

export const newsToolNames = Object.keys(newsTools)
