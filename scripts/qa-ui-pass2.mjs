#!/usr/bin/env node
/**
 * UI pass 2 的验收 gate：主题默认值 + 主色对比度 + 面板表面 + diff 徽章噪声。
 *
 * 用一次性无头浏览器（scripts/qa-cdp-lib.mjs），不碰用户自己的 Chrome。
 * 用法：node scripts/qa-ui-pass2.mjs
 * 输出：每项一行 PASS/FAIL + 实测数值，最后一行 `PASS n / FAIL n`，退出码 = FAIL 数。
 */
import process from "node:process"
import { launchHeadless } from "./qa-cdp-lib.mjs"

const APP = process.env.APP_URL || "http://127.0.0.1:5173"
const results = []
const record = (item, ok, detail) => results.push({ item, ok, detail })
const sleep = ms => new Promise(r => setTimeout(r, ms))

const HELPERS = `
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
  const pageBg = () => parseColor(getComputedStyle(document.body).backgroundColor)
  const textNodes = (root, minPx = 10) => [...root.querySelectorAll('*')].filter(el => {
    const own = [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim().length > 1)
    if (!own) return false
    const r = el.getBoundingClientRect()
    if (r.width < 1 || r.height < 1) return false
    if (parseFloat(getComputedStyle(el).fontSize) < minPx) return false
    return true
  })
  const contrastOf = (el) => {
    const bg = effectiveBg(el)
    const fg = parseColor(getComputedStyle(el).color)
    return contrast(over({ ...fg, a: fg.a * opacityOf(el) }, bg), bg)
  }
`

async function main() {
  // —— 新访客：空 profile，默认主题必须是浅色 ——
  {
    const b = await launchHeadless({ url: APP })
    try {
      const ok = await b.waitFor(`document.querySelectorAll('ol > li').length > 3`)
      if (!ok) {
        console.error("首页没渲染出条目")
        process.exit(2)
      }
      const state = await b.evaluate(`(() => {
        ${HELPERS}
        const bg = pageBg()
        return { dark: document.documentElement.classList.contains('dark'), scheme: localStorage.getItem('color-scheme'), pageBg: rgb(bg), pageLum: +lum(bg).toFixed(3) }
      })()`)
      record("P1 新访客默认浅色", state.dark === false, `html.dark=${state.dark}，localStorage color-scheme=${state.scheme}`)
      record("P1 页面底色是暖纸（亮）", state.pageLum >= 0.8, `${state.pageBg}，亮度 ${state.pageLum}`)

      // —— 面板表面 + 面板内文字对比度 ——
      await b.evaluate(`(() => { const btns = [...document.querySelectorAll('button')].filter(x => x.textContent.trim() === '✦'); btns[btns.length - 1] && btns[btns.length - 1].click(); return true })()`)
      const hasPanel = await b.waitFor(`!!document.querySelector('.fixed.inset-0.z-50')`)
      if (!hasPanel) {
        record("P2 面板表面同色系", false, "面板没打开")
      } else {
        await sleep(1200)
        const panel = await b.evaluate(`(() => {
          ${HELPERS}
          const root = document.querySelector('.fixed.inset-0.z-50')
          const page = pageBg()
          // 面板实体：从「Agent 助手」标题往上找第一个不透明背景的祖先
          const title = [...root.querySelectorAll('*')].find(e => /Agent 助手|选中新闻/.test(e.innerText || '') && /font-bold|font-semibold|text-lg/.test(e.className || ''))
          let node = title
          while (node && parseColor(getComputedStyle(node).backgroundColor).a === 0) node = node.parentElement
          const surface = node ? effectiveBg(node) : effectiveBg(root.firstElementChild)
          const nodes = textNodes(root).map(el => ({ text: (el.innerText || '').slice(0, 18), contrast: contrastOf(el), font: getComputedStyle(el).fontSize }))
          const worst = nodes.slice().sort((a, b) => a.contrast - b.contrast).slice(0, 6)
          const placeholder = (() => {
            const i = root.querySelector('input, textarea')
            if (!i) return null
            const bg = effectiveBg(i)
            const ph = parseColor(getComputedStyle(i, '::placeholder').color)
            return contrast(over(ph, bg), bg)
          })()
          return {
            pageBg: rgb(page),
            surface: rgb(surface),
            surfaceLum: +lum(surface).toFixed(3),
            delta: Math.max(Math.abs(surface.r - page.r), Math.abs(surface.g - page.g), Math.abs(surface.b - page.b)),
            textCount: nodes.length,
            worst,
            placeholder,
          }
        })()`)
        record("P2 面板表面与页面同色系", panel.delta <= 10 && panel.surfaceLum >= 0.8, `面板 ${panel.surface}（亮度 ${panel.surfaceLum}） vs 页面 ${panel.pageBg}，最大通道差 ${panel.delta}`)
        const bad = panel.worst.filter(t => t.contrast < 4.5)
        record("P3 面板文字对比度 ≥ 4.5:1", bad.length === 0, bad.length ? `最差 ${bad.map(t => `「${t.text}」${t.contrast}:1`).join("，")}` : `${panel.textCount} 个文字节点全部 ≥ 4.5`)
        record("P3 输入框 placeholder ≥ 3:1", panel.placeholder === null || panel.placeholder >= 3, panel.placeholder === null ? "没找到输入框" : `实测 ${panel.placeholder}:1`)

        // 主色实底 + 白字（发送按钮）
        const send = await b.evaluate(`(() => {
          ${HELPERS}
          const btn = [...document.querySelectorAll('.fixed.inset-0.z-50 button')].find(x => /发送/.test(x.innerText))
          if (!btn) return { error: '没找到发送按钮' }
          const bg = effectiveBg(btn)
          const fg = parseColor(getComputedStyle(btn).color)
          return { contrast: contrast(over(fg, bg), bg), bg: rgb(bg), color: getComputedStyle(btn).color }
        })()`)
        record("P4 主色实底上的白字 ≥ 4.5:1", !send.error && send.contrast >= 4.5, send.error || `实测 ${send.contrast}:1（${send.color} on ${send.bg}）`)
      }
    } finally {
      await b.close()
    }
  }

  // —— 老访客：存过 dark 的选择要保住 ——
  {
    const b = await launchHeadless({ url: APP })
    try {
      await b.waitFor(`document.querySelectorAll('ol > li').length > 3`)
      await b.evaluate(`localStorage.setItem('color-scheme', JSON.stringify('dark')); location.reload(); true`)
      const ok = await b.waitFor(`document.documentElement.classList.contains('dark')`, 15000)
      record("P5 存过 dark 的老访客仍是深色", ok, ok ? "html.dark 生效" : "重新加载后没有 dark 类（用户选择丢了）")
    } finally {
      await b.close()
    }
  }

  // —— diff 徽章：0 不该刷屏 ——
  {
    const b = await launchHeadless({ url: APP })
    try {
      const ok = await b.waitFor(`document.querySelectorAll('ol > li div.cursor-pointer').length > 3`)
      if (!ok) {
        record("P6 diff=0 不渲染", false, "首页没渲染出条目")
      } else {
        // 刷新第一张卡，触发 diff 计算（queryFn 里有 cacheSources 才会带 diff）
        const clickRefresh = `(() => { const header = document.querySelector('ol > li').firstElementChild.children[1]; const btn = header.querySelector('button'); btn && btn.click(); return true })()`
        await b.evaluate(clickRefresh)
        await sleep(7000)
        await b.evaluate(clickRefresh)
        await sleep(7000)
        const diff = await b.evaluate(`(() => {
          const badges = [...document.querySelectorAll('span')].filter(s => /^[+-]?\\d+$/.test(s.innerText.trim()) && /rounded-md/.test(s.className) && /font-black/.test(s.className))
          return { total: badges.length, zeros: badges.filter(s => s.innerText.trim() === '0').length }
        })()`)
        record("P6 diff=0 不渲染", diff.zeros === 0, `徽章总数 ${diff.total}，其中值为 0 的 ${diff.zeros} 个`)
      }
    } finally {
      await b.close()
    }
  }

  console.log("UI pass 2 gate")
  console.log("")
  for (const r of results) console.log(`${r.ok ? "PASS" : "FAIL"}  ${r.item.padEnd(30)} ${r.detail}`)
  const failed = results.filter(r => !r.ok).length
  console.log("")
  console.log(`PASS ${results.length - failed} / FAIL ${failed}`)
  process.exit(failed)
}

main().catch((e) => {
  console.error(e)
  process.exit(2)
})
