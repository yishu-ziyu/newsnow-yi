// pg 只有在显式启用原生绑定时才会 require("pg-native")（一个需要本机编译的附加组件）。
// Vercel 函数里用不到它，但打包器会去解析这个可选的 require；给个空壳让它通过。
module.exports = null
