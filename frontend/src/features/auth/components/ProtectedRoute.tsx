import { Navigate, Outlet, useLocation } from 'react-router'
import { FullPageLoader } from '@/components/ui/FullPageLoader'
import { ROUTES } from '@/constants/routes'
import type { RedirectState } from '../redirect'
import { useAuth } from '../useAuth'

/** Csak bejelentkezett felhasználó láthatja; egyébként a bejelentkezési oldalra irányít. */
export function ProtectedRoute() {
  const { status } = useAuth()
  const location = useLocation()

  if (status === 'loading') return <FullPageLoader />

  if (status === 'unauthenticated') {
    const state: RedirectState = { from: location }
    return <Navigate to={ROUTES.login} replace state={state} />
  }

  return <Outlet />
}
