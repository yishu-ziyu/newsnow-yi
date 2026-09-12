import type { SourceID } from "./types"

export type DisabledKind = "upstream-dead" | "js-challenge" | "missing-credential"

export interface DisabledInfo {
  kind: DisabledKind
  reason: string
  since?: string
  requires?: string
}

export const disabledSources: Partial<Record<SourceID, DisabledInfo>> = {
  "kaopu": {
    kind: "upstream-dead",
    reason: "上游数据地址已失效，站点暂无可用数据接口",
    since: "2026-09-12",
  },
  "pcbeta-windows11": {
    kind: "js-challenge",
    reason: "上游启用了 JavaScript 挑战，当前无法稳定获取内容",
    since: "2026-09-12",
  },
}

export const credentialSources: Partial<Record<SourceID, { env: string, reason: string }>> = {
  producthunt: {
    env: "PRODUCTHUNT_API_TOKEN",
    reason: "缺少 Product Hunt API 凭证",
  },
}

export function resolveDisabledSources(env: Record<string, string | undefined>): Record<string, DisabledInfo> {
  const resolved: Record<string, DisabledInfo> = { ...disabledSources }

  for (const [id, credential] of Object.entries(credentialSources)) {
    if (credential && !env[credential.env]?.trim()) {
      resolved[id] = {
        kind: "missing-credential",
        reason: credential.reason,
        requires: credential.env,
      }
    }
  }

  return resolved
}
