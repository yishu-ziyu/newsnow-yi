import { getDisabledSources } from "#/utils/source-health"

export default defineEventHandler(() => ({
  updatedAt: Date.now(),
  disabled: getDisabledSources(),
}))
