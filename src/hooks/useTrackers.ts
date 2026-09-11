import type { AgentStep } from "@shared/agent"
import type { BriefingRecord, TrackerRecord } from "@shared/tracker"
import { safeParseString } from "~/utils"

function authHeader(): Record<string, string> {
  const jwt = safeParseString(localStorage.getItem("jwt"))
  return jwt ? { Authorization: `Bearer ${jwt}` } : {}
}

export interface TrackersState {
  persisted: boolean
  trackers: TrackerRecord[]
  briefings: BriefingRecordWithSteps[]
}

export interface BriefingRecordWithSteps extends Omit<BriefingRecord, "steps"> {
  steps?: AgentStep[]
}

/**
 * Trackers and briefings only exist for a logged-in user. Without a login we
 * return `persisted: false` so the panel can show the "log in first" state.
 */
export async function loadTrackers(): Promise<TrackersState> {
  if (!safeParseString(localStorage.getItem("jwt"))) {
    return { persisted: false, trackers: [], briefings: [] }
  }

  try {
    const [trackers, briefings] = await Promise.all([
      myFetch("/agent/trackers", { headers: authHeader() }) as Promise<{ trackers: TrackerRecord[], persisted: boolean }>,
      myFetch("/agent/briefings", { headers: authHeader() }) as Promise<{ briefings: BriefingRecordWithSteps[], persisted: boolean }>,
    ])
    return {
      persisted: trackers?.persisted === true,
      trackers: trackers?.trackers ?? [],
      briefings: briefings?.briefings ?? [],
    }
  } catch {
    return { persisted: false, trackers: [], briefings: [] }
  }
}

export async function createTracker(topic: string, days = 1): Promise<boolean> {
  if (!safeParseString(localStorage.getItem("jwt"))) return false
  try {
    const res = await myFetch("/agent/trackers", {
      method: "POST",
      headers: authHeader(),
      body: { topic, days },
    }) as { persisted?: boolean }
    return res?.persisted === true
  } catch {
    return false
  }
}

export async function removeTracker(id: string): Promise<boolean> {
  if (!safeParseString(localStorage.getItem("jwt"))) return false
  try {
    const res = await myFetch(`/agent/trackers?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: authHeader(),
    }) as { deleted?: boolean }
    return res?.deleted === true
  } catch {
    return false
  }
}
