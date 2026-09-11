import process from "node:process"
import { TrackerTable } from "#/database/tracker"

/** Briefing history for the logged-in user (newest first). */
export default defineEventHandler(async (event) => {
  const user = event.context.user as { id?: string } | undefined
  const db = useDatabase()

  if (!user?.id || !db) return { briefings: [], persisted: false }

  const table = new TrackerTable(db)
  if (process.env.INIT_TABLE !== "false") await table.init()

  const raw = Number(getQuery(event).limit ?? 20)
  const limit = Math.min(Math.max(Number.isFinite(raw) ? raw : 20, 1), 100)
  return { briefings: await table.listBriefings(user.id, limit), persisted: true }
})
