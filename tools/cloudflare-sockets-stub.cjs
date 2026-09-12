// pg-cloudflare 是 pg 给 Cloudflare Workers 用的传输层，在 Node/Vercel 环境不会被走到，
// 但它顶部就 import 了 Workers 专有的 "cloudflare:sockets"；给个空壳让打包器别炸。
module.exports = {
  connect() {
    throw new Error("cloudflare:sockets stub: not available outside Workers")
  },
}
