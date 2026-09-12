#!/usr/bin/env node
import process from "node:process"
import fs from "node:fs/promises"
import path from "node:path"
import { spawnSync } from "node:child_process"
import { fileURLToPath } from "node:url"
import dotenv from "dotenv"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const BASE = process.env.QA_BASE || "http://127.0.0.1:5173"
const FETCH_TIMEOUT_MS = Number(process.env.QA_TIMEOUT || 45000)
const repairedSourceIDs = ["freebuf", "36kr-renqi", "cls-telegraph", "reddit-ai-monitor"]
const stoppedSourceIDs = ["kaopu", "pcbeta-windows11"]
const allowedKinds = new Set(["upstream-dead", "js-challenge", "missing-credential"])

let passed = 0
let failed = 0

function evidence(ok, check, detail) {
  if (ok) passed += 1
  else failed += 1
  console.log(`${ok ? "PASS" : "FAIL"} ${check} — ${detail}`)
}

async function fetchJSON(urlPath) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)
  try {
    const response = await fetch(`${BASE}${urlPath}`, { signal: controller.signal })
    const body = await response.json().catch(() => null)
    return { response, body }
  } finally {
    clearTimeout(timer)
  }
}

function clearCache() {
  const databasePath = path.join(ROOT, ".data/db.sqlite3")
  const clearScript = [
    "const Database = require('better-sqlite3')",
    `const db = new Database(${JSON.stringify(databasePath)})`,
    "const table = db.prepare(\"SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'cache'\").get()",
    "const changes = table ? db.prepare('DELETE FROM cache').run().changes : 0",
    "db.close()",
    "console.log(changes)",
  ].join(";")
  const result = spawnSync(process.execPath, ["-e", clearScript], {
    cwd: ROOT,
    encoding: "utf8",
  })
  const changes = result.stdout.trim() || "0"
  evidence(result.status === 0, "清空 cache 表", result.status === 0 ? `${databasePath}，删除 ${changes} 行` : result.stderr.trim())
}

async function runWithConcurrency(values, concurrency, task) {
  let cursor = 0
  async function worker() {
    while (cursor < values.length) {
      const value = values[cursor++]
      await task(value)
    }
  }
  await Promise.all(Array.from({ length: concurrency }, worker))
}

clearCache()

let health
try {
  const { response, body } = await fetchJSON("/api/sources/health")
  health = body
  const disabled = body?.disabled
  const entries = disabled && typeof disabled === "object" ? Object.values(disabled) : []
  const validEntries = entries.every(info => info
    && typeof info === "object"
    && allowedKinds.has(info.kind)
    && typeof info.reason === "string"
    && info.reason.length > 0)

  let serverFileEnv = {}
  try {
    serverFileEnv = dotenv.parse(await fs.readFile(path.join(ROOT, ".env.server")))
  } catch {
    // .env.server is optional.
  }
  const hasProductHuntToken = Boolean(process.env.PRODUCTHUNT_API_TOKEN || serverFileEnv.PRODUCTHUNT_API_TOKEN)
  const requiredIDsPresent = stoppedSourceIDs.every(id => disabled?.[id])
  const credentialStateCorrect = hasProductHuntToken ? !disabled?.producthunt : disabled?.producthunt?.kind === "missing-credential"
  const shapeCorrect = response.ok
    && typeof body?.updatedAt === "number"
    && validEntries
    && requiredIDsPresent
    && credentialStateCorrect

  evidence(
    shapeCorrect,
    "Change 4 源健康接口",
    `HTTP ${response.status}，updatedAt=${typeof body?.updatedAt}，disabled=${Object.keys(disabled ?? {}).join(",") || "(空)"}，token=${hasProductHuntToken ? "已配置" : "未配置"}`,
  )
} catch (error) {
  evidence(false, "Change 4 源健康接口", error instanceof Error ? error.message : String(error))
}

await runWithConcurrency(repairedSourceIDs, 2, async (id) => {
  try {
    const { response, body } = await fetchJSON(`/api/s?id=${encodeURIComponent(id)}`)
    const itemCount = Array.isArray(body?.items) ? body.items.length : 0
    const ok = response.ok && body?.status === "success" && itemCount >= 10
    evidence(ok, `Change 2 ${id}`, `HTTP ${response.status}，status=${body?.status ?? "(无)"}，items=${itemCount}${body?.message ? `，message=${body.message}` : ""}`)
  } catch (error) {
    evidence(false, `Change 2 ${id}`, error instanceof Error ? error.message : String(error))
  }
})

await runWithConcurrency(stoppedSourceIDs, 2, async (id) => {
  try {
    const { response, body } = await fetchJSON(`/api/s?id=${encodeURIComponent(id)}`)
    const rejected = (response.status >= 400 && response.status < 500) || response.status === 503
    const readable = typeof body?.message === "string" && body.message.includes("停用")
    evidence(rejected && readable, `Change 3 ${id}`, `HTTP ${response.status}，message=${body?.message ?? "(无)"}`)
  } catch (error) {
    evidence(false, `Change 3 ${id}`, error instanceof Error ? error.message : String(error))
  }
})

try {
  const [atomSource, dndSource, searchSource, rootSource] = await Promise.all([
    fs.readFile(path.join(ROOT, "src/atoms/source-health.ts"), "utf8"),
    fs.readFile(path.join(ROOT, "src/components/column/dnd.tsx"), "utf8"),
    fs.readFile(path.join(ROOT, "src/components/common/search-bar/index.tsx"), "utf8"),
    fs.readFile(path.join(ROOT, "src/routes/__root.tsx"), "utf8"),
  ])
  const frontendSource = `${atomSource}\n${dndSource}\n${searchSource}\n${rootSource}`
  const usesHealth = atomSource.includes("/api/sources/health") && rootSource.includes("useSourceHealth()")
  const filtersWall = dndSource.includes("visibleItems")
    && dndSource.includes("!disabledSourceIDs.has(id)")
    && dndSource.includes("visibleItems.map")
  const filtersSearch = searchSource.includes("!disabledSourceIDs.has(id)")
  const hasNoHardcodedStoppedIDs = stoppedSourceIDs.every(id => !frontendSource.includes(id))
  evidence(
    usesHealth && filtersWall && filtersSearch && hasNoHardcodedStoppedIDs,
    "Change 1 前端过滤",
    `health=${usesHealth}，wall=${filtersWall}，search=${filtersSearch}，hardcoded=${!hasNoHardcodedStoppedIDs}`,
  )
} catch (error) {
  evidence(false, "Change 1 前端过滤", error instanceof Error ? error.message : String(error))
}

try {
  const disabledForAudit = stoppedSourceIDs.filter(id => health?.disabled?.[id])
  if (health?.disabled?.producthunt) disabledForAudit.push("producthunt")
  const audit = spawnSync(process.execPath, ["scripts/audit-sources.mjs"], {
    cwd: ROOT,
    encoding: "utf8",
    timeout: 15000,
    env: {
      ...process.env,
      AUDIT_BASE: BASE,
      AUDIT_IDS: disabledForAudit.join(","),
      AUDIT_CONCURRENCY: "2",
    },
  })
  const summary = audit.stdout.split("\n").find(line => line.startsWith("体检 ")) ?? "(无汇总)"
  const results = JSON.parse(await fs.readFile("/tmp/source-audit.json", "utf8"))
  const hasFourBuckets = /ok \d+ \/ empty \d+ \/ error \d+ \/ disabled \d+/.test(summary)
  const allDisabled = disabledForAudit.length > 0
    && disabledForAudit.every(id => results.some(result => result.id === id && result.kind === "disabled"))
  evidence(audit.status === 0 && hasFourBuckets && allDisabled, "Change 5 体检四桶", `${summary}；${results.map(result => `${result.id}:${result.kind}`).join(",") || audit.stderr.trim()}`)
} catch (error) {
  evidence(false, "Change 5 体检四桶", error instanceof Error ? error.message : String(error))
}

console.log(`PASS ${passed} / FAIL ${failed}`)
process.exitCode = failed
