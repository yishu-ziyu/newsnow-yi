export {}
declare global {
  const $: typeof import('clsx')['clsx']
  const Author: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/shared/consts')['Author']
  const Brand: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/shared/brand')['Brand']
  const Homepage: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/shared/consts')['Homepage']
  const Interval: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/shared/consts')['Interval']
  const TRACKER_DEFAULT_INTERVAL_MS: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/shared/tracker')['TRACKER_DEFAULT_INTERVAL_MS']
  const TRACKER_MIN_INTERVAL_MS: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/shared/tracker')['TRACKER_MIN_INTERVAL_MS']
  const TTL: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/shared/consts')['TTL']
  const Timer: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/src/utils/index')['Timer']
  const Version: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/shared/consts')['Version']
  const addAssistantMessage: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/src/atoms/agent-panel')['addAssistantMessage']
  const addUserMessage: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/src/atoms/agent-panel')['addUserMessage']
  const agentPanelActionsAtom: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/src/atoms/agent-panel')['agentPanelActionsAtom']
  const agentPanelAtom: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/src/atoms/agent-panel')['agentPanelAtom']
  const anthropicMessagesBaseUrl: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/shared/agent')['anthropicMessagesBaseUrl']
  const atom: typeof import('jotai')['atom']
  const atomWithStorage: typeof import('jotai/utils')['atomWithStorage']
  const cacheSources: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/src/utils/data')['cacheSources']
  const callLLM: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/shared/agent')['callLLM']
  const clampInterval: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/shared/tracker')['clampInterval']
  const clearAgentMessages: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/src/atoms/agent-panel')['clearAgentMessages']
  const closeAgentPanel: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/src/atoms/agent-panel')['closeAgentPanel']
  const columns: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/shared/metadata')['columns']
  const compareSelectionActionsAtom: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/src/atoms/compare-selection')['compareSelectionActionsAtom']
  const compareSelectionAtom: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/src/atoms/compare-selection')['compareSelectionAtom']
  const createTracker: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/src/hooks/useTrackers')['createTracker']
  const credentialSources: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/shared/source-health')['credentialSources']
  const currentColumnIDAtom: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/src/atoms/index')['currentColumnIDAtom']
  const currentSourcesAtom: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/src/atoms/index')['currentSourcesAtom']
  const delay: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/shared/utils')['delay']
  const disabledSourceIDsAtom: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/src/atoms/source-health')['disabledSourceIDsAtom']
  const disabledSources: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/shared/source-health')['disabledSources']
  const fixedColumnIds: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/shared/metadata')['fixedColumnIds']
  const focusSourcesAtom: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/src/atoms/index')['focusSourcesAtom']
  const genSources: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/shared/pre-sources')['genSources']
  const getLLMConfig: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/shared/agent')['getLLMConfig']
  const getLLMProviders: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/shared/agent')['getLLMProviders']
  const goToTopAtom: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/src/atoms/index')['goToTopAtom']
  const hiddenColumns: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/shared/metadata')['hiddenColumns']
  const isPageReload: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/src/hooks/useOnReload')['isPageReload']
  const isiOS: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/src/utils/index')['isiOS']
  const itemKey: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/src/atoms/compare-selection')['itemKey']
  const layoutModeAtom: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/src/atoms/layout-mode')['layoutModeAtom']
  const loadAgentHistory: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/src/hooks/useAgentHistory')['loadAgentHistory']
  const loadTrackers: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/src/hooks/useTrackers')['loadTrackers']
  const metadata: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/shared/metadata')['metadata']
  const myFetch: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/src/utils/index')['myFetch']
  const openAgentChat: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/src/atoms/agent-panel')['openAgentChat']
  const openAgentPanel: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/src/atoms/agent-panel')['openAgentPanel']
  const openComparePanel: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/src/atoms/agent-panel')['openComparePanel']
  const originSources: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/shared/pre-sources')['originSources']
  const parseInline: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/shared/markdown')['parseInline']
  const parseMarkdownLite: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/shared/markdown')['parseMarkdownLite']
  const preprocessMetadata: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/src/atoms/primitiveMetadataAtom')['preprocessMetadata']
  const primitiveMetadataAtom: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/src/atoms/primitiveMetadataAtom')['primitiveMetadataAtom']
  const projectDir: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/shared/dir')['projectDir']
  const randomItem: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/shared/utils')['randomItem']
  const randomUUID: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/shared/utils')['randomUUID']
  const refetchSources: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/src/utils/data')['refetchSources']
  const relativeTime: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/shared/utils')['relativeTime']
  const removeTracker: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/src/hooks/useTrackers')['removeTracker']
  const resolveDisabledSources: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/shared/source-health')['resolveDisabledSources']
  const safeParseString: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/src/utils/index')['safeParseString']
  const saveAgentHistory: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/src/hooks/useAgentHistory')['saveAgentHistory']
  const scoreText: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/shared/news-search')['scoreText']
  const searchNewsItems: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/shared/news-search')['searchNewsItems']
  const setAgentLoading: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/src/atoms/agent-panel')['setAgentLoading']
  const setAgentMessages: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/src/atoms/agent-panel')['setAgentMessages']
  const sources: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/shared/sources')['default']
  const summarizeSteps: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/shared/agent')['summarizeSteps']
  const toastAtom: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/src/hooks/useToast')['toastAtom']
  const tokenizeQuery: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/shared/news-search')['tokenizeQuery']
  const trimAgentHistory: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/shared/agent')['trimAgentHistory']
  const trimHistoryForPrompt: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/shared/agent')['trimHistoryForPrompt']
  const typeSafeObjectEntries: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/shared/type.util')['typeSafeObjectEntries']
  const typeSafeObjectFromEntries: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/shared/type.util')['typeSafeObjectFromEntries']
  const typeSafeObjectValues: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/shared/type.util')['typeSafeObjectValues']
  const useAtom: typeof import('jotai')['useAtom']
  const useAtomValue: typeof import('jotai')['useAtomValue']
  const useCallback: typeof import('react')['useCallback']
  const useContext: typeof import('react')['useContext']
  const useDark: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/src/hooks/useDark')['useDark']
  const useEffect: typeof import('react')['useEffect']
  const useEntireQuery: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/src/hooks/query')['useEntireQuery']
  const useFocus: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/src/hooks/useFocus')['useFocus']
  const useFocusWith: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/src/hooks/useFocus')['useFocusWith']
  const useLogin: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/src/hooks/useLogin')['useLogin']
  const useMemo: typeof import('react')['useMemo']
  const useOnReload: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/src/hooks/useOnReload')['useOnReload']
  const usePWA: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/src/hooks/usePWA')['usePWA']
  const useReducer: typeof import('react')['useReducer']
  const useRef: typeof import('react')['useRef']
  const useRefetch: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/src/hooks/useRefetch')['useRefetch']
  const useRelativeTime: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/src/hooks/useRelativeTime')['useRelativeTime']
  const useSearchBar: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/src/hooks/useSearch')['useSearchBar']
  const useSetAtom: typeof import('jotai')['useSetAtom']
  const useSourceHealth: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/src/atoms/source-health')['useSourceHealth']
  const useState: typeof import('react')['useState']
  const useSync: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/src/hooks/useSync')['useSync']
  const useToast: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/src/hooks/useToast')['useToast']
  const useUpdateQuery: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/src/hooks/query')['useUpdateQuery']
  const verifyPrimitiveMetadata: typeof import('/Users/mahaoxuan/Desktop/newsnow-yi/shared/verify')['verifyPrimitiveMetadata']
}
// for type re-export
declare global {
  // @ts-ignore
  export type { TrackersState, BriefingRecordWithSteps } from '/Users/mahaoxuan/Desktop/newsnow-yi/src/hooks/useTrackers'
  import('/Users/mahaoxuan/Desktop/newsnow-yi/src/hooks/useTrackers')
  // @ts-ignore
  export type { LLMProvider, LLMConfig, ChatTurn, ChatRequest, AgentStep, ChatResponse, BriefingRequest, AgentChatMessage, AgentHistoryResponse, BriefingResponse } from '/Users/mahaoxuan/Desktop/newsnow-yi/shared/agent'
  import('/Users/mahaoxuan/Desktop/newsnow-yi/shared/agent')
  // @ts-ignore
  export type { MarkdownBlock, InlineSegment } from '/Users/mahaoxuan/Desktop/newsnow-yi/shared/markdown'
  import('/Users/mahaoxuan/Desktop/newsnow-yi/shared/markdown')
  // @ts-ignore
  export type { SearchableNewsItem, ScoredNewsItem } from '/Users/mahaoxuan/Desktop/newsnow-yi/shared/news-search'
  import('/Users/mahaoxuan/Desktop/newsnow-yi/shared/news-search')
  // @ts-ignore
  export type { DisabledKind, DisabledInfo } from '/Users/mahaoxuan/Desktop/newsnow-yi/shared/source-health'
  import('/Users/mahaoxuan/Desktop/newsnow-yi/shared/source-health')
  // @ts-ignore
  export type { TrackerRecord, BriefingRecord } from '/Users/mahaoxuan/Desktop/newsnow-yi/shared/tracker'
  import('/Users/mahaoxuan/Desktop/newsnow-yi/shared/tracker')
  // @ts-ignore
  export type { OmitNever, UnionToIntersection, MaybePromise } from '/Users/mahaoxuan/Desktop/newsnow-yi/shared/type.util'
  import('/Users/mahaoxuan/Desktop/newsnow-yi/shared/type.util')
  // @ts-ignore
  export type { Color, SourceID, AllSourceID, ColumnID, Metadata, PrimitiveMetadata, FixedColumnID, HiddenColumnID, OriginSource, Source, Column, NewsItem, SourceResponse } from '/Users/mahaoxuan/Desktop/newsnow-yi/shared/types'
  import('/Users/mahaoxuan/Desktop/newsnow-yi/shared/types')
  // @ts-ignore
  export type { Timer } from '/Users/mahaoxuan/Desktop/newsnow-yi/src/utils/index'
  import('/Users/mahaoxuan/Desktop/newsnow-yi/src/utils/index')
  // @ts-ignore
  export type { ChatMessage, AssistantMeta, AgentPanelState } from '/Users/mahaoxuan/Desktop/newsnow-yi/src/atoms/agent-panel'
  import('/Users/mahaoxuan/Desktop/newsnow-yi/src/atoms/agent-panel')
  // @ts-ignore
  export type { CompareSelectionAction } from '/Users/mahaoxuan/Desktop/newsnow-yi/src/atoms/compare-selection'
  import('/Users/mahaoxuan/Desktop/newsnow-yi/src/atoms/compare-selection')
  // @ts-ignore
  export type { LayoutMode } from '/Users/mahaoxuan/Desktop/newsnow-yi/src/atoms/layout-mode'
  import('/Users/mahaoxuan/Desktop/newsnow-yi/src/atoms/layout-mode')
  // @ts-ignore
  export type { Update, ToastItem } from '/Users/mahaoxuan/Desktop/newsnow-yi/src/atoms/types'
  import('/Users/mahaoxuan/Desktop/newsnow-yi/src/atoms/types')
}