import { Link } from "@tanstack/react-router"
import { useIsFetching } from "@tanstack/react-query"
import type { SourceID } from "@shared/types"
import { clsx } from "clsx"
import { NavBar } from "../navbar"
import { Menu } from "./menu"
import { currentSourcesAtom, goToTopAtom } from "~/atoms"
import { agentPanelActionsAtom } from "~/atoms/agent-panel"

function GoTop() {
  const { ok, fn: goToTop } = useAtomValue(goToTopAtom)
  return (
    <button
      type="button"
      title="Go To Top"
      className={clsx("i-ph:arrow-fat-up-duotone", ok ? "op-50 btn" : "op-0")}
      onClick={goToTop}
    />
  )
}

function Github() {
  return (
    <button type="button" title="Github" className="i-ph:github-logo-duotone btn" onClick={() => window.open(Homepage)} />
  )
}

function Login() {
  const { enableLogin, loggedIn, login } = useLogin()
  if (!enableLogin || loggedIn) return null
  return (
    <button
      type="button"
      title="GitHub 登录"
      aria-label="GitHub 登录"
      className="btn flex items-center gap-1 text-sm font-medium"
      onClick={login}
    >
      <span className="i-ph:sign-in-duotone text-xl" />
      <span>登录</span>
    </button>
  )
}

function Refresh() {
  const currentSources = useAtomValue(currentSourcesAtom)
  const { refresh } = useRefetch()
  const refreshAll = useCallback(() => refresh(...currentSources), [refresh, currentSources])

  const isFetching = useIsFetching({
    predicate: (query) => {
      const [type, id] = query.queryKey as ["source" | "entire", SourceID]
      return (type === "source" && currentSources.includes(id)) || type === "entire"
    },
  })

  return (
    <button
      type="button"
      title="Refresh"
      className={clsx("i-ph:arrow-counter-clockwise-duotone btn", isFetching && "animate-spin i-ph:circle-dashed-duotone")}
      onClick={refreshAll}
    />
  )
}

export function Header() {
  const setAgentPanel = useSetAtom(agentPanelActionsAtom)

  const openAgent = () => {
    setAgentPanel({ type: "open_chat" })
  }

  return (
    <>
      <span className="flex justify-self-start">
        <Link to="/" className="flex gap-2 items-center">
          <div className="h-10 w-10 bg-cover" title="logo" style={{ backgroundImage: "url(/icon.svg)" }} />
          <span className="text-2xl font-serif-heading font-bold line-height-none! tracking-wide">
            <p>{Brand.wordmark[0]}</p>
            <p className="mt--1">
              <span className="color-primary-6">{Brand.wordmark[1]?.slice(0, 1)}</span>
              <span>{Brand.wordmark[1]?.slice(1)}</span>
            </p>
          </span>
        </Link>
        <a target="_blank" href={`${Brand.repo}/releases`} className="btn text-sm ml-1 font-mono">
          {`v${Version}`}
        </a>
      </span>
      <span className="justify-self-center">
        <span className="hidden md:(inline-block)">
          <NavBar />
        </span>
      </span>
      <span className="justify-self-end flex gap-2 items-center text-xl text-primary-600 dark:text-primary-400">
        <button
          type="button"
          title="Agent 助手"
          className={clsx("text-lg cursor-pointer transition-all hover:op85")}
          onClick={openAgent}
        >
          ✦
        </button>
        <GoTop />
        <Refresh />
        <Github />
        <Login />
        <Menu />
      </span>
    </>
  )
}
