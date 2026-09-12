import { useMemo } from "react"
import { clsx } from "clsx"
import { parseInline, parseMarkdownLite } from "@shared/markdown"

function Inline({ text }: { text: string }) {
  const segments = useMemo(() => parseInline(text), [text])
  return (
    <>
      {segments.map((segment, index) => {
        if (segment.code) {
          return (
            <code key={index} className="rounded bg-black/10 px-1 py-0.5 text-[0.85em] dark:bg-white/10">
              {segment.text}
            </code>
          )
        }
        if (segment.bold) {
          return <strong key={index} className="font-semibold">{segment.text}</strong>
        }
        return <span key={index}>{segment.text}</span>
      })}
    </>
  )
}

/**
 * Renders the markdown subset the agent emits. No dangerouslySetInnerHTML:
 * every block becomes a React node, so a hostile reply cannot inject markup.
 */
export function MarkdownLite({ text, className }: { text: string, className?: string }) {
  const blocks = useMemo(() => parseMarkdownLite(text), [text])

  return (
    <div className={clsx("flex flex-col gap-2.5 [text-wrap:pretty]", className)}>
      {blocks.map((block, index) => {
        switch (block.type) {
          case "heading":
            return (
              <p
                key={index}
                className={clsx(
                  "mt-3 first:mt-0 font-serif-heading font-semibold text-ink-text [text-wrap:balance]",
                  block.level <= 2 ? "text-[1.05em]" : "text-[0.95em]",
                )}
              >
                <Inline text={block.text} />
              </p>
            )
          case "list":
            return (
              <ul key={index} className="flex flex-col gap-1 pl-3">
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="relative pl-2">
                    <span aria-hidden="true" className="absolute left-0 text-neutral-400">·</span>
                    <Inline text={item} />
                  </li>
                ))}
              </ul>
            )
          case "code":
            return (
              <pre key={index} className="overflow-x-auto rounded-lg bg-black/10 p-2 text-[0.8em] dark:bg-white/10">
                <code>{block.text}</code>
              </pre>
            )
          case "table":
            return (
              <div key={index} className="overflow-x-auto">
                <table className="w-full border-collapse text-[0.85em]">
                  <thead>
                    <tr>
                      {block.header.map((cell, cellIndex) => (
                        <th
                          key={cellIndex}
                          className="border-b border-neutral-400/30 px-2 py-1 text-left font-medium text-neutral-500 dark:text-neutral-400"
                        >
                          <Inline text={cell} />
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, rowIndex) => (
                      <tr key={rowIndex} className="align-top">
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex} className="border-b border-neutral-400/15 px-2 py-1">
                            <Inline text={cell} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          default:
            return (
              <p key={index} className="leading-relaxed">
                <Inline text={block.text} />
              </p>
            )
        }
      })}
    </div>
  )
}
