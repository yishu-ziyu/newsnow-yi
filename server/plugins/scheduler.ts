import process from "node:process"
import { runDueTrackers } from "#/utils/tracker-runner"

/**
 * In-process scheduler for self-hosted runs. Off by default: set
 * ENABLE_TRACKER_SCHEDULER=true (optionally TRACKER_TICK_MS) to let the server
 * run due trackers itself. On Cloudflare/Vercel use the cron endpoint instead.
 */
export default defineNitroPlugin(() => {
  if (process.env.ENABLE_TRACKER_SCHEDULER !== "true") return

  const tickMs = Math.max(Number(process.env.TRACKER_TICK_MS ?? 60_000), 10_000)
  logger.success(`[scheduler] tracker scheduler on, tick ${tickMs}ms`)

  const timer = setInterval(async () => {
    try {
      const results = await runDueTrackers()
      if (results.length) logger.success(`[scheduler] ran ${results.length} tracker(s)`)
    } catch (e) {
      logger.error(`[scheduler] ${e instanceof Error ? e.message : String(e)}`)
    }
  }, tickMs)

  timer.unref?.()
})
