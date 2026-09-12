import type { Connector } from "db0"
import { neon } from "@neondatabase/serverless"

/**
 * Neon 的 HTTP 驱动连接器（db0 接口）。
 *
 * 为什么不用 db0 自带的 `postgresql`（pg）连接器：
 * 它是**长连接**，而 Neon 的 pooler 会回收空闲连接。连接被回收时 `pg.Client` 抛出的 `error`
 * 事件没有人监听（db0 没挂监听器），在 Node 里等于未捕获异常 → **整个函数进程崩溃**，
 * 在 Vercel 上表现成 `FUNCTION_INVOCATION_FAILED`（不是普通的 500，业务代码的 try/catch 拦不住）。
 *
 * HTTP 驱动每次查询就是一个 fetch，没有连接状态，也就没有这个失效模式——这也是 Neon 官方
 * 给 serverless 的推荐用法。
 */
export function neonHttpConnector(opts: { url: string }): Connector {
  const sql = neon(opts.url)

  // 应用的 SQL 用 `?` 占位符（SQLite 习惯），Postgres 要 `$1, $2`
  const normalize = (text: string, params: unknown[]) => {
    let i = 0
    return { text: text.replace(/\?/g, () => `$${++i}`), params }
  }

  const query = async (text: string, params: unknown[] = []) => {
    const { text: normalized, params: values } = normalize(text, params)
    return await (sql.query as (t: string, p?: unknown[]) => Promise<Record<string, unknown>[]>)(normalized, values)
  }

  // db0 是**直接带参**调 `statement.all(...params)` / `.run(...params)` / `.get(...params)` 的，
  // 参数不会先经过 bind()；两边都要接住，否则会报 "bind message supplies 0 parameters"
  const makeStatement = (text: string, bound: unknown[] = []) => ({
    all: (...params: unknown[]) => query(text, params.length ? params : bound),
    get: async (...params: unknown[]) => (await query(text, params.length ? params : bound))[0],
    run: async (...params: unknown[]) => ({ success: true, rows: await query(text, params.length ? params : bound) }),
  })

  return {
    name: "neon-http",
    dialect: "postgresql",
    getInstance: () => sql,
    exec: (text: string) => query(text),
    prepare: (text: string) => ({
      ...makeStatement(text),
      bind: (...params: unknown[]) => makeStatement(text, params),
    }),
  } as unknown as Connector
}
