import process from "node:process"
import { BRIEFING_LIST_LIMIT } from "@shared/tracker"
import { TrackerTable } from "#/database/tracker"

/** Briefing history for the logged-in user (newest first). */
export default defineEventHandler(async (event) => {
  const user = event.context.user as { id?: string } | undefined
  const db = await getDatabase()

  if (!user?.id || !db) return { briefings: [], persisted: false }

  const table = new TrackerTable(db)
  if (process.env.INIT_TABLE !== "false") await table.init()

  const raw = Number(getQuery(event).limit ?? BRIEFING_LIST_LIMIT)
  const limit = Math.min(Math.max(Number.isFinite(raw) ? raw : BRIEFING_LIST_LIMIT, 1), BRIEFING_LIST_LIMIT)
  return { briefings: await table.listBriefings(user.id, limit), persisted: true }
})
