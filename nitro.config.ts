import process from "node:process"
import { join } from "node:path"
import viteNitro from "vite-plugin-with-nitro"
import { RollopGlob } from "./tools/rollup-glob"
import { projectDir } from "./shared/dir"

const nitroOption: Parameters<typeof viteNitro>[0] = {
  experimental: {
    database: true,
  },
  rollupConfig: {
    plugins: [RollopGlob()],
  },
  sourceMap: false,
  cacheOptions: {
    swr: 3600,
  },
  prerender: {
    crawlLinks: true,
  },
  routeRules: {
    "/**/*.html": { headers: { "cache-control": "no-cache, no-store, must-revalidate" } },
    // 原来这里给所有路由开了 ISR（上游的缓存做法）。我们已经用数据库缓存源数据，
    // 不需要 Vercel 那层 ISR 包装；而且实测它会把某些 API 路由包成 ISR 函数后直接失败。
    "/**": { headers: { "cache-control": "public, max-age=0, must-revalidate" } },
    "/assets/**": { headers: { "cache-control": "public, max-age=31536000, immutable" } },
  },
  // 数据库不走 nitro 的 database 配置：改由 server/utils/database.ts 自己静态创建实例，
  // 否则连接器只在运行时动态 import，Vercel 的函数产物里根本收不进 pg 驱动。
  imports: {
    dirs: ["server/utils", "shared"],
  },
  // Vercel 上用 vercel preset（输出 Build Output API 到 .vercel/output），
  // 其他情况（Docker / 自托管）走 node-server。
  preset: process.env.VERCEL ? "vercel" : "node-server",
  alias: {
    "@shared": join(projectDir, "shared"),
    "#": join(projectDir, "server"),
    // pg 的可选原生依赖：我们只用纯 JS 路径，打包时用空壳顶掉，否则 rollup 解析不到就整个构建失败
    "pg-native": join(projectDir, "tools/pg-native-stub.cjs"),
    "cloudflare:sockets": join(projectDir, "tools/cloudflare-sockets-stub.cjs"),
  },
}

if (process.env.VERCEL) {
  // 必须是 Node.js runtime（不是 vercel-edge）：Edge Runtime 没有 node:net / node:crypto 这些，
  // Postgres 驱动（pg）在那边直接跑不起来。上游这里原来写的是 "vercel-edge"。
  nitroOption.preset = "vercel"
  // 数据库不再走 nitro 的 database 配置，改由 server/utils/database.ts 静态创建（见那里的注释）
  nitroOption.database = undefined
  // 依赖全部内联进函数产物：pnpm 的 node_modules 全是符号链接，被 trace 进函数目录后
  // 部署到 Vercel 链接会失效，函数启动即崩（FUNCTION_INVOCATION_FAILED）。
  nitroOption.externals = { inline: [/.*/] }
  // nitroOption.vercel = {
  //   config: {
  //     cache: []
  //   },
  // }
} else if (process.env.CF_PAGES) {
  nitroOption.preset = "cloudflare-pages"
  nitroOption.unenv = {
    alias: {
      "safer-buffer": "node:buffer",
    },
  }
  nitroOption.database = {
    default: {
      connector: "cloudflare-d1",
      options: {
        bindingName: "NEWSNOW_DB",
      },
    },
  }
} else if (process.env.BUN) {
  nitroOption.preset = "bun"
  nitroOption.database = {
    default: {
      connector: "bun-sqlite",
    },
  }
}

export default function () {
  return viteNitro(nitroOption)
}
