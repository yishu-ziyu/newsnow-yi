import { Author, Homepage } from "./consts"

/**
 * 站点品牌：二次开发换代时改这一个文件（页头字标、浏览器标题、页脚、PWA 清单、Agent 自我介绍都读它）。
 *
 * `name` / `wordmark` 现在是占位值，换成你自己的站名即可；`repo` / `author` 跟着 package.json 走。
 */
export const Brand = {
  /** 站点名：浏览器标题、PWA、Agent 自我介绍 */
  name: "新闻墙",
  /** 页头两行字标 */
  wordmark: ["新闻", "墙"] as const,
  /** 站点描述：meta description 与 PWA manifest */
  description: "实时新闻聚合阅读器：把几十个来源的热榜拼成一面墙，可以追问、对比、建立长期追踪。",
  /** 仓库地址（页头 GitHub 按钮、版本号链接、LICENSE 链接） */
  repo: Homepage,
  author: Author,
  /** 出处：MIT 要求保留版权与许可声明，页脚展示这句 */
  upstream: {
    name: "NewsNow",
    url: "https://github.com/ourongxing/newsnow",
  },
} as const
