import process from "node:process"
import type { SourceID } from "@shared/types"
import { resolveDisabledSources } from "@shared/source-health"
import { createError } from "h3"

export function getDisabledSources() {
  return resolveDisabledSources(process.env)
}

export function assertSourceEnabled(id: SourceID | string) {
  const disabled = getDisabledSources()[id]
  if (disabled) {
    throw createError({
      statusCode: 503,
      message: `源已停用：${disabled.reason}`,
    })
  }
}
