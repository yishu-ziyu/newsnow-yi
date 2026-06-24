import { describe, expect, it } from "vitest"

describe("md5", () => {
  it("returns 32-char hex string", async () => {
    const result = await md5("hello")
    expect(result).toHaveLength(32)
    expect(result).toMatch(/^[0-9a-f]{32}$/)
  })

  it("is deterministic — same input same output", async () => {
    const a = await md5("newsnow")
    const b = await md5("newsnow")
    expect(a).toBe(b)
  })

  it("handles empty string", async () => {
    const result = await md5("")
    expect(result).toHaveLength(32)
  })

  it("handles chinese characters", async () => {
    const result = await md5("奕枢")
    expect(result).toHaveLength(32)
    expect(result).toMatch(/^[0-9a-f]{32}$/)
  })
})

describe("myCrypto", () => {
  it("returns sha-256 hex by default", async () => {
    const result = await myCrypto("test", "SHA-256")
    expect(result).toHaveLength(64)
    expect(result).toMatch(/^[0-9a-f]{64}$/)
  })

  it("sha-1 returns 40-char hex", async () => {
    const result = await myCrypto("test", "SHA-1")
    expect(result).toHaveLength(40)
  })
})
