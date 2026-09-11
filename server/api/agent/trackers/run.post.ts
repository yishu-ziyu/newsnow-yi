import process from "node:process"
import { runDueTrackers } from "#/utils/tracker-runner"

/**
 * Cron entry point: run every due tracker once.
 * Point an external scheduler at this (Cloudflare Cron Trigger / Vercel Cron /
 * plain crontab) with `x-cron-secret: $CRON_SECRET`.
 */
export default defineEventHandler(async (event) => {
  const secret = process.env.CRON_SECRET
  const provided = getHeader(event, "x-cron-secret") || String(getQuery(event).secret ?? "")

  if (!secret || provided !== secret) {
    throw createError({ statusCode: 401, message: "invalid cron secret" })
  }

  const results = await runDueTrackers()
  return { ran: results.length, results }
})
