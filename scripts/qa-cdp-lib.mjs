/**
 * QA 用的独立无头浏览器。
 *
 * 为什么不用本机 9222 的 Chrome：那是用户自己的浏览器，抢焦点会打断他工作，
 * 而且后台标签页里 IntersectionObserver 不回调，卡片懒挂载不会触发，量出来的东西是假的。
 *
 * 这里起一个一次性的 headless 实例（独立 profile、独立端口），测完就关。
 */
import process from "node:process"
import { spawn } from "node:child_process"
import { mkdtemp, rm } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"

const DEFAULT_BIN = "/Users/mahaoxuan/Library/Caches/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-mac-arm64/chrome-headless-shell"

const sleep = ms => new Promise(r => setTimeout(r, ms))

/** 起浏览器 + 打开目标页，返回 { evaluate, send, close } */
export async function launchHeadless({ bin = process.env.QA_CHROME || DEFAULT_BIN, url, width = 1440, height = 1250, port = 0 } = {}) {
  const profile = await mkdtemp(join(tmpdir(), "qa-headless-"))
  const cdpPort = port || (9300 + Math.floor(Math.random() * 500))
  const child = spawn(bin, [
    `--remote-debugging-port=${cdpPort}`,
    `--user-data-dir=${profile}`,
    `--window-size=${width},${height}`,
    "--hide-scrollbars",
    "--disable-gpu",
    "--no-first-run",
    "--no-default-browser-check",
    "about:blank",
  ], { stdio: "ignore", detached: false })
  child.unref()

  const base = `http://127.0.0.1:${cdpPort}`
  let version = null
  for (let i = 0; i < 60; i++) {
    try {
      version = await (await fetch(`${base}/json/version`)).json()
      break
    } catch {
      await sleep(250)
    }
  }
  if (!version) {
    child.kill("SIGKILL")
    throw new Error(`无头浏览器没起来（${bin}，端口 ${cdpPort}）`)
  }

  const target = await (await fetch(`${base}/json/new?${encodeURIComponent(url)}`, { method: "PUT" })).json()
  const ws = new WebSocket(target.webSocketDebuggerUrl)
  let id = 0
  const pending = new Map()
  const send = (method, params = {}) => new Promise((res, rej) => {
    const i = ++id
    pending.set(i, { res, rej })
    ws.send(JSON.stringify({ id: i, method, params }))
  })
  ws.onmessage = (e) => {
    const m = JSON.parse(e.data)
    if (m.id && pending.has(m.id)) {
      const p = pending.get(m.id)
      pending.delete(m.id)
      m.error ? p.rej(new Error(JSON.stringify(m.error))) : p.res(m.result)
    }
  }
  await new Promise(r => ws.addEventListener("open", r))
  await send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: false })

  const evaluate = async (expression) => {
    const r = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true })
    if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text)
    return r.result.value
  }

  /** 等页面渲染出条目 */
  const waitFor = async (expression, timeoutMs = 45000) => {
    const started = Date.now()
    while (Date.now() - started < timeoutMs) {
      try {
        if (await evaluate(expression)) return true
      } catch { /* 导航途中 */ }
      await sleep(1000)
    }
    return false
  }

  const close = async () => {
    try {
      ws.close()
    } catch {}
    try {
      child.kill("SIGKILL")
    } catch {}
    await sleep(200)
    try {
      await rm(profile, { recursive: true, force: true })
    } catch {}
  }

  return { send, evaluate, waitFor, close, cdp: base }
}
