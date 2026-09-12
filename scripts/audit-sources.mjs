#!/usr/bin/env node
import process from "node:process"

// 逐个源体检：打本地 /api/s，记录状态、条数、耗时、错误。
import fs from "node:fs/promises"

const BASE = process.env.AUDIT_BASE || "http://localhost:5173"
const CONCURRENCY = Number(process.env.AUDIT_CONCURRENCY || 6)
const TIMEOUT_MS = Number(process.env.AUDIT_TIMEOUT || 30000)

const sources = JSON.parse(await fs.readFile(new URL("../shared/sources.json", import.meta.url), "utf8"))
const ids = Object.entries(sources).filter(([, v]) => !v.redirect).map(([id]) => id)

const results = []
let cursor = 0

async function check(id) {
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

await Promise.all(Array.from({ length: CONCURRENCY }, worker))
process.stderr.write("\n")

const order = { error: 0, empty: 1, ok: 2 }
results.sort((a, b) => (order[a.kind] - order[b.kind]) || b.ms - a.ms)

const counts = results.reduce((acc, r) => ({ ...acc, [r.kind]: (acc[r.kind] ?? 0) + 1 }), {})
console.log(`体检 ${results.length} 个源：ok ${counts.ok ?? 0} / empty ${counts.empty ?? 0} / error ${counts.error ?? 0}`)
console.log("")
for (const r of results.filter(r => r.kind !== "ok")) {
  console.log(`${r.kind.toUpperCase().padEnd(5)} ${r.id.padEnd(24)} ${String(r.ms).padStart(6)}ms  ${r.detail ?? ""}`)
}
const slow = results.filter(r => r.kind === "ok" && r.ms > 8000)
console.log("")
console.log(`慢（>8s 但成功）：${slow.length}`)
slow.forEach(r => console.log(`  ${r.id.padEnd(24)} ${r.ms}ms  ${r.items} 条`))

await fs.writeFile("/tmp/source-audit.json", JSON.stringify(results, null, 2))
console.log("\n明细写到 /tmp/source-audit.json")
