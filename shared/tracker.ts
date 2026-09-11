import type { AgentStep } from "./agent"

export interface TrackerRecord {
  id: string
  userId: string
  topic: string
  /** How many days of cache a run looks at. */
  days: number
  intervalMs: number
  enabled: boolean
  created: number
  updated: number
  lastRun: number
  nextRun: number
}

export interface BriefingRecord {
  id: string
  trackerId: string
  userId: string
  topic: string
  summary: string
  model: string
  mock: boolean
  sourceCount: number
  steps: AgentStep[]
  created: number
}

export const TRACKER_DEFAULT_INTERVAL_MS = 24 * 60 * 60 * 1000
export const TRACKER_MIN_INTERVAL_MS = 60 * 1000

/** Clamp a requested interval so a tracker cannot spin. */
export function clampInterval(intervalMs?: number): number {
  if (!intervalMs || Number.isNaN(intervalMs)) return TRACKER_DEFAULT_INTERVAL_MS
  return Math.max(TRACKER_MIN_INTERVAL_MS, Math.floor(intervalMs))
}
