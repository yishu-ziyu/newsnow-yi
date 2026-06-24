import { describe, expect, it } from "vitest"

describe("verifyPrimitiveMetadata", () => {
  it("passes valid input", () => {
    const input = {
      data: { "source-a": ["item-1", "item-2"] },
      updatedTime: 1234567890,
    }
    expect(() => verifyPrimitiveMetadata(input)).not.toThrow()
  })

  it("returns parsed result on valid input", () => {
    const input = {
      data: { "source-a": ["item-1"] },
      updatedTime: 1000,
    }
    const result = verifyPrimitiveMetadata(input)
    expect(result.data).toEqual({ "source-a": ["item-1"] })
    expect(result.updatedTime).toBe(1000)
  })

  it("handles multiple sources", () => {
    const input = {
      data: { a: ["1"], b: ["2", "3"], c: [] },
      updatedTime: Date.now(),
    }
    expect(() => verifyPrimitiveMetadata(input)).not.toThrow()
  })

  it("throws on missing data field", () => {
    expect(() => verifyPrimitiveMetadata({ updatedTime: 1000 })).toThrow()
  })

  it("throws on wrong type for data", () => {
    expect(() => verifyPrimitiveMetadata({ data: "not-a-record", updatedTime: 1000 })).toThrow()
  })

  it("throws on wrong type for updatedTime", () => {
    expect(() => verifyPrimitiveMetadata({ data: {}, updatedTime: "string" })).toThrow()
  })

  it("throws on completely invalid input", () => {
    expect(() => verifyPrimitiveMetadata("nope")).toThrow()
    expect(() => verifyPrimitiveMetadata(null)).toThrow()
    expect(() => verifyPrimitiveMetadata(42)).toThrow()
  })
})
