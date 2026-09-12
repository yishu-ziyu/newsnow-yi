// RSSHub 公共实例对 B 站接口全部 403/503，改用官方接口
const hotSearch = defineSource(async () => {
  const data = await myFetch<any>("https://s.search.bilibili.com/main/hotword", {
    headers: { Referer: "https://www.bilibili.com/" },
  })
  const list = data?.list
  if (!Array.isArray(list) || list.length === 0) throw new Error("B 站热词接口没有返回数据")
  return list.map((item: any) => ({
    id: String(item.hot_id ?? item.keyword),
    title: item.show_name || item.keyword,
    url: `https://search.bilibili.com/all?keyword=${encodeURIComponent(item.keyword ?? "")}`,
    extra: {
      info: "热搜",
      hover: item.keyword ?? "",
    },
  }))
})

const hotVideo = defineSource(async () => {
  const data = await myFetch<any>("https://api.bilibili.com/x/web-interface/popular?ps=50&pn=1", {
    headers: { Referer: "https://www.bilibili.com/" },
  })
  const list = data?.data?.list
  if (!Array.isArray(list) || list.length === 0) throw new Error("B 站热门接口没有返回数据")
  return list.map((item: any) => ({
    id: String(item.bvid ?? item.aid),
    title: item.title,
    url: item.bvid ? `https://www.bilibili.com/video/${item.bvid}` : "https://www.bilibili.com",
    pubDate: item.pubdate ? item.pubdate * 1000 : undefined,
    extra: {
      info: item.tname ?? "",
      hover: typeof item.desc === "string" ? item.desc.slice(0, 200) : "",
    },
  }))
})

const ranking = defineSource(async () => {
  const url = "https://rsshub.app/bilibili/ranking/0"
  const data = await myFetch(url)
  const items = data.items || data
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("No Bilibili ranking data")
  }
  return items.map((item: any) => ({
    id: item.url?.split("/").pop() || item.guid || String(Math.random()),
    title: item.title,
    url: item.url || "https://www.bilibili.com",
    pubDate: item.pubDate ? new Date(item.pubDate).getTime() : undefined,
    extra: {
      info: item.author || "",
      hover: item.description?.substring?.(0, 200) || "",
    },
  }))
})

export default defineSource({
  "bilibili": hotSearch,
  "bilibili-hot-search": hotSearch,
  "bilibili-hot-video": hotVideo,
  "bilibili-ranking": ranking,
})
