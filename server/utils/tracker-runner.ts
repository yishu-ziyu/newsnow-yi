import type { BriefingRecord, TrackerRecord } from "@shared/tracker"
import { runBriefing } from "#/utils/agent-runner"
import { collectCachedSeeds } from "#/utils/briefing"
import { TrackerTable } from "#/database/tracker"

export interface TrackerRunResult {
  trackerId: string
  topic: string
  ok: boolean
  briefingId?: string
  summary?: string
  reason?: string
}

/**
 * Run every tracker whose next_run has passed: gather material from the cache,
 * generate a briefing through the tool loop, store it, and push next_run out.
 */
export async function runDueTrackers(options: { now?: number, limit?: number } = {}): Promise<TrackerRunResult[]> {
  const now = options.now ?? Date.now()
  const db = await getDatabase()
  const table = new TrackerTable(db)
  await table.init()

  const due = (await table.dueTrackers(now)).slice(0, options.limit ?? 5)
  const results: TrackerRunResult[] = []

  for (const tracker of due) {
    results.push(await runTracker(tracker, table, now))
  }

  return results
}

async function runTracker(tracker: TrackerRecord, table: TrackerTable, now: number): Promise<TrackerRunResult> {
  try {
    const material = await collectCachedSeeds(tracker.days)
    const run = await runBriefing({
      days: tracker.days,
      topic: tracker.topic,
      seeds: material.seeds,
    })

    let briefing: BriefingRecord
    if (run.ok) {
      briefing = await table.addBriefing({
        tracker,
        summary: run.summary,
        model: run.model,
        mock: false,
        sourceCount: run.sourceCount,
        steps: run.steps,
        now,
      })
    } else {
      briefing = await table.addBriefing({
        tracker,
        summary: `追踪「${tracker.topic}」本次未生成简报：${run.reason}`,
        model: "mock",
        mock: true,
        sourceCount: material.sourceCount,
        now,
      })
    }

    await table.markRun(tracker.id, now)
    return { trackerId: tracker.id, topic: tracker.topic, ok: run.ok, briefingId: briefing.id, summary: briefing.summary }
  } catch (e) {
    const reason = e instanceof Error ? e.message : String(e)
    logger.error(`tracker ${tracker.id} failed: ${reason}`)
    // Still move the clock so one broken tracker cannot block the queue.
    await table.markRun(tracker.id, now)
    return { trackerId: tracker.id, topic: tracker.topic, ok: false, reason }
  }
}
