import type { SourceID, SourceResponse } from "@shared/types"
import { useQuery } from "@tanstack/react-query"
import { useInView } from "framer-motion"
import { forwardRef, useImperativeHandle } from "react"
import { OverlayScrollbar } from "../common/overlay-scrollbar"
import { MorphingNewsList } from "./morphing-list"
import { safeParseString } from "~/utils"

export interface ItemsProps extends React.HTMLAttributes<HTMLDivElement> {
  id: SourceID
  /**
   * 是否显示透明度，拖动时原卡片的样式
   */
  isDragging?: boolean
  setHandleRef?: (ref: HTMLElement | null) => void
}

interface NewsCardProps {
  id: SourceID
  setHandleRef?: (ref: HTMLElement | null) => void
}

export const CardWrapper = forwardRef<HTMLElement, ItemsProps>(({ id, isDragging, setHandleRef, style, ...props }, dndRef) => {
  const ref = useRef<HTMLDivElement>(null)

  const inView = useInView(ref, {
    once: true,
  })

  useImperativeHandle(dndRef, () => ref.current! as HTMLDivElement)

  return (
    <div
      ref={ref}
      className={$(
        "relative flex flex-col h-500px rounded-2xl p-4 cursor-default",
        "transition-opacity-300",
        "bg-white/55 border border-neutral-900/10 shadow-[0_1px_2px_rgba(20,16,12,0.05)] backdrop-blur-sm",
        isDragging && "op-50",
      )}
      style={{
        transformOrigin: "50% 50%",
        ...style,
      }}
      {...props}
    >
      {/* 身份色只剩这一条：卡片归属可辨，画面不再八色齐喊 */}
      <span
        aria-hidden="true"
        className={$("absolute inset-x-4 top-0 h-0.5 rounded-full opacity-80", `bg-${sources[id].color}-500`)}
      />
      {inView && <NewsCard id={id} setHandleRef={setHandleRef} />}
    </div>
  )
})

function NewsCard({ id, setHandleRef }: NewsCardProps) {
  const { refresh } = useRefetch()
  const { data, isFetching, isError } = useQuery({
    queryKey: ["source", id],
    queryFn: async ({ queryKey }) => {
      const id = queryKey[1] as SourceID
      let url = `/s?id=${id}`
      const headers: Record<string, any> = {}
      if (refetchSources.has(id)) {
        url = `/s?id=${id}&latest`
        const jwt = safeParseString(localStorage.getItem("jwt"))
        if (jwt) headers.Authorization = `Bearer ${jwt}`
        refetchSources.delete(id)
      } else if (cacheSources.has(id)) {
        // wait animation
        await delay(200)
        return cacheSources.get(id)
      }

      const response: SourceResponse = await myFetch(url, {
        headers,
      })

      function diff() {
        try {
          if (response.items && sources[id].type === "hottest" && cacheSources.has(id)) {
            response.items.forEach((item, i) => {
              const o = cacheSources.get(id)!.items.findIndex(k => k.id === item.id)
              item.extra = {
                ...item?.extra,
                diff: o === -1 ? undefined : o - i,
              }
            })
          }
        } catch (e) {
          console.error(e)
        }
      }

      diff()

      cacheSources.set(id, response)
      return response
    },
    placeholderData: prev => prev,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: false,
  })

  const { isFocused, toggleFocus } = useFocusWith(id)

  return (
    <>
      <div className={$("flex justify-between mx-2 mt-0 mb-2 items-center")}>
        <div className="flex gap-2 items-center">
          <a
            className={$("w-8 h-8 rounded-full bg-cover")}
            target="_blank"
            href={sources[id].home}
            title={sources[id].desc}
            style={{
              backgroundImage: `url(/icons/${id.split("-")[0]}.png)`,
            }}
          />
          <span className="flex flex-col">
            <span className="flex items-center gap-2">
              <span
                className="text-xl font-bold"
                title={sources[id].desc}
              >
                {sources[id].name}
              </span>
              {sources[id]?.title && <span className="rounded bg-neutral-400/10 px-1 text-sm text-neutral-600">{sources[id].title}</span>}
            </span>
            <span className="text-xs op-70"><UpdatedTime isError={isError} updatedTime={data?.updatedTime} /></span>
          </span>
        </div>
        <div className="flex gap-2 text-lg text-neutral-500">
          <button
            type="button"
            className={$("btn i-ph:arrow-counter-clockwise-duotone", isFetching && "animate-spin i-ph:circle-dashed-duotone")}
            onClick={() => refresh(id)}
          />
          <button
            type="button"
            className={$("btn", isFocused ? "i-ph:star-fill" : "i-ph:star-duotone")}
            onClick={toggleFocus}
          />
          {/* firefox cannot drag a button */}
          {setHandleRef && (
            <div
              ref={setHandleRef}
              className={$("btn", "i-ph:dots-six-vertical-duotone", "cursor-grab")}
            />
          )}
        </div>
      </div>

      <OverlayScrollbar
        className="h-full overflow-y-auto rounded-2xl p-2"
        options={{
          overflow: { x: "hidden" },
        }}
        defer
      >
        <div className={$("transition-opacity-300", isFetching && "op-60")}>
          {!!data?.items?.length && (
            <MorphingNewsList
              items={data.items}
              type={sources[id].type === "hottest" ? "hottest" : "realtime"}
              sourceColor={sources[id].color}
            />
          )}
          {/* 结构化骨架：只在真的加载中显示 */}
          {isFetching && !data?.items?.length && (
            <div className="flex flex-col gap-2 px-1 pt-6" aria-hidden="true">
              {[0, 1, 2, 3, 4, 5].map(i => (
                <div key={i} className="flex items-center gap-3">
                  <div className="size-7 shrink-0 rounded-lg bg-neutral-900/[0.06]" />
                  <div className="h-3 rounded-full bg-neutral-900/[0.06]" style={{ width: `${72 - i * 7}%` }} />
                </div>
              ))}
            </div>
          )}

          {/* 取不到内容时不能一直转骨架：给出原因和下一步 */}
          {!isFetching && !data?.items?.length && (
            <div className="flex flex-col items-start gap-2 px-3 pt-10">
              <p className="text-sm text-neutral-600 dark:text-neutral-300">
                {isError ? "这个源这次没取到内容。" : "这个源暂时没有条目。"}
              </p>
              <button
                type="button"
                onClick={() => refresh(id)}
                className="rounded-full bg-neutral-900/[0.06] px-3 py-1 text-xs text-neutral-700 transition-colors duration-150 hover:bg-neutral-900/[0.12]"
              >
                重试
              </button>
            </div>
          )}
        </div>
      </OverlayScrollbar>
    </>
  )
}

function UpdatedTime({ isError, updatedTime }: { updatedTime: any, isError: boolean }) {
  const relativeTime = useRelativeTime(updatedTime ?? "")
  if (relativeTime) return `${relativeTime}更新`
  if (isError) return "获取失败"
  return "加载中..."
}
