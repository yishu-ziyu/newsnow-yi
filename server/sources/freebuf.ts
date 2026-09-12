import type { NewsItem } from "@shared/types"

interface FreeBufArticle {
  ID: string | number
  post_title: string
  post_date?: string
  content?: string
  url?: string
  read_count?: number | string
  nickname?: string
  category?: string
  like?: number | string
  favorite?: number | string
  comment_count?: number | string
}

interface FreeBufResponse {
  data?: {
    list?: FreeBufArticle[]
  }
}

export default defineSource(async () => {
  const baseURL = "https://www.freebuf.com"
  const response = await myFetch<FreeBufResponse>(`${baseURL}/fapi/frontend/home/article`, {
    query: {
      page: 1,
      limit: 20,
      type: 1,
    },
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
      "Referer": `${baseURL}/`,
    },
  })

  const articles = response?.data?.list
  if (!Array.isArray(articles) || articles.length === 0) {
    throw new Error("FreeBuf 接口没有返回文章")
  }

  const items: NewsItem[] = articles
    .filter(article => article.ID && article.post_title && article.url)
    .map(article => ({
      id: String(article.ID),
      title: article.post_title,
      url: new URL(article.url!, baseURL).toString(),
      pubDate: article.post_date,
      extra: {
        info: [article.nickname, article.category, article.read_count !== undefined ? `${article.read_count} 阅读` : ""]
          .filter(Boolean)
          .join(" · "),
        hover: article.content ?? "",
      },
    }))

  if (items.length === 0) throw new Error("FreeBuf 接口返回的文章缺少必要字段")
  return items
})
