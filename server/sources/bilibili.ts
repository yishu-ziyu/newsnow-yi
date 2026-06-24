const hotSearch = defineSource(async () => {
  const url = "https://rsshub.app/bilibili/hotword"
  const data = await myFetch(url)
  const items = data.items || data
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("No Bilibili hot search data")
  }
  return items.map((item: any) => ({
    id: item.url?.split("=").pop() || item.guid || String(Math.random()),
    title: item.title,
    url: item.url || `https://search.bilibili.com/all?keyword=${encodeURIComponent(item.title)}`,
    extra: {
      info: item.author || "",
      hover: item.description?.substring?.(0, 200) || "",
    },
  }))
})

const hotVideo = defineSource(async () => {
  const url = "https://rsshub.app/bilibili/popular"
  const data = await myFetch(url)
  const items = data.items || data
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("No Bilibili popular data")
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
