import type { SourceID } from "@shared/types"

export const disabledSourceIDsAtom = atom<Set<SourceID>>(new Set())

export function useSourceHealth() {
  const setDisabledSourceIDs = useSetAtom(disabledSourceIDsAtom)

  useEffect(() => {
    let active = true

    fetch("/api/sources/health")
      .then((response) => {
        if (!response.ok) throw new Error(`源健康接口返回 ${response.status}`)
        return response.json()
      })
      .then((health: { disabled?: Record<string, unknown> }) => {
        if (active) setDisabledSourceIDs(new Set(Object.keys(health.disabled ?? {}) as SourceID[]))
      })
      .catch(() => {
        if (active) setDisabledSourceIDs(new Set())
      })

    return () => {
      active = false
    }
  }, [setDisabledSourceIDs])
}
