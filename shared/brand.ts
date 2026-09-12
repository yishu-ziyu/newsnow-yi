import { Author, Homepage } from "./consts"

/**
 * 站点品牌：二次开发换代时改这一个文件（页头字标、浏览器标题、页脚、PWA 清单、Agent 自我介绍都读它）。
 *
 * 名字有两层意思：**闻**是收到世界的消息，**见**是从消息里形成自己的判断。
 */
export const Brand = {
  /** 站点名：浏览器标题、PWA、Agent 自我介绍 */
  name: "闻见",
  /** 拉丁写法：分享图、对外文案 */
  latin: "WENJIAN",
  /** 页头两行字标 */
  wordmark: ["闻", "见"] as const,
  /** 一句对外文案 */
  tagline: "从新闻里，看见值得追踪的事。",
  /** 站点描述：meta description 与 PWA manifest */
  description: "把几十个来源的实时资讯放在一起，追问、对比，并持续追踪真正重要的变化。",
  /** 线上地址：og:url、Schema.org、sitemap 用同一个域 */
  site: "https://wenjian.yishuziyu.cn/",
  /** 仓库地址（页头 GitHub 按钮、版本号链接、LICENSE 链接） */
  repo: Homepage,
  author: Author,
  /** 出处：MIT 要求保留版权与许可声明，页脚展示这句 */
  upstream: {
    name: "NewsNow",
    url: "https://github.com/ourongxing/newsnow",
  },
} as const
