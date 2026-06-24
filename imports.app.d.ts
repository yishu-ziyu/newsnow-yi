export {}
declare global {
  const $: typeof import('clsx')['clsx']
  const Author: typeof import('/Users/mahaoxuan/Developer/newsnow-yi/shared/consts')['Author']
  const Homepage: typeof import('/Users/mahaoxuan/Developer/newsnow-yi/shared/consts')['Homepage']
  const Interval: typeof import('/Users/mahaoxuan/Developer/newsnow-yi/shared/consts')['Interval']
  const TTL: typeof import('/Users/mahaoxuan/Developer/newsnow-yi/shared/consts')['TTL']
  const Timer: typeof import('/Users/mahaoxuan/Developer/newsnow-yi/src/utils/index')['Timer']
  const Version: typeof import('/Users/mahaoxuan/Developer/newsnow-yi/shared/consts')['Version']
  const addAssistantMessage: typeof import('/Users/mahaoxuan/Developer/newsnow-yi/src/atoms/agent-panel')['addAssistantMessage']
  const addUserMessage: typeof import('/Users/mahaoxuan/Developer/newsnow-yi/src/atoms/agent-panel')['addUserMessage']
  const agentPanelActionsAtom: typeof import('/Users/mahaoxuan/Developer/newsnow-yi/src/atoms/agent-panel')['agentPanelActionsAtom']
  const agentPanelAtom: typeof import('/Users/mahaoxuan/Developer/newsnow-yi/src/atoms/agent-panel')['agentPanelAtom']
  const atom: typeof import('jotai')['atom']
  const atomWithStorage: typeof import('jotai/utils')['atomWithStorage']
  const cacheSources: typeof import('/Users/mahaoxuan/Developer/newsnow-yi/src/utils/data')['cacheSources']
  const callLLM: typeof import('/Users/mahaoxuan/Developer/newsnow-yi/shared/agent')['callLLM']
  const clearAgentMessages: typeof import('/Users/mahaoxuan/Developer/newsnow-yi/src/atoms/agent-panel')['clearAgentMessages']
  const closeAgentPanel: typeof import('/Users/mahaoxuan/Developer/newsnow-yi/src/atoms/agent-panel')['closeAgentPanel']
  const columns: typeof import('/Users/mahaoxuan/Developer/newsnow-yi/shared/metadata')['columns']
  const currentColumnIDAtom: typeof import('/Users/mahaoxuan/Developer/newsnow-yi/src/atoms/index')['currentColumnIDAtom']
  const currentSourcesAtom: typeof import('/Users/mahaoxuan/Developer/newsnow-yi/src/atoms/index')['currentSourcesAtom']
  const delay: typeof import('/Users/mahaoxuan/Developer/newsnow-yi/shared/utils')['delay']
  const fixedColumnIds: typeof import('/Users/mahaoxuan/Developer/newsnow-yi/shared/metadata')['fixedColumnIds']
  const focusSourcesAtom: typeof import('/Users/mahaoxuan/Developer/newsnow-yi/src/atoms/index')['focusSourcesAtom']
  const genSources: typeof import('/Users/mahaoxuan/Developer/newsnow-yi/shared/pre-sources')['genSources']
  const getLLMConfig: typeof import('/Users/mahaoxuan/Developer/newsnow-yi/shared/agent')['getLLMConfig']
  const getLLMProviders: typeof import('/Users/mahaoxuan/Developer/newsnow-yi/shared/agent')['getLLMProviders']
  const goToTopAtom: typeof import('/Users/mahaoxuan/Developer/newsnow-yi/src/atoms/index')['goToTopAtom']
  const hiddenColumns: typeof import('/Users/mahaoxuan/Developer/newsnow-yi/shared/metadata')['hiddenColumns']
  const isPageReload: typeof import('/Users/mahaoxuan/Developer/newsnow-yi/src/hooks/useOnReload')['isPageReload']
  const isiOS: typeof import('/Users/mahaoxuan/Developer/newsnow-yi/src/utils/index')['isiOS']
  const metadata: typeof import('/Users/mahaoxuan/Developer/newsnow-yi/shared/metadata')['metadata']
  const myFetch: typeof import('/Users/mahaoxuan/Developer/newsnow-yi/src/utils/index')['myFetch']
  const openAgentChat: typeof import('/Users/mahaoxuan/Developer/newsnow-yi/src/atoms/agent-panel')['openAgentChat']
  const openAgentPanel: typeof import('/Users/mahaoxuan/Developer/newsnow-yi/src/atoms/agent-panel')['openAgentPanel']
  const originSources: typeof import('/Users/mahaoxuan/Developer/newsnow-yi/shared/pre-sources')['originSources']
  const preprocessMetadata: typeof import('/Users/mahaoxuan/Developer/newsnow-yi/src/atoms/primitiveMetadataAtom')['preprocessMetadata']
  const primitiveMetadataAtom: typeof import('/Users/mahaoxuan/Developer/newsnow-yi/src/atoms/primitiveMetadataAtom')['primitiveMetadataAtom']
  const projectDir: typeof import('/Users/mahaoxuan/Developer/newsnow-yi/shared/dir')['projectDir']
  const randomItem: typeof import('/Users/mahaoxuan/Developer/newsnow-yi/shared/utils')['randomItem']
  const randomUUID: typeof import('/Users/mahaoxuan/Developer/newsnow-yi/shared/utils')['randomUUID']
  const refetchSources: typeof import('/Users/mahaoxuan/Developer/newsnow-yi/src/utils/data')['refetchSources']
  const relativeTime: typeof import('/Users/mahaoxuan/Developer/newsnow-yi/shared/utils')['relativeTime']
  const safeParseString: typeof import('/Users/mahaoxuan/Developer/newsnow-yi/src/utils/index')['safeParseString']
  const setAgentLoading: typeof import('/Users/mahaoxuan/Developer/newsnow-yi/src/atoms/agent-panel')['setAgentLoading']
  const setAgentMessages: typeof import('/Users/mahaoxuan/Developer/newsnow-yi/src/atoms/agent-panel')['setAgentMessages']
  const sources: typeof import('/Users/mahaoxuan/Developer/newsnow-yi/shared/sources')['default']
  const toastAtom: typeof import('/Users/mahaoxuan/Developer/newsnow-yi/src/hooks/useToast')['toastAtom']
  const typeSafeObjectEntries: typeof import('/Users/mahaoxuan/Developer/newsnow-yi/shared/type.util')['typeSafeObjectEntries']
  const typeSafeObjectFromEntries: typeof import('/Users/mahaoxuan/Developer/newsnow-yi/shared/type.util')['typeSafeObjectFromEntries']
  const typeSafeObjectValues: typeof import('/Users/mahaoxuan/Developer/newsnow-yi/shared/type.util')['typeSafeObjectValues']
  const useAtom: typeof import('jotai')['useAtom']
  const useAtomValue: typeof import('jotai')['useAtomValue']
  const useCallback: typeof import('react')['useCallback']
  const useContext: typeof import('react')['useContext']
  const useDark: typeof import('/Users/mahaoxuan/Developer/newsnow-yi/src/hooks/useDark')['useDark']
  const useEffect: typeof import('react')['useEffect']
  const useEntireQuery: typeof import('/Users/mahaoxuan/Developer/newsnow-yi/src/hooks/query')['useEntireQuery']
  const useFocus: typeof import('/Users/mahaoxuan/Developer/newsnow-yi/src/hooks/useFocus')['useFocus']
  const useFocusWith: typeof import('/Users/mahaoxuan/Developer/newsnow-yi/src/hooks/useFocus')['useFocusWith']
  const useLogin: typeof import('/Users/mahaoxuan/Developer/newsnow-yi/src/hooks/useLogin')['useLogin']
  const useMemo: typeof import('react')['useMemo']
  const useOnReload: typeof import('/Users/mahaoxuan/Developer/newsnow-yi/src/hooks/useOnReload')['useOnReload']
  const usePWA: typeof import('/Users/mahaoxuan/Developer/newsnow-yi/src/hooks/usePWA')['usePWA']
  const useReducer: typeof import('react')['useReducer']
  const useRef: typeof import('react')['useRef']
  const useRefetch: typeof import('/Users/mahaoxuan/Developer/newsnow-yi/src/hooks/useRefetch')['useRefetch']
  const useRelativeTime: typeof import('/Users/mahaoxuan/Developer/newsnow-yi/src/hooks/useRelativeTime')['useRelativeTime']
  const useSearchBar: typeof import('/Users/mahaoxuan/Developer/newsnow-yi/src/hooks/useSearch')['useSearchBar']
  const useSetAtom: typeof import('jotai')['useSetAtom']
  const useState: typeof import('react')['useState']
  const useSync: typeof import('/Users/mahaoxuan/Developer/newsnow-yi/src/hooks/useSync')['useSync']
  const useToast: typeof import('/Users/mahaoxuan/Developer/newsnow-yi/src/hooks/useToast')['useToast']
  const useUpdateQuery: typeof import('/Users/mahaoxuan/Developer/newsnow-yi/src/hooks/query')['useUpdateQuery']
  const verifyPrimitiveMetadata: typeof import('/Users/mahaoxuan/Developer/newsnow-yi/shared/verify')['verifyPrimitiveMetadata']
}
// for type re-export
declare global {
  // @ts-ignore
  export type { LLMProvider, LLMConfig, ChatRequest, ChatResponse, BriefingRequest, BriefingResponse } from '/Users/mahaoxuan/Developer/newsnow-yi/shared/agent'
  import('/Users/mahaoxuan/Developer/newsnow-yi/shared/agent')
  // @ts-ignore
  export type { OmitNever, UnionToIntersection, MaybePromise } from '/Users/mahaoxuan/Developer/newsnow-yi/shared/type.util'
  import('/Users/mahaoxuan/Developer/newsnow-yi/shared/type.util')
  // @ts-ignore
  export type { Color, SourceID, AllSourceID, ColumnID, Metadata, PrimitiveMetadata, FixedColumnID, HiddenColumnID, OriginSource, Source, Column, NewsItem, SourceResponse } from '/Users/mahaoxuan/Developer/newsnow-yi/shared/types'
  import('/Users/mahaoxuan/Developer/newsnow-yi/shared/types')
  // @ts-ignore
  export type { Timer } from '/Users/mahaoxuan/Developer/newsnow-yi/src/utils/index'
  import('/Users/mahaoxuan/Developer/newsnow-yi/src/utils/index')
  // @ts-ignore
  export type { ChatMessage, AgentPanelState } from '/Users/mahaoxuan/Developer/newsnow-yi/src/atoms/agent-panel'
  import('/Users/mahaoxuan/Developer/newsnow-yi/src/atoms/agent-panel')
  // @ts-ignore
  export type { Update, ToastItem } from '/Users/mahaoxuan/Developer/newsnow-yi/src/atoms/types'
  import('/Users/mahaoxuan/Developer/newsnow-yi/src/atoms/types')
}