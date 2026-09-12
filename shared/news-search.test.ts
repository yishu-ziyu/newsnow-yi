import { describe, expect, it } from "vitest"
import { newsSearchQuery, relatedNewsItems, resolveNewsSearchQuery, scoreText, searchNewsItems, titleOverlap, tokenizeQuery } from "@shared/news-search"

describe("tokenizeQuery", () => {
  it("keeps latin words whole and lowercases them", () => {
    expect(tokenizeQuery("iPhone 16")).toEqual(expect.arrayContaining(["iphone", "16"]))
  })

  it("splits CJK runs into bigrams", () => {
    const terms = tokenizeQuery("相关新闻")
    expect(terms).toEqual(expect.arrayContaining(["相关", "关新", "新闻"]))
  })

  it("keeps single CJK characters", () => {
    expect(tokenizeQuery("米")).toContain("米")
  })

  it("mixes latin and CJK in one query", () => {
    const terms = tokenizeQuery("iPhone 相关新闻")
    expect(terms).toEqual(expect.arrayContaining(["iphone", "相关", "新闻"]))
  })

  it("returns nothing for punctuation-only queries", () => {
    expect(tokenizeQuery("  !!  ")).toEqual([])
  })
})

describe("scoreText", () => {
  it("counts every occurrence", () => {
    expect(scoreText("iphone iphone", ["iphone"], 1)).toBe(2)
  })

  it("is case insensitive", () => {
    expect(scoreText("iPhone", ["iphone"])).toBe(1)
  })

  it("is zero without terms or text", () => {
    expect(scoreText("iPhone", [])).toBe(0)
    expect(scoreText("", ["iphone"])).toBe(0)
  })
})

describe("searchNewsItems", () => {
  const items = [
    { id: 1, title: "iPhone Duo 正式发布", url: "https://a/1", text: "售价 15999 元起" },
    { id: 2, title: "红果短剧日活破亿", url: "https://a/2", text: "短剧超过四大平台" },
    { id: 3, title: "苹果新品与可穿戴", url: "https://a/3", text: "iPhone 相关供应链消息" },
  ]

  it("ranks title matches above body matches", () => {
    const result = searchNewsItems(items, "iPhone")
    expect(result.map(r => r.item.id)).toEqual([1, 3])
  })

  it("matches Chinese queries through bigrams", () => {
    const result = searchNewsItems(items, "短剧")
    expect(result.map(r => r.item.id)).toEqual([2])
  })

  it("returns an empty list when nothing matches", () => {
    expect(searchNewsItems(items, "量子计算")).toEqual([])
  })

  it("returns an empty list for an empty query", () => {
    expect(searchNewsItems(items, "   ")).toEqual([])
  })

  it("drops duplicates by title and url", () => {
    const dup = [...items, { id: 4, title: "iPhone Duo 正式发布", url: "https://a/1" }]
    expect(searchNewsItems(dup, "iPhone").map(r => r.item.id)).toEqual([1, 3])
  })

  it("respects the limit", () => {
    expect(searchNewsItems(items, "iPhone", 1)).toHaveLength(1)
  })
})

describe("titleOverlap", () => {
  it("is 1 for identical titles", () => {
    expect(titleOverlap("陶哲轩联名抗议", "陶哲轩联名抗议")).toBe(1)
  })

  it("is high when one title is a shorter cut of the other", () => {
    expect(titleOverlap(
      "陶哲轩、邓煜等菲奖得主联合抗议 AI 公司数学",
      "陶哲轩等菲奖得主抗议 AI 公司",
    )).toBeGreaterThanOrEqual(0.5)
  })

  it("is low for unrelated hot-search titles", () => {
    expect(titleOverlap("苏超", "世界是一本巨大的教科书")).toBeLessThan(0.5)
  })
})

describe("relatedNewsItems", () => {
  const zhihu = { id: 1, title: "陶哲轩、邓煜等菲奖得主联合抗议 AI 公司数学", url: "https://zhihu/1", source: "zhihu" }
  const weibo = { id: 2, title: "陶哲轩等菲奖得主抗议 AI 公司", url: "https://weibo/2", source: "weibo" }
  const apple = { id: 3, title: "iPhone 18 Pro 预售", url: "https://toutiao/3", source: "toutiao" }
  const other = { id: 4, title: "苏超总决赛", url: "https://hupu/4", source: "hupu" }

  it("finds the same event on another source", () => {
    expect(relatedNewsItems(zhihu, [zhihu, weibo, apple, other]).map(i => i.id)).toEqual([2])
  })

  it("does not glue stories that only share a brand word", () => {
    const duo = { id: 5, title: "iPhone Duo 近百万人预约", url: "https://weibo/5", source: "weibo" }
    expect(relatedNewsItems(apple, [apple, duo])).toEqual([])
  })

  it("skips the seed itself and same-source rows", () => {
    const twin = { id: 6, title: "陶哲轩等菲奖得主抗议 AI 公司 后续", url: "https://zhihu/6", source: "zhihu" }
    expect(relatedNewsItems(zhihu, [zhihu, twin, weibo]).map(i => i.id)).toEqual([2])
  })

  it("respects the limit", () => {
    const w2 = { id: 7, title: "菲奖得主联合抗议 AI 公司", url: "https://coolapk/7", source: "coolapk" }
    expect(relatedNewsItems(zhihu, [weibo, w2], { limit: 1 })).toHaveLength(1)
  })
})

describe("newsSearchQuery", () => {
  it("pulls the topic out of a spoken ask", () => {
    expect(newsSearchQuery("今天有什么 iPhone 相关的新闻？")).toBe("iPhone")
  })

  it("leaves a recursive follow-up to the model", () => {
    expect(newsSearchQuery("是的，你可以做一些更详细的递归搜索。")).toBeNull()
  })

  it("does not search the filler sentence on 细节/后续/什么意思", () => {
    expect(newsSearchQuery("可以具体看一下细节吧和后续反应。")).toBeNull()
    expect(newsSearchQuery("这个被泄密是什么意思？")).toBeNull()
  })
})

describe("resolveNewsSearchQuery", () => {
  it("reuses the last topical user ask for a 细节 follow-up", () => {
    expect(resolveNewsSearchQuery("可以具体看一下细节吧和后续反应。", [
      { role: "user", content: "今天有什么 iPhone 相关的新闻？" },
      { role: "assistant", content: "折叠屏比例被泄密。" },
      { role: "user", content: "这个被泄密是什么意思？" },
      { role: "assistant", content: "就是尺寸提前流出去了。" },
    ])).toBe("iPhone")
  })

  it("keeps an explicit topic on the current message", () => {
    expect(resolveNewsSearchQuery("今天有什么 iPhone 相关的新闻？", [
      { role: "user", content: "今天有什么华为相关的新闻？" },
    ])).toBe("iPhone")
  })
})
