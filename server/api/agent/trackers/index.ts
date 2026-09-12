import process from "node:process"
import { clampInterval } from "@shared/tracker"
import { TrackerTable } from "#/database/tracker"

/**
 * Tracker management for the panel. Without a login we answer `persisted:false`
 * (dev default) so the UI keeps working.
 */
export default defineEventHandler(async (event) => {
  const user = event.context.user as { id?: string } | undefined
  const db = await getDatabase()

  if (!user?.id || !db) return { trackers: [], persisted: false }

  const table = new TrackerTable(db)
  if (process.env.INIT_TABLE !== "false") await table.init()

  if (event.method === "GET") {
    return { trackers: await table.listTrackers(user.id), persisted: true }
  }

  if (event.method === "DELETE") {
    const id = String(getQuery(event).id ?? "")
    if (!id) throw createError({ statusCode: 400, message: "id is required" })
    await table.deleteTracker(id, user.id)
    return { deleted: true, persisted: true }
  }

  const body = await readBody(event)
  const topic = String(body?.topic ?? "").trim()
  if (!topic) throw createError({ statusCode: 400, message: "topic is required" })

  const tracker = await table.createTracker({
    userId: user.id,
    topic,
    days: Number(body?.days) || 1,
    intervalMs: clampInterval(Number(body?.intervalMs)),
  })

  return { tracker, persisted: true }
})
