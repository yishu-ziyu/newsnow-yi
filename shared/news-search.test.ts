import { describe, expect, it } from "vitest"
import { scoreText, searchNewsItems, tokenizeQuery } from "@shared/news-search"

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
