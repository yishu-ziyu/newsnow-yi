import process from "node:process"
import { createDatabase } from "db0"
import { neonHttpConnector } from "./neon-connector"

/**
 * 数据库实例：线上（有 `DATABASE_URL`，当前是 Neon）用 Postgres，本地开发用 Node 自带的 SQLite。
 *
 * 踩过的三个坑：
 *
 * 1. **别走 nitro 的 `database` 配置**。那套是运行时按连接器**名字**动态 import 的，而 Vercel 的
 *    函数产物里没有 `node_modules`——动态 import 直接失败，错误又被 `getCacheTable()` 的 try/catch
 *    吞掉，表现是"缓存永远不生效、`/api/s/entire` 一直返回空"。所以这里静态引连接器、自己建实例。
 * 2. **线上用 Neon 的 HTTP 驱动，不要 `pg`**（见 neon-connector.ts 的注释：长连接被 pooler 回收时
 *    未处理的 error 事件会把整个函数进程干掉）。
 * 3. **本地 SQLite 用 `node:sqlite`，不要 `better-sqlite3`**。后者是原生模块：Vercel 的函数入口会
 *    静态 `import "better-sqlite3"`，Node 函数一启动就加载它，而镜像里是 macOS 编的二进制，
 *    直接 `FUNCTION_INVOCATION_FAILED`。`node:sqlite` 是 Node 内置的，没有这个问题。
 */
type Db = ReturnType<typeof createDatabase>

let instance: Db | undefined

let pending: Promise<Db> | undefined

export async function getDatabase(): Promise<Db> {
  if (instance) return instance
  if (pending) return pending

  pending = (async () => {
    const url = process.env.DATABASE_URL
    if (url) {
      instance = createDatabase(neonHttpConnector({ url }))
      return instance
    }
    // 懒加载：Vercel 的 Node 22 不一定带 node:sqlite，绝不能让它出现在函数启动路径上
    const { default: nodeSqlite } = await import("db0/connectors/node-sqlite")
    instance = createDatabase(nodeSqlite({ name: ".data/db.sqlite3" }))
    return instance
  })()

  return pending
}
