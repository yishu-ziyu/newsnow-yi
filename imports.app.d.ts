export {}
declare global {
  const $: typeof import('clsx')['clsx']
  const Author: typeof import('/Users/mahaoxuan/Desktop/vibe coding/readnew/shared/consts')['Author']
  const Homepage: typeof import('/Users/mahaoxuan/Desktop/vibe coding/readnew/shared/consts')['Homepage']
  const Interval: typeof import('/Users/mahaoxuan/Desktop/vibe coding/readnew/shared/consts')['Interval']
  const TTL: typeof import('/Users/mahaoxuan/Desktop/vibe coding/readnew/shared/consts')['TTL']
  const Timer: typeof import('/Users/mahaoxuan/Desktop/vibe coding/readnew/src/utils/index')['Timer']
  const Version: typeof import('/Users/mahaoxuan/Desktop/vibe coding/readnew/shared/consts')['Version']
  const atom: typeof import('jotai')['atom']
  const atomWithStorage: typeof import('jotai/utils')['atomWithStorage']
  const cacheSources: typeof import('/Users/mahaoxuan/Desktop/vibe coding/readnew/src/utils/data')['cacheSources']
  const columns: typeof import('/Users/mahaoxuan/Desktop/vibe coding/readnew/shared/metadata')['columns']
  const currentColumnIDAtom: typeof import('/Users/mahaoxuan/Desktop/vibe coding/readnew/src/atoms/index')['currentColumnIDAtom']
  const currentSourcesAtom: typeof import('/Users/mahaoxuan/Desktop/vibe coding/readnew/src/atoms/index')['currentSourcesAtom']
  const delay: typeof import('/Users/mahaoxuan/Desktop/vibe coding/readnew/shared/utils')['delay']
  const fixedColumnIds: typeof import('/Users/mahaoxuan/Desktop/vibe coding/readnew/shared/metadata')['fixedColumnIds']
  const focusSourcesAtom: typeof import('/Users/mahaoxuan/Desktop/vibe coding/readnew/src/atoms/index')['focusSourcesAtom']
  const genSources: typeof import('/Users/mahaoxuan/Desktop/vibe coding/readnew/shared/pre-sources')['genSources']
  const goToTopAtom: typeof import('/Users/mahaoxuan/Desktop/vibe coding/readnew/src/atoms/index')['goToTopAtom']
  const hiddenColumns: typeof import('/Users/mahaoxuan/Desktop/vibe coding/readnew/shared/metadata')['hiddenColumns']
  const isPageReload: typeof import('/Users/mahaoxuan/Desktop/vibe coding/readnew/src/hooks/useOnReload')['isPageReload']
  const isiOS: typeof import('/Users/mahaoxuan/Desktop/vibe coding/readnew/src/utils/index')['isiOS']
  const metadata: typeof import('/Users/mahaoxuan/Desktop/vibe coding/readnew/shared/metadata')['metadata']
  const myFetch: typeof import('/Users/mahaoxuan/Desktop/vibe coding/readnew/src/utils/index')['myFetch']
  const originSources: typeof import('/Users/mahaoxuan/Desktop/vibe coding/readnew/shared/pre-sources')['originSources']
  const preprocessMetadata: typeof import('/Users/mahaoxuan/Desktop/vibe coding/readnew/src/atoms/primitiveMetadataAtom')['preprocessMetadata']
  const primitiveMetadataAtom: typeof import('/Users/mahaoxuan/Desktop/vibe coding/readnew/src/atoms/primitiveMetadataAtom')['primitiveMetadataAtom']
  const projectDir: typeof import('/Users/mahaoxuan/Desktop/vibe coding/readnew/shared/dir')['projectDir']
  const randomItem: typeof import('/Users/mahaoxuan/Desktop/vibe coding/readnew/shared/utils')['randomItem']
  const randomUUID: typeof import('/Users/mahaoxuan/Desktop/vibe coding/readnew/shared/utils')['randomUUID']
  const refetchSources: typeof import('/Users/mahaoxuan/Desktop/vibe coding/readnew/src/utils/data')['refetchSources']
  const relativeTime: typeof import('/Users/mahaoxuan/Desktop/vibe coding/readnew/shared/utils')['relativeTime']
  const safeParseString: typeof import('/Users/mahaoxuan/Desktop/vibe coding/readnew/src/utils/index')['safeParseString']
  const sources: typeof import('/Users/mahaoxuan/Desktop/vibe coding/readnew/shared/sources')['default']
  const toastAtom: typeof import('/Users/mahaoxuan/Desktop/vibe coding/readnew/src/hooks/useToast')['toastAtom']
  const typeSafeObjectEntries: typeof import('/Users/mahaoxuan/Desktop/vibe coding/readnew/shared/type.util')['typeSafeObjectEntries']
  const typeSafeObjectFromEntries: typeof import('/Users/mahaoxuan/Desktop/vibe coding/readnew/shared/type.util')['typeSafeObjectFromEntries']
  const typeSafeObjectValues: typeof import('/Users/mahaoxuan/Desktop/vibe coding/readnew/shared/type.util')['typeSafeObjectValues']
  const useAtom: typeof import('jotai')['useAtom']
  const useAtomValue: typeof import('jotai')['useAtomValue']
  const useCallback: typeof import('react')['useCallback']
  const useContext: typeof import('react')['useContext']
  const useDark: typeof import('/Users/mahaoxuan/Desktop/vibe coding/readnew/src/hooks/useDark')['useDark']
  const useEffect: typeof import('react')['useEffect']
  const useEntireQuery: typeof import('/Users/mahaoxuan/Desktop/vibe coding/readnew/src/hooks/query')['useEntireQuery']
  const useFocus: typeof import('/Users/mahaoxuan/Desktop/vibe coding/readnew/src/hooks/useFocus')['useFocus']
  const useFocusWith: typeof import('/Users/mahaoxuan/Desktop/vibe coding/readnew/src/hooks/useFocus')['useFocusWith']
  const useLogin: typeof import('/Users/mahaoxuan/Desktop/vibe coding/readnew/src/hooks/useLogin')['useLogin']
  const useMemo: typeof import('react')['useMemo']
  const useOnReload: typeof import('/Users/mahaoxuan/Desktop/vibe coding/readnew/src/hooks/useOnReload')['useOnReload']
  const usePWA: typeof import('/Users/mahaoxuan/Desktop/vibe coding/readnew/src/hooks/usePWA')['usePWA']
  const useReducer: typeof import('react')['useReducer']
  const useRef: typeof import('react')['useRef']
  const useRefetch: typeof import('/Users/mahaoxuan/Desktop/vibe coding/readnew/src/hooks/useRefetch')['useRefetch']
  const useRelativeTime: typeof import('/Users/mahaoxuan/Desktop/vibe coding/readnew/src/hooks/useRelativeTime')['useRelativeTime']
  const useSearchBar: typeof import('/Users/mahaoxuan/Desktop/vibe coding/readnew/src/hooks/useSearch')['useSearchBar']
  const useSetAtom: typeof import('jotai')['useSetAtom']
  const useState: typeof import('react')['useState']
  const useSync: typeof import('/Users/mahaoxuan/Desktop/vibe coding/readnew/src/hooks/useSync')['useSync']
  const useToast: typeof import('/Users/mahaoxuan/Desktop/vibe coding/readnew/src/hooks/useToast')['useToast']
  const useUpdateQuery: typeof import('/Users/mahaoxuan/Desktop/vibe coding/readnew/src/hooks/query')['useUpdateQuery']
  const verifyPrimitiveMetadata: typeof import('/Users/mahaoxuan/Desktop/vibe coding/readnew/shared/verify')['verifyPrimitiveMetadata']
}
// for type re-export
declare global {
  // @ts-ignore
  export type { OmitNever, UnionToIntersection, MaybePromise } from '/Users/mahaoxuan/Desktop/vibe coding/readnew/shared/type.util'
  import('/Users/mahaoxuan/Desktop/vibe coding/readnew/shared/type.util')
  // @ts-ignore
  export type { Color, SourceID, AllSourceID, ColumnID, Metadata, PrimitiveMetadata, FixedColumnID, HiddenColumnID, OriginSource, Source, Column, NewsItem, SourceResponse } from '/Users/mahaoxuan/Desktop/vibe coding/readnew/shared/types'
  import('/Users/mahaoxuan/Desktop/vibe coding/readnew/shared/types')
  // @ts-ignore
  export type { Timer } from '/Users/mahaoxuan/Desktop/vibe coding/readnew/src/utils/index'
  import('/Users/mahaoxuan/Desktop/vibe coding/readnew/src/utils/index')
  // @ts-ignore
  export type { Update, ToastItem } from '/Users/mahaoxuan/Desktop/vibe coding/readnew/src/atoms/types'
  import('/Users/mahaoxuan/Desktop/vibe coding/readnew/src/atoms/types')
}