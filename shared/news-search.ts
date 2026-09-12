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

/**
 * Overlap coefficient of two titles' search terms.
 * 1 means the shorter title's terms are all in the longer one.
 */
export function titleOverlap(a: string, b: string): number {
  const left = new Set(tokenizeQuery(a))
  const right = new Set(tokenizeQuery(b))
  if (left.size === 0 || right.size === 0) return 0
  let shared = 0
  for (const term of left) {
    if (right.has(term)) shared++
  }
  return shared / Math.min(left.size, right.size)
}

function sharedTermCount(a: string, b: string): number {
  const left = new Set(tokenizeQuery(a))
  const right = new Set(tokenizeQuery(b))
  let shared = 0
  for (const term of left) {
    if (right.has(term)) shared++
  }
  return shared
}

/**
 * Same-event peers for a wall row. Threshold is overlap of tokenized titles,
 * not a search rank — "iPhone" alone should not glue unrelated Apple stories.
 *
 * ponytail: client-side over the already-loaded wall, no server cluster job.
 * Upgrade to embeddings if false-merges show up in the wild.
 */
export function relatedNewsItems<T extends SearchableNewsItem>(
  seed: SearchableNewsItem,
  items: T[],
  opts?: { minOverlap?: number, limit?: number },
): T[] {
  const minOverlap = opts?.minOverlap ?? 0.5
  const limit = opts?.limit ?? 5
  const seedKey = `${seed.title}|${seed.url}`
  const scored: ScoredNewsItem<T>[] = []

  for (const item of items) {
    if (`${item.title}|${item.url}` === seedKey) continue
    if (item.source && seed.source && item.source === seed.source) continue

    const shared = sharedTermCount(seed.title, item.title)
    if (shared === 0) continue
    const overlap = titleOverlap(seed.title, item.title)
    const short = Math.min(tokenizeQuery(seed.title).length, tokenizeQuery(item.title).length)
    // Short hot-search titles need almost-all terms in common; longer ones need 2+ shared bigrams.
    const enough = short <= 2 ? overlap === 1 : overlap >= minOverlap && shared >= 2
    if (!enough) continue
    scored.push({ item, score: overlap })
  }

  return scored.sort((a, b) => b.score - a.score).slice(0, limit).map(row => row.item)
}

/**
 * Pull a topical keyword out of a spoken question.
 * "今天有什么 iPhone 相关的新闻？" → "iPhone"
 * "更详细的递归搜索" / "看一下细节和后续" → null (resolve from history)
 */
export function newsSearchQuery(message: string): string | null {
  let q = message.trim().replace(/[？?！!]+$/g, "")
  q = q.replace(/^(今天|最近|现在)?(有什么|有哪些)?/u, "")
  q = q.replace(/(相关的新闻|相关新闻|的新闻|新闻)$/u, "")
  q = q.replace(/帮我|搜一下|搜搜|请/g, " ").replace(/\s+/g, " ").trim()
  if (q.length < 2) return null
  // ponytail: CJK topics glued to 后续/细节 ("折叠屏后续") are dropped; force the model. Extract leftover if those show up in the wild.
  if (/递归|更详细|继续|换个角度|换关键词|细节|后续|具体看|什么意思|啥意思/.test(q) && !/[A-Z0-9]/i.test(q)) return null
  return q
}

/** Current ask, or the newest earlier user turn that still has a topic. */
export function resolveNewsSearchQuery(
  message: string,
  history?: Array<{ role: string, content: string }>,
): string | null {
  const own = newsSearchQuery(message)
  if (own) return own
  if (!history?.length) return null
  for (let i = history.length - 1; i >= 0; i--) {
    const turn = history[i]
    if (turn.role !== "user") continue
    const query = newsSearchQuery(turn.content)
    if (query) return query
  }
  return null
}
