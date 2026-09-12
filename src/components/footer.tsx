import { Brand } from "@shared/brand"

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <>
      <a href={`${Brand.repo}/blob/main/LICENSE`} target="_blank">MIT LICENSE</a>
      <span>
        <span>基于 </span>
        <a href={Brand.upstream.url} target="_blank">{Brand.upstream.name}</a>
        <span>{` 二次开发 · © 2024-${year} `}</span>
        <a href={Brand.author.url} target="_blank">{Brand.author.name}</a>
      </span>
    </>
  )
}
