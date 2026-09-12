import * as cheerio from "cheerio"
import type { NewsItem } from "@shared/types"

export default defineSource(async () => {
  const url = "https://www.qbitai.com/feed"
  // 上游 Content-Type 是 application/rss+xml，ofetch 会按 JSON 解析成 {}，
  // 必须显式要求 text，否则 cheerio 拿到空对象、静默返回 0 条
  const rss = await myFetch<string>(url, {
    headers: { Accept: "application/rss+xml, application/xml" },
    responseType: "text",
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
