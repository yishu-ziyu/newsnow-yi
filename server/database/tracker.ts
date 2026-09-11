import type { Database } from "db0"
import type { BriefingRecord, TrackerRecord } from "@shared/tracker"

const DEFAULT_INTERVAL_MS = 24 * 60 * 60 * 1000

export class TrackerTable {
  private db
  constructor(db: Database) {
    this.db = db
  }

  async init() {
    await this.db.prepare(`
      CREATE TABLE IF NOT EXISTS trackers (
        id TEXT PRIMARY KEY,
        user_id TEXT,
        topic TEXT,
        days INTEGER,
        interval_ms INTEGER,
        enabled INTEGER,
        created INTEGER,
        updated INTEGER,
        last_run INTEGER,
        next_run INTEGER
      );
    `).run()
    await this.db.prepare(`
      CREATE TABLE IF NOT EXISTS briefings (
        id TEXT PRIMARY KEY,
        tracker_id TEXT,
        user_id TEXT,
        topic TEXT,
        summary TEXT,
        model TEXT,
        mock INTEGER,
        source_count INTEGER,
        steps TEXT,
        created INTEGER
      );
    `).run()
    logger.success(`init trackers + briefings tables`)
  }

  async createTracker(input: { userId: string, topic: string, days?: number, intervalMs?: number, now?: number }): Promise<TrackerRecord> {
    const now = input.now ?? Date.now()
    const intervalMs = input.intervalMs ?? DEFAULT_INTERVAL_MS
    const record: TrackerRecord = {
      id: crypto.randomUUID(),
      userId: input.userId,
      topic: input.topic,
      days: input.days ?? 1,
      intervalMs,
      enabled: true,
      created: now,
      updated: now,
      lastRun: 0,
      // Due right away: the first run fills the briefing list with something.
      nextRun: now,
    }

    await this.db.prepare(
      `INSERT INTO trackers (id, user_id, topic, days, interval_ms, enabled, created, updated, last_run, next_run) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    ).run(record.id, record.userId, record.topic, record.days, record.intervalMs, 1, record.created, record.updated, 0, record.nextRun)

    logger.success(`create tracker ${record.topic} for ${input.userId}`)
    return record
  }

  async listTrackers(userId: string): Promise<TrackerRecord[]> {
    const rows = (await this.db.prepare(
      `SELECT * FROM trackers WHERE user_id = ? ORDER BY created DESC`,
    ).all(userId)) as any[] | { results?: any[] }

    return toRows(rows).map(rowToTracker)
  }

  async deleteTracker(id: string, userId: string): Promise<boolean> {
    const state = await this.db.prepare(`DELETE FROM trackers WHERE id = ? AND user_id = ?`).run(id, userId)
    if (!state.success) throw new Error(`delete tracker ${id} failed`)
    logger.success(`delete tracker ${id}`)
    return true
  }

  /** Trackers that are enabled and whose next_run has passed. */
  async dueTrackers(now = Date.now()): Promise<TrackerRecord[]> {
    const rows = (await this.db.prepare(
      `SELECT * FROM trackers WHERE enabled = 1 AND next_run <= ? ORDER BY next_run ASC`,
    ).all(now)) as any[] | { results?: any[] }

    return toRows(rows).map(rowToTracker)
  }

  async markRun(id: string, now = Date.now()) {
    const tracker = await this.getTracker(id)
    if (!tracker) return
    await this.db.prepare(`UPDATE trackers SET last_run = ?, next_run = ?, updated = ? WHERE id = ?`)
      .run(now, now + tracker.intervalMs, now, id)
  }

  async getTracker(id: string): Promise<TrackerRecord | undefined> {
    const row = (await this.db.prepare(`SELECT * FROM trackers WHERE id = ?`).get(id)) as any
    return row ? rowToTracker(row) : undefined
  }

  async addBriefing(input: { tracker: TrackerRecord, summary: string, model: string, mock: boolean, sourceCount: number, steps?: unknown, now?: number }): Promise<BriefingRecord> {
    const now = input.now ?? Date.now()
    const record: BriefingRecord = {
      id: crypto.randomUUID(),
      trackerId: input.tracker.id,
      userId: input.tracker.userId,
      topic: input.tracker.topic,
      summary: input.summary,
      model: input.model,
      mock: input.mock,
      sourceCount: input.sourceCount,
      steps: Array.isArray(input.steps) ? input.steps as BriefingRecord["steps"] : [],
      created: now,
    }

    await this.db.prepare(
      `INSERT INTO briefings (id, tracker_id, user_id, topic, summary, model, mock, source_count, steps, created) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    ).run(record.id, record.trackerId, record.userId, record.topic, record.summary, record.model, record.mock ? 1 : 0, record.sourceCount, JSON.stringify(record.steps), record.created)

    logger.success(`add briefing for tracker ${record.trackerId}`)
    return record
  }

  async listBriefings(userId: string, limit = 20): Promise<BriefingRecord[]> {
    const rows = (await this.db.prepare(
      `SELECT * FROM briefings WHERE user_id = ? ORDER BY created DESC LIMIT ?`,
    ).all(userId, limit)) as any[] | { results?: any[] }

    return toRows(rows).map(rowToBriefing)
  }
}

function toRows(rows: any): any[] {
  if (Array.isArray(rows)) return rows
  return rows?.results ?? []
}

function rowToTracker(row: any): TrackerRecord {
  return {
    id: row.id,
    userId: row.user_id,
    topic: row.topic,
    days: Number(row.days ?? 1),
    intervalMs: Number(row.interval_ms ?? DEFAULT_INTERVAL_MS),
    enabled: Boolean(row.enabled),
    created: Number(row.created ?? 0),
    updated: Number(row.updated ?? 0),
    lastRun: Number(row.last_run ?? 0),
    nextRun: Number(row.next_run ?? 0),
  }
}

function rowToBriefing(row: any): BriefingRecord {
  return {
    id: row.id,
    trackerId: row.tracker_id,
    userId: row.user_id,
    topic: row.topic,
    summary: row.summary,
    model: row.model,
    mock: Boolean(row.mock),
    sourceCount: Number(row.source_count ?? 0),
    steps: parseSteps(row.steps),
    created: Number(row.created ?? 0),
  }
}

function parseSteps(value: unknown): BriefingRecord["steps"] {
  if (typeof value !== "string" || !value) return []
  try {
    const parsed = JSON.parse(value)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

/** First run time for a freshly created tracker. */
export function nextRunFrom(now: number, intervalMs = DEFAULT_INTERVAL_MS) {
  return now + intervalMs
}
