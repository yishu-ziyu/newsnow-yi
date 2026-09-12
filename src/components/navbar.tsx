import { fixedColumnIds, metadata } from "@shared/metadata"
import { Link } from "@tanstack/react-router"
import { currentColumnIDAtom } from "~/atoms"
import { layoutModeAtom } from "~/atoms/layout-mode"

const viewModes = [{ id: "list", label: "列表" }, { id: "grid", label: "网格" }] as const

export function NavBar() {
  const currentId = useAtomValue(currentColumnIDAtom)
  const [layoutMode, setLayoutMode] = useAtom(layoutModeAtom)
  const { toggle } = useSearchBar()
  return (
    <span className={$([
      "flex p-3 rounded-2xl bg-primary/1 text-sm",
      "shadow shadow-primary/20 hover:shadow-primary/50 transition-shadow-500",
    ])}
    >
      <button
        type="button"
        onClick={() => toggle(true)}
        className={$(
          "px-2 hover:(bg-primary/10 rounded-md) op-70 dark:op-90",
          "cursor-pointer transition-all",
        )}
      >
        更多
      </button>
      {fixedColumnIds.map(columnId => (
        <Link
          key={columnId}
          to="/c/$column"
          params={{ column: columnId }}
          className={$(
            "px-2 hover:(bg-primary/10 rounded-md) cursor-pointer transition-all",
            currentId === columnId ? "color-primary-700 dark:color-primary-300 font-bold" : "op-70 dark:op-90",
          )}
        >
          {metadata[columnId].name}
        </Link>
      ))}
      <span className="mx-1 h-4 w-px self-center bg-primary/25" aria-hidden="true" />
      <span className="flex" role="group" aria-label="视图切换">
        {viewModes.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            title={`视图：${label}`}
            aria-pressed={layoutMode === id}
            onClick={() => setLayoutMode(id)}
            className={$(
              "px-2 hover:(bg-primary/10 rounded-md) cursor-pointer transition-all",
              layoutMode === id ? "color-primary font-bold" : "op-70 dark:op-90",
            )}
          >
            {label}
          </button>
        ))}
      </span>
    </span>
  )
}
