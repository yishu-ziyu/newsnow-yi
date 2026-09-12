#!/usr/bin/env node
import process from "node:process"
import fs from "node:fs/promises"

// 逐个源体检：打本地 /api/s，记录状态、条数、耗时、错误或停用原因。
const BASE = process.env.AUDIT_BASE || "http://localhost:5173"
const CONCURRENCY = Number(process.env.AUDIT_CONCURRENCY || 2)
const TIMEOUT_MS = Number(process.env.AUDIT_TIMEOUT || 30000)

const sources = JSON.parse(await fs.readFile(new URL("../shared/sources.json", import.meta.url), "utf8"))
const requestedIDs = process.env.AUDIT_IDS?.split(",").map(id => id.trim()).filter(Boolean)
const requestedIDSet = requestedIDs?.length ? new Set(requestedIDs) : undefined
const ids = Object.entries(sources)
  .filter(([, value]) => !value.redirect)
  .map(([id]) => id)
  .filter(id => !requestedIDSet || requestedIDSet.has(id))

async function fetchHealth() {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    const response = await fetch(`${BASE}/api/sources/health`, { signal: controller.signal })
    const body = await response.json().catch(() => null)
    if (!response.ok || !body?.disabled || typeof body.disabled !== "object") {
      throw new Error(body?.message || `源健康接口返回 ${response.status}`)
    }
    return body.disabled
  } finally {
    clearTimeout(timer)
  }
}

const disabledSources = await fetchHealth()
const results = []
let cursor = 0

async function check(id) {
  const disabled = disabledSources[id]
  if (disabled) {
    return {
      id,
      kind: "disabled",
      ms: 0,
      detail: `${disabled.kind}: ${disabled.reason}`.slice(0, 120),
    }
  }

  const started = Date.now()
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    const res = await fetch(`${BASE}/api/s?id=${encodeURIComponent(id)}`, { signal: controller.signal })
    const ms = Date.now() - started
    const body = await res.json().catch(() => null)
    if (!res.ok) {
      return { id, kind: "error", ms, detail: (body?.message || res.statusText || "").slice(0, 120) }
    }
    const items = body?.items?.length ?? 0
    return { id, kind: items > 0 ? "ok" : "empty", ms, items, status: body?.status }
  } catch (e) {
    return { id, kind: "error", ms: Date.now() - started, detail: (e.name === "AbortError" ? `timeout >${TIMEOUT_MS}ms` : e.message).slice(0, 120) }
  } finally {
    clearTimeout(timer)
  }
}

async function worker() {
  while (cursor < ids.length) {
    const id = ids[cursor++]
    results.push(await check(id))
    process.stderr.write(".")
  }
}

await Promise.all(Array.from({ length: Math.max(1, CONCURRENCY) }, worker))
process.stderr.write("\n")

const order = { disabled: 0, error: 1, empty: 2, ok: 3 }
results.sort((a, b) => (order[a.kind] - order[b.kind]) || b.ms - a.ms)

const counts = results.reduce((acc, result) => ({ ...acc, [result.kind]: (acc[result.kind] ?? 0) + 1 }), {})
console.log(`体检 ${results.length} 个源：ok ${counts.ok ?? 0} / empty ${counts.empty ?? 0} / error ${counts.error ?? 0} / disabled ${counts.disabled ?? 0}`)
console.log("")
for (const result of results.filter(result => result.kind !== "ok")) {
  console.log(`${result.kind.toUpperCase().padEnd(8)} ${result.id.padEnd(24)} ${String(result.ms).padStart(6)}ms  ${result.detail ?? ""}`)
}
const slow = results.filter(result => result.kind === "ok" && result.ms > 8000)
console.log("")
console.log(`慢（>8s 但成功）：${slow.length}`)
slow.forEach(result => console.log(`  ${result.id.padEnd(24)} ${result.ms}ms  ${result.items} 条`))

await fs.writeFile("/tmp/source-audit.json", JSON.stringify(results, null, 2))
console.log("\n明细写到 /tmp/source-audit.json")
