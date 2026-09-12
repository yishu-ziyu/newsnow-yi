#!/usr/bin/env node
/**
 * UI 评审 01 A/B 档的验收 gate（数字，不是"通过/不通过"）。
 *
 * 用一个一次性的无头浏览器（scripts/qa-cdp-lib.mjs）打开本机 dev server，
 * 分别量列表 / 网格两种视图，不碰用户自己的 Chrome。
 *
 * 用法：node scripts/qa-ui-pass1.mjs
 * 输出：每项一行 PASS/FAIL + 实测数值，最后一行 `PASS n / FAIL n`，退出码 = FAIL 数。
 */
import process from "node:process"
import { launchHeadless } from "./qa-cdp-lib.mjs"

const APP = process.env.APP_URL || "http://127.0.0.1:5173"

const results = []
const record = (item, ok, detail) => results.push({ item, ok, detail })

/** 页面内通用工具：背景合成、WCAG 对比度、几何 */
const PAGE_HELPERS = `
  const parseColor = (c) => {
    const m = c.match(/[\\d.]+/g)
    if (!m) return { r: 0, g: 0, b: 0, a: 0 }
    return { r: +m[0], g: +m[1], b: +m[2], a: m[3] === undefined ? 1 : +m[3] }
  }
  const over = (fg, bg) => ({
    r: fg.r * fg.a + bg.r * (1 - fg.a),
    g: fg.g * fg.a + bg.g * (1 - fg.a),
    b: fg.b * fg.a + bg.b * (1 - fg.a),
    a: 1,
  })
  const lum = (c) => {
    const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4 }
    return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b)
  }
  const contrast = (a, b) => +(((Math.max(lum(a), lum(b)) + 0.05) / (Math.min(lum(a), lum(b)) + 0.05)).toFixed(2))
  const effectiveBg = (el) => {
    const chain = []
    for (let n = el; n; n = n.parentElement) chain.unshift(n)
    let bg = { r: 255, g: 255, b: 255, a: 1 }
    for (const n of chain) {
      const c = parseColor(getComputedStyle(n).backgroundColor)
      if (c.a > 0) bg = over(c, bg)
    }
    return bg
  }
  const opacityOf = (el) => {
    let o = 1
    for (let n = el; n; n = n.parentElement) o *= Number(getComputedStyle(n).opacity)
    return o
  }
  const rgb = (c) => 'rgb(' + [c.r, c.g, c.b].map(v => Math.round(v)).join(',') + ')'
  const rect = (el) => { const r = el.getBoundingClientRect(); return { w: Math.round(r.width), h: Math.round(r.height) } }
  const cardOf = (i) => [...document.querySelectorAll('ol > li')][i]
  const rowsOf = (li) => [...li.querySelectorAll('div.cursor-pointer')]
  const chipOf = (row) => [...row.querySelectorAll('span')].find(s => /^\\d{1,3}$/.test(s.innerText.trim()) && /justify-center/.test(s.className))
  const titleOf = (row) => row.querySelector('p')
  const actionButtonsOf = (row) => [...row.querySelectorAll('button')].filter(b => /sparkle|plus-circle|check-circle/.test(b.className))
  const measureChip = (row) => {
    const chip = chipOf(row)
    if (!chip) return { error: '没量到序号' }
    const bg = effectiveBg(chip)
    const fg = parseColor(getComputedStyle(chip).color)
    const cs = getComputedStyle(chip)
    return {
      contrast: contrast(over({ ...fg, a: fg.a * opacityOf(chip) }, bg), bg),
      color: getComputedStyle(chip).color,
      bg: rgb(bg),
      size: rect(chip),
      fontSize: cs.fontSize,
      weight: cs.fontWeight,
    }
  }
`

async function main() {
  const browser = await launchHeadless({ url: APP })
  const { evaluate, waitFor } = browser
  try {
    const ready = await waitFor(`[...document.querySelectorAll('ol > li div.cursor-pointer')].length > 3`)
    if (!ready) {
      console.error("页面没渲染出条目（dev server 起了吗？）")
      process.exit(2)
    }

    const setMode = async (label) => {
      await evaluate(`(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim() === ${JSON.stringify(label)}); if (b) b.click(); return true })()`)
      await new Promise(r => setTimeout(r, 1600))
    }

    // —— 列表视图 ——
    await setMode("列表")
    const list = await evaluate(`(() => {
      ${PAGE_HELPERS}
      const li = cardOf(0)
      const row = rowsOf(li) && rowsOf(li)[0]
      if (!li || !row) return { error: '第 1 张卡 / 第 1 行没找到' }
      const title = titleOf(row)
      const header = li.firstElementChild.children[1]
      const sourceName = header.querySelector('span.text-xl')
      return {
        chip: measureChip(row),
        title: title ? { fontSize: getComputedStyle(title).fontSize, weight: getComputedStyle(title).fontWeight } : { error: '没量到标题' },
        sourceName: sourceName ? { text: sourceName.innerText.trim(), fontSize: getComputedStyle(sourceName).fontSize, weight: getComputedStyle(sourceName).fontWeight } : { error: '没量到来源名' },
        actions: actionButtonsOf(row).map(b => ({ size: rect(b), aria: b.getAttribute("aria-label") })),
        headerButtons: [...header.querySelectorAll('button, div.btn')].map(b => ({ size: rect(b), aria: b.getAttribute("aria-label"), title: b.getAttribute("title") })),
      }
    })()`)
    if (list.error) {
      console.error(`列表视图测量失败：${list.error}`)
      process.exit(2)
    }

    record("P0-1 序号对比度（列表）", list.chip.contrast >= 4.5, `实测 ${list.chip.contrast}:1（${list.chip.color} on ${list.chip.bg}，${list.chip.size.w}×${list.chip.size.h}）需要 ≥ 4.5`)
    record("P1-1 行内按钮点击区 ≥ 24×24（列表）", list.actions.length > 0 && list.actions.every(a => a.size.w >= 24 && a.size.h >= 24), list.actions.map(a => `${a.size.w}×${a.size.h}`).join(" / ") || "没量到行内按钮")
    record("P1-2 头部图标都有 aria-label", list.headerButtons.length >= 3 && list.headerButtons.every(b => b.aria), `${list.headerButtons.length} 个按钮，缺 aria-label ${list.headerButtons.filter(b => !b.aria).length} 个`)
    record("P2-1 标题字重 ≥ 来源名字重", Number(list.title.weight) >= Number(list.sourceName.weight), `标题 w${list.title.weight} vs 来源名 w${list.sourceName.weight}`)
    record("P2-1 来源名 ≤ 16px", Number.parseFloat(list.sourceName.fontSize) <= 16, `实测 ${list.sourceName.fontSize}`)
    record("P2-1 序号字重 ≤ w600", Number(list.chip.weight) <= 600, `实测 w${list.chip.weight}`)

    // —— P0-2 「原文」按钮（展开首条后量） ——
    const hit = await evaluate(`(() => { ${PAGE_HELPERS} const r = rowsOf(cardOf(0))[0].getBoundingClientRect(); return { x: Math.round(r.x + 30), y: Math.round(r.y + r.height / 2) } })()`)
    await evaluate(`(() => { ${PAGE_HELPERS} rowsOf(cardOf(0))[0].click(); return true })()`)
    await new Promise(r => setTimeout(r, 1200))
    const origin = await evaluate(`(() => {
      ${PAGE_HELPERS}
      const a = [...document.querySelectorAll('a')].find(x => x.innerText.includes('原文'))
      if (!a) return { error: '展开后没找到「原文」按钮' }
      const bg = effectiveBg(a)
      const fg = parseColor(getComputedStyle(a).color)
      return { contrast: contrast(over({ ...fg, a: fg.a * opacityOf(a) }, bg), bg), color: getComputedStyle(a).color, bg: rgb(bg), size: rect(a) }
    })()`)
    record("P0-2 「原文」按钮对比度", !origin.error && origin.contrast >= 4.5, origin.error || `实测 ${origin.contrast}:1（${origin.color} on ${origin.bg}）需要 ≥ 4.5`)

    // 展开态的序号用主色实底，单独量一次
    const expanded = await evaluate(`(() => { ${PAGE_HELPERS} return measureChip(rowsOf(cardOf(0))[0]) })()`)
    record("P0-3 序号对比度（展开态/主色底）", !expanded.error && expanded.contrast >= 4.5, expanded.error || `实测 ${expanded.contrast}:1（${expanded.color} on ${expanded.bg}）需要 ≥ 4.5`)
    void hit

    // 收起展开态，网格要量默认状态
    await evaluate(`(() => { ${PAGE_HELPERS} rowsOf(cardOf(0))[0].click(); return true })()`)
    await new Promise(r => setTimeout(r, 1000))

    // —— 网格视图 ——
    await setMode("网格")
    const grid = await evaluate(`(() => {
      ${PAGE_HELPERS}
      const li = cardOf(0)
      const row = rowsOf(li) && rowsOf(li)[0]
      if (!row) return { error: '网格视图没找到条目' }
      return { chip: measureChip(row) }
    })()`)
    record("P0-1 序号对比度（网格）", !grid.error && grid.chip.contrast >= 4.5, grid.error || `实测 ${grid.chip.contrast}:1（${grid.chip.color} on ${grid.chip.bg}，${grid.chip.size.w}×${grid.chip.size.h}）`)

    // 网格模式下 ✦/⊕ 只在展开时出现，展开后再量点击区
    await evaluate(`(() => { ${PAGE_HELPERS} rowsOf(cardOf(0))[0].click(); return true })()`)
    await new Promise(r => setTimeout(r, 1200))
    const gridActions = await evaluate(`(() => { ${PAGE_HELPERS} return actionButtonsOf(rowsOf(cardOf(0))[0]).map(b => ({ size: rect(b), aria: b.getAttribute("aria-label") })) })()`)
    record("P1-1 行内按钮点击区 ≥ 24×24（网格展开）", gridActions.length > 0 && gridActions.every(a => a.size.w >= 24 && a.size.h >= 24), gridActions.map(a => `${a.size.w}×${a.size.h}`).join(" / ") || "展开后仍没量到行内按钮")

    await setMode("列表")
  } finally {
    await browser.close()
  }

  console.log("UI 评审 01 A/B 档 gate")
  console.log("")
  for (const r of results) console.log(`${r.ok ? "PASS" : "FAIL"}  ${r.item.padEnd(32)} ${r.detail}`)
  const failed = results.filter(r => !r.ok).length
  console.log("")
  console.log(`PASS ${results.length - failed} / FAIL ${failed}`)
  process.exit(failed)
}

main().catch((e) => {
  console.error(e)
  process.exit(2)
})
