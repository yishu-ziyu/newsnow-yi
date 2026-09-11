/**
 * Keyword scoring for news items. No index, no deps: the whole corpus is
 * a few thousand short titles, so substring scoring over CJK bigrams and
 * latin words is enough and stays edge-safe.
 */

const CJK_RUN = /[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]+/g
const LATIN_WORD = /[a-z0-9][a-z0-9+.#-]*/g

export interface SearchableNewsItem {
  id: string | number
  title: string
  url: string
  text?: string
  source?: string
}

export interface ScoredNewsItem<T> {
  item: T
  score: number
}

/**
 * Split a query into searchable terms: latin words stay whole, CJK runs
 * become bigrams ("iPhone 相关新闻" -> ["iphone", "相关", "关新", "新闻"]).
 */
export function tokenizeQuery(query: string): string[] {
  const terms = new Set<string>()
  const lower = query.toLowerCase()

  for (const word of lower.match(LATIN_WORD) ?? []) {
    if (word.length >= 2) terms.add(word)
  }

  for (const run of lower.match(CJK_RUN) ?? []) {
    if (run.length === 1) {
      terms.add(run)
      continue
    }
    for (let i = 0; i < run.length - 1; i++) terms.add(run.slice(i, i + 2))
  }

  return [...terms]
}

/** Count term hits in a piece of text, weighted by caller. */
export function scoreText(text: string, terms: string[], weight = 1): number {
  if (!text || terms.length === 0) return 0
  const haystack = text.toLowerCase()
  let score = 0
  for (const term of terms) {
    let index = haystack.indexOf(term)
    while (index !== -1) {
      score += weight
      index = haystack.indexOf(term, index + term.length)
    }
  }
  return score
}

/** Rank items by title (weight 3) and body text (weight 1). */
export function searchNewsItems<T extends SearchableNewsItem>(
  items: T[],
  query: string,
  limit = 10,
): ScoredNewsItem<T>[] {
  const terms = tokenizeQuery(query)
  if (terms.length === 0) return []

  const seen = new Set<string>()
  const scored: ScoredNewsItem<T>[] = []

  for (const item of items) {
    const key = `${item.title}|${item.url}`
    if (seen.has(key)) continue
    seen.add(key)

    const score = scoreText(item.title, terms, 3) + scoreText(item.text ?? "", terms, 1)
    if (score > 0) scored.push({ item, score })
  }

  return scored.sort((a, b) => b.score - a.score).slice(0, limit)
}
