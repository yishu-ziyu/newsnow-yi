import { describe, expect, it } from "vitest"
import { parseInline, parseMarkdownLite } from "@shared/markdown"

describe("parseMarkdownLite", () => {
  it("parses headings, lists and paragraphs", () => {
    const blocks = parseMarkdownLite("# 标题\n\n一段话。\n\n- 一\n- 二\n\n结尾")
    expect(blocks.map(b => b.type)).toEqual(["heading", "paragraph", "list", "paragraph"])
    expect(blocks[2]).toMatchObject({ items: ["一", "二"] })
  })

  it("parses a table with a separator row", () => {
    const blocks = parseMarkdownLite("| 维度 | 来源 | 说法 |\n|---|---|---|\n| 定价 | 酷安 | 15999 元 |\n| 定价 | Stratechery | 不谈价格 |")
    expect(blocks).toHaveLength(1)
    expect(blocks[0]).toMatchObject({
      type: "table",
      header: ["维度", "来源", "说法"],
      rows: [["定价", "酷安", "15999 元"], ["定价", "Stratechery", "不谈价格"]],
    })
  })

  it("does not treat a pipe inside prose as a table", () => {
    const blocks = parseMarkdownLite("A | B 只是普通句子")
    expect(blocks.map(b => b.type)).toEqual(["paragraph"])
  })

  it("keeps fenced code blocks intact", () => {
    const blocks = parseMarkdownLite("说明：\n```json\n{\"a\":1}\n```\n完")
    expect(blocks.map(b => b.type)).toEqual(["paragraph", "code", "paragraph"])
    expect(blocks[1]).toMatchObject({ text: "{\"a\":1}" })
  })

  it("handles numbered lists", () => {
    const blocks = parseMarkdownLite("1. 甲\n2. 乙")
    expect(blocks[0]).toMatchObject({ type: "list", items: ["甲", "乙"] })
  })

  it("returns nothing for blank input", () => {
    expect(parseMarkdownLite("\n\n  \n")).toEqual([])
  })
})

describe("parseInline", () => {
  it("splits bold and code", () => {
    expect(parseInline("看 **这条** 和 `code`")).toEqual([
      { text: "看 " },
      { text: "这条", bold: true },
      { text: " 和 " },
      { text: "code", code: true },
    ])
  })

  it("leaves plain text alone", () => {
    expect(parseInline("没有标记")).toEqual([{ text: "没有标记" }])
  })
})
