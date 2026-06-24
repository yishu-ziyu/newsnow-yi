import { describe, expect, it } from "vitest"

describe("encodeBase64", () => {
  it("encodes plain ascii text", () => {
    expect(encodeBase64("hello")).toBe("aGVsbG8=")
  })

  it("round-trips through decodeBase64", () => {
    const input = "Hello, World!"
    expect(decodeBase64(encodeBase64(input))).toBe(input)
  })

  it("handles empty string", () => {
    expect(encodeBase64("")).toBe("")
    expect(decodeBase64("")).toBe("")
  })

  it("handles unicode / chinese characters", () => {
    const input = "你好世界"
    expect(decodeBase64(encodeBase64(input))).toBe(input)
  })
})

describe("encodeBase64URL", () => {
  it("round-trips through decodeBase64URL", () => {
    const input = "hello world?foo=bar&baz=qux"
    expect(decodeBase64URL(encodeBase64URL(input))).toBe(input)
  })

  it("handles chinese characters in URL-safe encoding", () => {
    const input = "奕枢的新闻"
    expect(decodeBase64URL(encodeBase64URL(input))).toBe(input)
  })

  it("empty string round-trips", () => {
    expect(decodeBase64URL(encodeBase64URL(""))).toBe("")
  })
})
