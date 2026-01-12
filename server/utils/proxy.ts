
import type { SourceGetter } from "#/types"

interface RSSItem {
  title: string
  pubDate: string
  link: string
  guid: string
  author: string
  thumbnail: string
  description: string
  content: string
  enclosure: object
  categories: string[]
}

interface RSSResponse {
  status: string
  feed: {
    url: string
    title: string
    link: string
    author: string
    description: string
    image: string
  }
  items: RSSItem[]
}

export function defineForeignSource(url: string): SourceGetter {
  return async () => {
    // Uses api.rss2json.com as a gateway to fetch foreign RSS feeds, bypassing local network restrictions.
    // This allows the app to work in China without a system-level VPN for the node process.
    const gateway = "https://api.rss2json.com/v1/api.json?rss_url="
    const target = gateway + encodeURIComponent(url)
    
    // api.rss2json.com returns JSON directly
    const res = await myFetch(target) as RSSResponse

    if (res.status !== 'ok') {
        throw new Error(`Failed to fetch foreign source via proxy: ${url}`)
    }

    return res.items.map(item => ({
      id: item.link || item.guid,
      title: item.title,
      url: item.link,
      pubDate: item.pubDate, // RSS2JSON returns "2024-01-01 12:00:00" format usually
      extra: {
        info: item.author || item.pubDate,
        hover: item.description,
      }
    }))
  }
}
