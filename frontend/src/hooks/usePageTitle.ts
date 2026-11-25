import { useEffect } from 'react'
import { useMatches } from 'react-router'
import type { RouteHandle } from '@/types/route'

const APP_NAME = 'SmartFridge'

/**
 * Visszaadja az aktuális útvonal címét (a route `handle.title` mezőjéből),
 * és beállítja a böngészőfül címét is.
 */
export function usePageTitle(): string | undefined {
  const matches = useMatches()

  const title = [...matches]
    .reverse()
    .map((match) => (match.handle as RouteHandle | undefined)?.title)
    .find(Boolean)

  useEffect(() => {
    document.title = title ? `${title} – ${APP_NAME}` : APP_NAME
  }, [title])

  return title
}
