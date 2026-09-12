import { getSearchParams } from "./utils"

interface Item {
  id: number
  title?: string
  brief: string
  shareurl: string
  // need *1000
  ctime: number
  // 1
  is_ad: number
}
interface TelegraphRes {
  data: {
    roll_data: Item[]
  }
}

interface Depthes {
  data: {
    top_article: Item[]
    depth_list: Item[]
  }
}

interface Hot {
  data: Item[]
}

const depth = defineSource(async () => {
  const apiUrl = `https://www.cls.cn/v3/depth/home/assembled/1000`
  const res: Depthes = await myFetch(apiUrl, {
    query: Object.fromEntries(await getSearchParams()),
  })
  return res.data.depth_list.sort((m, n) => n.ctime - m.ctime).map((k) => {
    return {
      id: k.id,
      title: k.title || k.brief,
      mobileUrl: k.shareurl,
      pubDate: k.ctime * 1000,
      url: `https://www.cls.cn/detail/${k.id}`,
    }
  })
})

const hot = defineSource(async () => {
  const apiUrl = `https://www.cls.cn/v2/article/hot/list`
  const res: Hot = await myFetch(apiUrl, {
    query: Object.fromEntries(await getSearchParams()),
  })
  return res.data.map((k) => {
    return {
      id: k.id,
      title: k.title || k.brief,
      mobileUrl: k.shareurl,
      url: `https://www.cls.cn/detail/${k.id}`,
    }
  })
})

const telegraph = defineSource(async () => {
  const apiUrl = "https://www.cls.cn/v1/roll/get_roll_list"
  const res: TelegraphRes = await myFetch(apiUrl, {
    query: Object.fromEntries(await getSearchParams()),
  })
  const rollData = res?.data?.roll_data
  if (!Array.isArray(rollData) || rollData.length === 0) {
    throw new Error("财联社电报接口没有返回数据")
  }

  const items = rollData.filter(k => !k.is_ad && (k.title || k.brief)).map((k) => {
    return {
      id: k.id,
      title: k.title || k.brief,
      mobileUrl: k.shareurl,
      pubDate: k.ctime * 1000,
      url: `https://www.cls.cn/detail/${k.id}`,
    }
  })
  if (items.length === 0) throw new Error("财联社电报接口没有可用条目")
  return items
})

export default defineSource({
  "cls": telegraph,
  "cls-telegraph": telegraph,
  "cls-depth": depth,
  "cls-hot": hot,
})
