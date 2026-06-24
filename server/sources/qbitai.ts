import * as cheerio from "cheerio"
import type { NewsItem } from "@shared/types"

export default defineSource(async () => {
  const url = "https://www.qbitai.com/feed"
  const rss = await myFetch<any>(url, {
    headers: { Accept: "application/rss+xml, application/xml" },
  })
  const $ = cheerio.load(rss, { xmlMode: true })
  const items: NewsItem[] = []
  $("item").each((_, el) => {
    const title = $("title", el).text().trim()
    const link = $("link", el).text().trim()
    const pubDate = $("pubDate", el).text().trim()
    if (title && link) {
      items.push({ id: link, title, url: link, pubDate })
    }
  })
  return items
})
