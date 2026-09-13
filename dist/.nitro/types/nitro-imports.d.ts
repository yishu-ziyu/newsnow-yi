declare global {
  const AGENT_MAX_STEPS: typeof import('../../../server/utils/agent-runner').AGENT_MAX_STEPS
  const Author: typeof import('../../../shared/consts').Author
  const Brand: typeof import('../../../shared/brand').Brand
  const Homepage: typeof import('../../../shared/consts').Homepage
  const Interval: typeof import('../../../shared/consts').Interval
  const TRACKER_DEFAULT_INTERVAL_MS: typeof import('../../../shared/tracker').TRACKER_DEFAULT_INTERVAL_MS
  const TRACKER_MIN_INTERVAL_MS: typeof import('../../../shared/tracker').TRACKER_MIN_INTERVAL_MS
  const TTL: typeof import('../../../shared/consts').TTL
  const Version: typeof import('../../../shared/consts').Version
  const anthropicMessagesBaseUrl: typeof import('../../../shared/agent').anthropicMessagesBaseUrl
  const appendCorsHeaders: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').appendCorsHeaders
  const appendCorsPreflightHeaders: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').appendCorsPreflightHeaders
  const appendHeader: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').appendHeader
  const appendHeaders: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').appendHeaders
  const appendResponseHeader: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').appendResponseHeader
  const appendResponseHeaders: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').appendResponseHeaders
  const assertMethod: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').assertMethod
  const assertSourceEnabled: typeof import('../../../server/utils/source-health').assertSourceEnabled
  const cachedEventHandler: typeof import('../../../node_modules/.pnpm/nitro-go@0.0.3_@libsql+client@0.15.4_@netlify+blobs@9.1.2_better-sqlite3@11.10.0_mysql2@3.14.3_srvx@1.0.4/node_modules/nitro-go/dist/runtime/internal/cache').cachedEventHandler
  const cachedFunction: typeof import('../../../node_modules/.pnpm/nitro-go@0.0.3_@libsql+client@0.15.4_@netlify+blobs@9.1.2_better-sqlite3@11.10.0_mysql2@3.14.3_srvx@1.0.4/node_modules/nitro-go/dist/runtime/internal/cache').cachedFunction
  const callLLM: typeof import('../../../shared/agent').callLLM
  const callNodeListener: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').callNodeListener
  const clampInterval: typeof import('../../../shared/tracker').clampInterval
  const clearResponseHeaders: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').clearResponseHeaders
  const clearSession: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').clearSession
  const collectCachedSeeds: typeof import('../../../server/utils/briefing').collectCachedSeeds
  const columns: typeof import('../../../shared/metadata').columns
  const createApp: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').createApp
  const createAppEventHandler: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').createAppEventHandler
  const createError: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').createError
  const createEvent: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').createEvent
  const createEventStream: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').createEventStream
  const createNewsTools: typeof import('../../../server/utils/news-tools').createNewsTools
  const createRouter: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').createRouter
  const credentialSources: typeof import('../../../shared/source-health').credentialSources
  const decodeBase64: typeof import('../../../server/utils/base64').decodeBase64
  const decodeBase64URL: typeof import('../../../server/utils/base64').decodeBase64URL
  const defaultContentType: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').defaultContentType
  const defineCachedEventHandler: typeof import('../../../node_modules/.pnpm/nitro-go@0.0.3_@libsql+client@0.15.4_@netlify+blobs@9.1.2_better-sqlite3@11.10.0_mysql2@3.14.3_srvx@1.0.4/node_modules/nitro-go/dist/runtime/internal/cache').defineCachedEventHandler
  const defineCachedFunction: typeof import('../../../node_modules/.pnpm/nitro-go@0.0.3_@libsql+client@0.15.4_@netlify+blobs@9.1.2_better-sqlite3@11.10.0_mysql2@3.14.3_srvx@1.0.4/node_modules/nitro-go/dist/runtime/internal/cache').defineCachedFunction
  const defineEventHandler: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').defineEventHandler
  const defineForeignSource: typeof import('../../../server/utils/proxy').defineForeignSource
  const defineLazyEventHandler: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').defineLazyEventHandler
  const defineNitroErrorHandler: typeof import('../../../node_modules/.pnpm/nitro-go@0.0.3_@libsql+client@0.15.4_@netlify+blobs@9.1.2_better-sqlite3@11.10.0_mysql2@3.14.3_srvx@1.0.4/node_modules/nitro-go/dist/runtime/internal/error/utils').defineNitroErrorHandler
  const defineNitroPlugin: typeof import('../../../node_modules/.pnpm/nitro-go@0.0.3_@libsql+client@0.15.4_@netlify+blobs@9.1.2_better-sqlite3@11.10.0_mysql2@3.14.3_srvx@1.0.4/node_modules/nitro-go/dist/runtime/internal/plugin').defineNitroPlugin
  const defineNodeListener: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').defineNodeListener
  const defineNodeMiddleware: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').defineNodeMiddleware
  const defineRSSHubSource: typeof import('../../../server/utils/source').defineRSSHubSource
  const defineRSSSource: typeof import('../../../server/utils/source').defineRSSSource
  const defineRenderHandler: typeof import('../../../node_modules/.pnpm/nitro-go@0.0.3_@libsql+client@0.15.4_@netlify+blobs@9.1.2_better-sqlite3@11.10.0_mysql2@3.14.3_srvx@1.0.4/node_modules/nitro-go/dist/runtime/internal/renderer').defineRenderHandler
  const defineRequestMiddleware: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').defineRequestMiddleware
  const defineResponseMiddleware: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').defineResponseMiddleware
  const defineRouteMeta: typeof import('../../../node_modules/.pnpm/nitro-go@0.0.3_@libsql+client@0.15.4_@netlify+blobs@9.1.2_better-sqlite3@11.10.0_mysql2@3.14.3_srvx@1.0.4/node_modules/nitro-go/dist/runtime/internal/meta').defineRouteMeta
  const defineSource: typeof import('../../../server/utils/source').defineSource
  const defineTask: typeof import('../../../node_modules/.pnpm/nitro-go@0.0.3_@libsql+client@0.15.4_@netlify+blobs@9.1.2_better-sqlite3@11.10.0_mysql2@3.14.3_srvx@1.0.4/node_modules/nitro-go/dist/runtime/internal/task').defineTask
  const defineWebSocket: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').defineWebSocket
  const defineWebSocketHandler: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').defineWebSocketHandler
  const delay: typeof import('../../../shared/utils').delay
  const deleteCookie: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').deleteCookie
  const disabledSources: typeof import('../../../shared/source-health').disabledSources
  const dynamicEventHandler: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').dynamicEventHandler
  const encodeBase64: typeof import('../../../server/utils/base64').encodeBase64
  const encodeBase64URL: typeof import('../../../server/utils/base64').encodeBase64URL
  const eventHandler: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').eventHandler
  const fetchSourceItems: typeof import('../../../server/utils/news-tools').fetchSourceItems
  const fetchWithEvent: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').fetchWithEvent
  const fixedColumnIds: typeof import('../../../shared/metadata').fixedColumnIds
  const fromNodeMiddleware: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').fromNodeMiddleware
  const fromPlainHandler: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').fromPlainHandler
  const fromWebHandler: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').fromWebHandler
  const genSources: typeof import('../../../shared/pre-sources').genSources
  const getCookie: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').getCookie
  const getDatabase: typeof import('../../../server/utils/database').getDatabase
  const getDisabledSources: typeof import('../../../server/utils/source-health').getDisabledSources
  const getHeader: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').getHeader
  const getHeaders: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').getHeaders
  const getLLMConfig: typeof import('../../../shared/agent').getLLMConfig
  const getLLMProviders: typeof import('../../../shared/agent').getLLMProviders
  const getMethod: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').getMethod
  const getProxyRequestHeaders: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').getProxyRequestHeaders
  const getQuery: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').getQuery
  const getRequestFingerprint: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').getRequestFingerprint
  const getRequestHeader: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').getRequestHeader
  const getRequestHeaders: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').getRequestHeaders
  const getRequestHost: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').getRequestHost
  const getRequestIP: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').getRequestIP
  const getRequestPath: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').getRequestPath
  const getRequestProtocol: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').getRequestProtocol
  const getRequestURL: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').getRequestURL
  const getRequestWebStream: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').getRequestWebStream
  const getResponseHeader: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').getResponseHeader
  const getResponseHeaders: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').getResponseHeaders
  const getResponseStatus: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').getResponseStatus
  const getResponseStatusText: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').getResponseStatusText
  const getRouteRules: typeof import('../../../node_modules/.pnpm/nitro-go@0.0.3_@libsql+client@0.15.4_@netlify+blobs@9.1.2_better-sqlite3@11.10.0_mysql2@3.14.3_srvx@1.0.4/node_modules/nitro-go/dist/runtime/internal/route-rules').getRouteRules
  const getRouterParam: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').getRouterParam
  const getRouterParams: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').getRouterParams
  const getSession: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').getSession
  const getValidatedQuery: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').getValidatedQuery
  const getValidatedRouterParams: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').getValidatedRouterParams
  const handleCacheHeaders: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').handleCacheHeaders
  const handleCors: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').handleCors
  const hiddenColumns: typeof import('../../../shared/metadata').hiddenColumns
  const isCorsOriginAllowed: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').isCorsOriginAllowed
  const isError: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').isError
  const isEvent: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').isEvent
  const isEventHandler: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').isEventHandler
  const isMethod: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').isMethod
  const isPreflightRequest: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').isPreflightRequest
  const isStream: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').isStream
  const isWebResponse: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').isWebResponse
  const lazyEventHandler: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').lazyEventHandler
  const listSourceBriefs: typeof import('../../../server/utils/news-tools').listSourceBriefs
  const logger: typeof import('../../../server/utils/logger').logger
  const md5: typeof import('../../../server/utils/crypto').md5
  const metadata: typeof import('../../../shared/metadata').metadata
  const myCrypto: typeof import('../../../server/utils/crypto').myCrypto
  const myFetch: typeof import('../../../server/utils/fetch').myFetch
  const neonHttpConnector: typeof import('../../../server/utils/neon-connector').neonHttpConnector
  const newsToolNames: typeof import('../../../server/utils/news-tools').newsToolNames
  const newsTools: typeof import('../../../server/utils/news-tools').newsTools
  const nitroPlugin: typeof import('../../../node_modules/.pnpm/nitro-go@0.0.3_@libsql+client@0.15.4_@netlify+blobs@9.1.2_better-sqlite3@11.10.0_mysql2@3.14.3_srvx@1.0.4/node_modules/nitro-go/dist/runtime/internal/plugin').nitroPlugin
  const originSources: typeof import('../../../shared/pre-sources').originSources
  const parseCookies: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').parseCookies
  const parseDate: typeof import('../../../server/utils/date').parseDate
  const parseInline: typeof import('../../../shared/markdown').parseInline
  const parseMarkdownLite: typeof import('../../../shared/markdown').parseMarkdownLite
  const parseRelativeDate: typeof import('../../../server/utils/date').parseRelativeDate
  const projectDir: typeof import('../../../shared/dir').projectDir
  const promisifyNodeListener: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').promisifyNodeListener
  const proxyRequest: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').proxyRequest
  const proxySource: typeof import('../../../server/utils/source').proxySource
  const randomItem: typeof import('../../../shared/utils').randomItem
  const randomUUID: typeof import('../../../shared/utils').randomUUID
  const readBody: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').readBody
  const readFormData: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').readFormData
  const readMultipartFormData: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').readMultipartFormData
  const readRawBody: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').readRawBody
  const readValidatedBody: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').readValidatedBody
  const relativeTime: typeof import('../../../shared/utils').relativeTime
  const removeResponseHeader: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').removeResponseHeader
  const resolveDisabledSources: typeof import('../../../shared/source-health').resolveDisabledSources
  const resolveSourceId: typeof import('../../../server/utils/news-tools').resolveSourceId
  const rss2json: typeof import('../../../server/utils/rss2json').rss2json
  const runBriefing: typeof import('../../../server/utils/agent-runner').runBriefing
  const runDueTrackers: typeof import('../../../server/utils/tracker-runner').runDueTrackers
  const runNewsAgent: typeof import('../../../server/utils/agent-runner').runNewsAgent
  const runTask: typeof import('../../../node_modules/.pnpm/nitro-go@0.0.3_@libsql+client@0.15.4_@netlify+blobs@9.1.2_better-sqlite3@11.10.0_mysql2@3.14.3_srvx@1.0.4/node_modules/nitro-go/dist/runtime/internal/task').runTask
  const sanitizeStatusCode: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').sanitizeStatusCode
  const sanitizeStatusMessage: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').sanitizeStatusMessage
  const scoreText: typeof import('../../../shared/news-search').scoreText
  const sealSession: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').sealSession
  const searchNews: typeof import('../../../server/utils/news-tools').searchNews
  const searchNewsItems: typeof import('../../../shared/news-search').searchNewsItems
  const send: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').send
  const sendError: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').sendError
  const sendIterable: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').sendIterable
  const sendNoContent: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').sendNoContent
  const sendProxy: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').sendProxy
  const sendRedirect: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').sendRedirect
  const sendStream: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').sendStream
  const sendWebResponse: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').sendWebResponse
  const serveStatic: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').serveStatic
  const setCookie: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').setCookie
  const setHeader: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').setHeader
  const setHeaders: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').setHeaders
  const setResponseHeader: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').setResponseHeader
  const setResponseHeaders: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').setResponseHeaders
  const setResponseStatus: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').setResponseStatus
  const sources: typeof import('../../../shared/sources').default
  const splitCookiesString: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').splitCookiesString
  const summarizeSteps: typeof import('../../../shared/agent').summarizeSteps
  const toEventHandler: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').toEventHandler
  const toNodeListener: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').toNodeListener
  const toPlainHandler: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').toPlainHandler
  const toWebHandler: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').toWebHandler
  const toWebRequest: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').toWebRequest
  const tokenizeQuery: typeof import('../../../shared/news-search').tokenizeQuery
  const tranformToUTC: typeof import('../../../server/utils/date').tranformToUTC
  const trimAgentHistory: typeof import('../../../shared/agent').trimAgentHistory
  const trimHistoryForPrompt: typeof import('../../../shared/agent').trimHistoryForPrompt
  const typeSafeObjectEntries: typeof import('../../../shared/type.util').typeSafeObjectEntries
  const typeSafeObjectFromEntries: typeof import('../../../shared/type.util').typeSafeObjectFromEntries
  const typeSafeObjectValues: typeof import('../../../shared/type.util').typeSafeObjectValues
  const unsealSession: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').unsealSession
  const updateSession: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').updateSession
  const useAppConfig: typeof import('../../../node_modules/.pnpm/nitro-go@0.0.3_@libsql+client@0.15.4_@netlify+blobs@9.1.2_better-sqlite3@11.10.0_mysql2@3.14.3_srvx@1.0.4/node_modules/nitro-go/dist/runtime/internal/config').useAppConfig
  const useBase: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').useBase
  const useDatabase: typeof import('../../../node_modules/.pnpm/nitro-go@0.0.3_@libsql+client@0.15.4_@netlify+blobs@9.1.2_better-sqlite3@11.10.0_mysql2@3.14.3_srvx@1.0.4/node_modules/nitro-go/dist/runtime/internal/database').useDatabase
  const useEvent: typeof import('../../../node_modules/.pnpm/nitro-go@0.0.3_@libsql+client@0.15.4_@netlify+blobs@9.1.2_better-sqlite3@11.10.0_mysql2@3.14.3_srvx@1.0.4/node_modules/nitro-go/dist/runtime/internal/context').useEvent
  const useNitroApp: typeof import('../../../node_modules/.pnpm/nitro-go@0.0.3_@libsql+client@0.15.4_@netlify+blobs@9.1.2_better-sqlite3@11.10.0_mysql2@3.14.3_srvx@1.0.4/node_modules/nitro-go/dist/runtime/internal/app').useNitroApp
  const useRuntimeConfig: typeof import('../../../node_modules/.pnpm/nitro-go@0.0.3_@libsql+client@0.15.4_@netlify+blobs@9.1.2_better-sqlite3@11.10.0_mysql2@3.14.3_srvx@1.0.4/node_modules/nitro-go/dist/runtime/internal/config').useRuntimeConfig
  const useSession: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').useSession
  const useStorage: typeof import('../../../node_modules/.pnpm/nitro-go@0.0.3_@libsql+client@0.15.4_@netlify+blobs@9.1.2_better-sqlite3@11.10.0_mysql2@3.14.3_srvx@1.0.4/node_modules/nitro-go/dist/runtime/internal/storage').useStorage
  const verifyPrimitiveMetadata: typeof import('../../../shared/verify').verifyPrimitiveMetadata
  const writeEarlyHints: typeof import('../../../node_modules/.pnpm/h3@1.15.3/node_modules/h3').writeEarlyHints
}
// for type re-export
declare global {
  // @ts-ignore
  export type { AgentRunSuccess, AgentRunFailure, AgentRunResult, BriefingSeed, BriefingRunSuccess, BriefingRunFailure } from '../../../server/utils/agent-runner'
  import('../../../server/utils/agent-runner')
  // @ts-ignore
  export type { CachedBriefingMaterial } from '../../../server/utils/briefing'
  import('../../../server/utils/briefing')
  // @ts-ignore
  export type { SourceBrief, ItemFetcher, SearchNewsOptions, NewsToolOptions } from '../../../server/utils/news-tools'
  import('../../../server/utils/news-tools')
  // @ts-ignore
  export type { TrackerRunResult } from '../../../server/utils/tracker-runner'
  import('../../../server/utils/tracker-runner')
  // @ts-ignore
  export type { LLMProvider, LLMConfig, ChatTurn, ChatRequest, AgentStep, ChatResponse, BriefingRequest, AgentChatMessage, AgentHistoryResponse, BriefingResponse } from '../../../shared/agent'
  import('../../../shared/agent')
  // @ts-ignore
  export type { MarkdownBlock, InlineSegment } from '../../../shared/markdown'
  import('../../../shared/markdown')
  // @ts-ignore
  export type { SearchableNewsItem, ScoredNewsItem } from '../../../shared/news-search'
  import('../../../shared/news-search')
  // @ts-ignore
  export type { DisabledKind, DisabledInfo } from '../../../shared/source-health'
  import('../../../shared/source-health')
  // @ts-ignore
  export type { TrackerRecord, BriefingRecord } from '../../../shared/tracker'
  import('../../../shared/tracker')
  // @ts-ignore
  export type { OmitNever, UnionToIntersection, MaybePromise } from '../../../shared/type.util'
  import('../../../shared/type.util')
  // @ts-ignore
  export type { Color, SourceID, AllSourceID, ColumnID, Metadata, PrimitiveMetadata, FixedColumnID, HiddenColumnID, OriginSource, Source, Column, NewsItem, SourceResponse } from '/Users/mahaoxuan/Desktop/newsnow-yi/shared/types.ts'
  import('/Users/mahaoxuan/Desktop/newsnow-yi/shared/types.ts')
}
export { useNitroApp } from 'nitropack/runtime/internal/app';
export { useRuntimeConfig, useAppConfig } from 'nitropack/runtime/internal/config';
export { defineNitroPlugin, nitroPlugin } from 'nitropack/runtime/internal/plugin';
export { defineCachedFunction, defineCachedEventHandler, cachedFunction, cachedEventHandler } from 'nitropack/runtime/internal/cache';
export { useStorage } from 'nitropack/runtime/internal/storage';
export { defineRenderHandler } from 'nitropack/runtime/internal/renderer';
export { defineRouteMeta } from 'nitropack/runtime/internal/meta';
export { getRouteRules } from 'nitropack/runtime/internal/route-rules';
export { useEvent } from 'nitropack/runtime/internal/context';
export { defineTask, runTask } from 'nitropack/runtime/internal/task';
export { defineNitroErrorHandler } from 'nitropack/runtime/internal/error/utils';
export { appendCorsHeaders, appendCorsPreflightHeaders, appendHeader, appendHeaders, appendResponseHeader, appendResponseHeaders, assertMethod, callNodeListener, clearResponseHeaders, clearSession, createApp, createAppEventHandler, createError, createEvent, createEventStream, createRouter, defaultContentType, defineEventHandler, defineLazyEventHandler, defineNodeListener, defineNodeMiddleware, defineRequestMiddleware, defineResponseMiddleware, defineWebSocket, defineWebSocketHandler, deleteCookie, dynamicEventHandler, eventHandler, fetchWithEvent, fromNodeMiddleware, fromPlainHandler, fromWebHandler, getCookie, getHeader, getHeaders, getMethod, getProxyRequestHeaders, getQuery, getRequestFingerprint, getRequestHeader, getRequestHeaders, getRequestHost, getRequestIP, getRequestPath, getRequestProtocol, getRequestURL, getRequestWebStream, getResponseHeader, getResponseHeaders, getResponseStatus, getResponseStatusText, getRouterParam, getRouterParams, getSession, getValidatedQuery, getValidatedRouterParams, handleCacheHeaders, handleCors, isCorsOriginAllowed, isError, isEvent, isEventHandler, isMethod, isPreflightRequest, isStream, isWebResponse, lazyEventHandler, parseCookies, promisifyNodeListener, proxyRequest, readBody, readFormData, readMultipartFormData, readRawBody, readValidatedBody, removeResponseHeader, sanitizeStatusCode, sanitizeStatusMessage, sealSession, send, sendError, sendIterable, sendNoContent, sendProxy, sendRedirect, sendStream, sendWebResponse, serveStatic, setCookie, setHeader, setHeaders, setResponseHeader, setResponseHeaders, setResponseStatus, splitCookiesString, toEventHandler, toNodeListener, toPlainHandler, toWebHandler, toWebRequest, unsealSession, updateSession, useBase, useSession, writeEarlyHints } from 'h3';
export { useDatabase } from 'nitropack/runtime/internal/database';
export { AGENT_MAX_STEPS, runBriefing, runNewsAgent } from '/Users/mahaoxuan/Desktop/newsnow-yi/server/utils/agent-runner';
export { decodeBase64URL, encodeBase64URL, decodeBase64, encodeBase64 } from '/Users/mahaoxuan/Desktop/newsnow-yi/server/utils/base64';
export { collectCachedSeeds } from '/Users/mahaoxuan/Desktop/newsnow-yi/server/utils/briefing';
export { md5, myCrypto } from '/Users/mahaoxuan/Desktop/newsnow-yi/server/utils/crypto';
export { getDatabase } from '/Users/mahaoxuan/Desktop/newsnow-yi/server/utils/database';
export { tranformToUTC, parseDate, parseRelativeDate } from '/Users/mahaoxuan/Desktop/newsnow-yi/server/utils/date';
export { myFetch } from '/Users/mahaoxuan/Desktop/newsnow-yi/server/utils/fetch';
export { logger } from '/Users/mahaoxuan/Desktop/newsnow-yi/server/utils/logger';
export { neonHttpConnector } from '/Users/mahaoxuan/Desktop/newsnow-yi/server/utils/neon-connector';
export { listSourceBriefs, resolveSourceId, fetchSourceItems, searchNews, createNewsTools, newsTools, newsToolNames } from '/Users/mahaoxuan/Desktop/newsnow-yi/server/utils/news-tools';
export { defineForeignSource } from '/Users/mahaoxuan/Desktop/newsnow-yi/server/utils/proxy';
export { rss2json } from '/Users/mahaoxuan/Desktop/newsnow-yi/server/utils/rss2json';
export { getDisabledSources, assertSourceEnabled } from '/Users/mahaoxuan/Desktop/newsnow-yi/server/utils/source-health';
export { defineSource, defineRSSSource, defineRSSHubSource, proxySource } from '/Users/mahaoxuan/Desktop/newsnow-yi/server/utils/source';
export { runDueTrackers } from '/Users/mahaoxuan/Desktop/newsnow-yi/server/utils/tracker-runner';
export { getLLMProviders, anthropicMessagesBaseUrl, getLLMConfig, callLLM, summarizeSteps, trimHistoryForPrompt, trimAgentHistory } from '/Users/mahaoxuan/Desktop/newsnow-yi/shared/agent';
export { Brand } from '/Users/mahaoxuan/Desktop/newsnow-yi/shared/brand';
export { TTL, Interval, Homepage, Version, Author } from '/Users/mahaoxuan/Desktop/newsnow-yi/shared/consts';
export { projectDir } from '/Users/mahaoxuan/Desktop/newsnow-yi/shared/dir';
export { parseMarkdownLite, parseInline } from '/Users/mahaoxuan/Desktop/newsnow-yi/shared/markdown';
export { columns, fixedColumnIds, hiddenColumns, metadata } from '/Users/mahaoxuan/Desktop/newsnow-yi/shared/metadata';
export { tokenizeQuery, scoreText, searchNewsItems } from '/Users/mahaoxuan/Desktop/newsnow-yi/shared/news-search';
export { originSources, genSources } from '/Users/mahaoxuan/Desktop/newsnow-yi/shared/pre-sources';
export { disabledSources, credentialSources, resolveDisabledSources } from '/Users/mahaoxuan/Desktop/newsnow-yi/shared/source-health';
export { default as sources } from '/Users/mahaoxuan/Desktop/newsnow-yi/shared/sources';
export { TRACKER_DEFAULT_INTERVAL_MS, TRACKER_MIN_INTERVAL_MS, clampInterval } from '/Users/mahaoxuan/Desktop/newsnow-yi/shared/tracker';
export { typeSafeObjectFromEntries, typeSafeObjectEntries, typeSafeObjectValues } from '/Users/mahaoxuan/Desktop/newsnow-yi/shared/type.util';
export { relativeTime, delay, randomUUID, randomItem } from '/Users/mahaoxuan/Desktop/newsnow-yi/shared/utils';
export { verifyPrimitiveMetadata } from '/Users/mahaoxuan/Desktop/newsnow-yi/shared/verify';