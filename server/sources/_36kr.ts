import type { NewsItem } from "@shared/types"
import { load } from "cheerio"

const quick = defineSource(async () => {
  const baseURL = "https://www.36kr.com"
  const url = `${baseURL}/newsflashes`
  const response = await myFetch(url) as any
  const $ = load(response)
  const news: NewsItem[] = []
  const $items = $(".newsflash-item")
  $items.each((_, el) => {
    const $el = $(el)
    const $a = $el.find("a.item-title")
    const url = $a.attr("href")
    const title = $a.text()
    const relativeDate = $el.find(".time").text()
    if (url && title && relativeDate) {
      news.push({
        url: `${baseURL}${url}`,
        title,
        id: url,
        extra: {
          date: parseRelativeDate(relativeDate, "Asia/Shanghai").valueOf(),
        },
      })
    }
  })

  return news
})

interface HotRankItem {
  itemId: string | number
  publishTime?: number
  templateMaterial?: {
    widgetTitle?: string
    publishTime?: number
    authorName?: string
    statRead?: number | string
    statFormat?: string
  }
}

interface HotRankResponse {
  data?: {
    hotRankList?: HotRankItem[]
  }
}

const renqi = defineSource(async () => {
  const baseURL = "https://36kr.com"
  const response = await myFetch<HotRankResponse>("https://gateway.36kr.com/api/mis/nav/home/nav/rank/hot", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
      "Referer": `${baseURL}/`,
    },
    body: {
      partner_id: "wap",
      param: {
        siteId: 1,
        platformId: 2,
      },
      timestamp: Date.now(),
    },
  })

  const ranking = response?.data?.hotRankList
  if (!Array.isArray(ranking) || ranking.length === 0) {
    throw new Error("36氪人气榜接口没有返回数据")
  }

  const items: NewsItem[] = ranking
    .filter(item => item.itemId && item.templateMaterial?.widgetTitle)
    .map((item) => {
      const material = item.templateMaterial!
      return {
        id: String(item.itemId),
        title: material.widgetTitle!,
        url: `${baseURL}/p/${item.itemId}`,
        pubDate: material.publishTime ?? item.publishTime,
        extra: {
          info: [material.authorName, material.statFormat || (material.statRead !== undefined ? `${material.statRead} 阅读` : "")]
            .filter(Boolean)
            .join(" · "),
        },
      }
    })

  if (items.length === 0) throw new Error("36氪人气榜数据缺少必要字段")
  return items
})

export default defineSource({
  "36kr": quick,
  "36kr-quick": quick,
  "36kr-renqi": renqi,
})
