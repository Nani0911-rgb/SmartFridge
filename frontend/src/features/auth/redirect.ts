import type { Location } from 'react-router'
import { ROUTES } from '@/constants/routes'

/** A védett útvonal által a bejelentkezési oldalnak átadott állapot. */
export interface RedirectState {
  from?: Location
}

/** Bejelentkezés után ide térünk vissza: az eredetileg kért oldalra, vagy a kezdőlapra. */
export function getRedirectPath(state: unknown): string {
  const from = (state as RedirectState | null)?.from
  if (!from || from.pathname === ROUTES.login || from.pathname === ROUTES.register) {
    return ROUTES.home
  }
  return `${from.pathname}${from.search}${from.hash}`
}
