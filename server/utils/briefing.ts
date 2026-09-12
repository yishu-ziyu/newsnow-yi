import type { BriefingSeed } from "#/utils/agent-runner"
import type { CacheInfo } from "#/types"

export interface CachedBriefingMaterial {
  seeds: BriefingSeed[]
  sourceCount: number
  totalItems: number
  firstTitles: string
}

/**
 * Read the news cache table and turn it into briefing seeds. Shared by the
 * on-demand briefing endpoint and the tracker runs so both see the same shape.
 */
export async function collectCachedSeeds(days: number): Promise<CachedBriefingMaterial> {
  const db = await getDatabase()
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

  const seeds: BriefingSeed[] = cacheItems.map(c => ({
    id: String(c.id),
    titles: c.items.map(i => i.title).filter(Boolean),
  }))
  const totalItems = seeds.reduce((sum, seed) => sum + seed.titles.length, 0)
  const firstTitles = seeds
    .flatMap(seed => seed.titles)
    .slice(0, 30)
    .join("\n")

  return {
    seeds,
    sourceCount: seeds.length,
    totalItems,
    firstTitles,
  }
}
