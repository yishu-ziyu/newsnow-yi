import * as cheerio from "cheerio"
import type { NewsItem } from "@shared/types"

const express = defineSource(async () => {
  const baseURL = "https://www.fastbull.com"
  const html: any = await myFetch(`${baseURL}/cn/express-news`)
  const $ = cheerio.load(html)
  const $main = $(".news-list")
  const news: NewsItem[] = []
  $main.each((_, el) => {
    const a = $(el).find(".title_name")
    const titleText = a.text().trim()
    const title = titleText.match(/【(.+)】/)?.[1] ?? titleText
    const date = $(el).attr("data-date")
    // express 流没有单条永久链接（页面上只有 mailto 分享），用 data-id 去重、指向列表页
    const id = $(el).attr("data-id") ?? `${date}-${title.slice(0, 24)}`
    if (title && date) {
      news.push({
        url: `${baseURL}/cn/express-news`,
        title: title.length < 4 ? titleText : title,
        id,
        pubDate: Number(date),
      })
    }
  })
  return news
})

const news = defineSource(async () => {
  const baseURL = "https://www.fastbull.com"
  const html: any = await myFetch(`${baseURL}/cn/news`)
  const $ = cheerio.load(html)
  const $main = $(".trending_type")
  const news: NewsItem[] = []
  $main.each((_, el) => {
    const a = $(el)
    const url = a.attr("href")
    const title = a.find(".title").text()
    const date = a.find("[data-date]").attr("data-date")
    if (url && title && date) {
      news.push({
        url: baseURL + url,
        title,
        id: url,
        pubDate: Number(date),
      })
    }
  })
  return news
})

export default defineSource(
  {
    "fastbull": express,
    "fastbull-express": express,
    "fastbull-news": news,
  },
)
