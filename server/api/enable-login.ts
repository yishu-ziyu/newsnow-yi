import process from "node:process"

// 未配置 G_CLIENT_ID 时必须明确返回 enable:false，
// 否则前端会显示登录入口，点进去是 client_id=undefined 的死链
export default defineEventHandler(async () => {
  const clientId = process.env.G_CLIENT_ID
  return {
    enable: Boolean(clientId),
    url: clientId ? `https://github.com/login/oauth/authorize?client_id=${clientId}` : "",
  }
})
