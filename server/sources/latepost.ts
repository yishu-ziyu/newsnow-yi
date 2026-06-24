import * as cheerio from "cheerio"
import type { NewsItem } from "@shared/types"

export default defineSource(async () => {
  const url = "https://www.latepost.com/"
  const html = await myFetch<string>(url)
  const $ = cheerio.load(html)
  const items: NewsItem[] = []

  // Main headline
  $(".headlines-title a").each((_, el) => {
    const href = $(el).attr("href") || ""
    const title = $(el).text().trim()
    if (title && href) {
      const u = href.startsWith("http") ? href : `https://www.latepost.com${href}`
      items.push({ id: u, title, url: u })
    }
  })

  // Newsletter articles
  $(".Newsletter-li-title").each((_, el) => {
    const a = $(el).closest("a")
    const href = a.attr("href") || ""
    const title = $(el).text().trim()
    if (title && href) {
      const u = href.startsWith("http") ? href : `https://www.latepost.com${href}`
      items.push({ id: u, title, url: u })
    }
  })

  // Q&A articles
  $(".Q-A-title").each((_, el) => {
    const a = $(el).closest("a")
    const href = a.attr("href") || ""
    const title = $(el).text().trim()
    if (title && href) {
      const u = href.startsWith("http") ? href : `https://www.latepost.com${href}`
      items.push({ id: u, title, url: u })
    }
  })

  // Old newsletter titles
  $(".oldNewsletter-title").each((_, el) => {
    const href = $(el).attr("href") || ""
    const title = $(el).text().trim()
    if (title && href) {
      const u = href.startsWith("http") ? href : `https://www.latepost.com${href}`
      items.push({ id: u, title, url: u })
    }
  })

  // Deduplicate by URL
  const seen = new Set<string>()
  const unique = items.filter((item) => {
    if (seen.has(item.url)) return false
    seen.add(item.url)
    return true
  })

  return unique.slice(0, 30)
})
