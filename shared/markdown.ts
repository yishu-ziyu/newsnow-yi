/**
 * Tiny markdown subset parser for agent replies.
 *
 * The panel has no markdown renderer and no HTML sanitizer, so this only
 * recognises the shapes the model actually emits (headings, lists, bold,
 * inline code, fenced code and tables) and returns structured blocks. The
 * React side renders those blocks, so no raw HTML ever reaches the DOM.
 */

export type MarkdownBlock =
  | { type: "heading", level: number, text: string }
  | { type: "paragraph", text: string }
  | { type: "list", items: string[] }
  | { type: "code", text: string }
  | { type: "table", header: string[], rows: string[][] }

function splitRow(line: string): string[] {
  return line
    .replace(/^\||\|$/g, "")
    .split("|")
    .map(cell => cell.trim())
}

function isSeparatorRow(line: string) {
  return /^[\s:|-]+$/.test(line) && line.includes("-")
}

export function parseMarkdownLite(input: string): MarkdownBlock[] {
  const blocks: MarkdownBlock[] = []
  const lines = String(input ?? "").replace(/\r\n/g, "\n").split("\n")

  let paragraph: string[] = []
  let list: string[] = []

  const flushParagraph = () => {
    if (paragraph.length) {
      blocks.push({ type: "paragraph", text: paragraph.join(" ").trim() })
      paragraph = []
    }
  }
  const flushList = () => {
    if (list.length) {
      blocks.push({ type: "list", items: list })
      list = []
    }
  }
  const flushAll = () => {
    flushParagraph()
    flushList()
  }

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i]
    const line = raw.trim()

    if (!line) {
      flushAll()
      continue
    }

    if (line.startsWith("```")) {
      flushAll()
      const body: string[] = []
      i += 1
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        body.push(lines[i])
        i += 1
      }
      blocks.push({ type: "code", text: body.join("\n") })
      continue
    }

    const heading = /^(#{1,4})/.exec(line)
    if (heading) {
      flushAll()
      blocks.push({ type: "heading", level: heading[1].length, text: line.slice(heading[0].length).trim() })
      continue
    }

    // tables: a header row followed by a separator row
    if (line.includes("|") && i + 1 < lines.length && isSeparatorRow(lines[i + 1].trim())) {
      flushAll()
      const header = splitRow(line)
      const rows: string[][] = []
      i += 2
      while (i < lines.length && lines[i].trim().includes("|")) {
        rows.push(splitRow(lines[i].trim()))
        i += 1
      }
      i -= 1
      blocks.push({ type: "table", header, rows })
      continue
    }

    const bullet = /^[-*]/.exec(line) ?? /^\d+[.)]/.exec(line)
    if (bullet) {
      const item = line.slice(bullet[0].length).trim()
      if (item) {
        flushParagraph()
        list.push(item)
        continue
      }
    }

    flushList()
    paragraph.push(line)
  }

  flushAll()
  return blocks
}

/** Split inline `**bold**` and `` `code` `` into plain segments for the renderer. */
export interface InlineSegment {
  text: string
  bold?: boolean
  code?: boolean
}

export function parseInline(input: string): InlineSegment[] {
  const segments: InlineSegment[] = []
  const pattern = /\*\*([^*]+)\*\*|`([^`]+)`/g
  let lastIndex = 0

  for (const match of input.matchAll(pattern)) {
    const index = match.index ?? 0
    if (index > lastIndex) segments.push({ text: input.slice(lastIndex, index) })
    if (match[1] !== undefined) segments.push({ text: match[1], bold: true })
    else if (match[2] !== undefined) segments.push({ text: match[2], code: true })
    lastIndex = index + match[0].length
  }

  if (lastIndex < input.length) segments.push({ text: input.slice(lastIndex) })
  return segments.filter(segment => segment.text.length > 0)
}
