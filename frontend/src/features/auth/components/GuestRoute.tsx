import { Navigate, Outlet, useLocation } from 'react-router'
import { FullPageLoader } from '@/components/ui/FullPageLoader'
import { getRedirectPath } from '../redirect'
import { useAuth } from '../useAuth'

/**
 * Bejelentkezés és regisztráció: csak kijelentkezett felhasználónak.
 * Sikeres belépés után innen történik az átirányítás az eredetileg kért oldalra.
 */
export function GuestRoute() {
  const { status } = useAuth()
  const location = useLocation()

  if (status === 'loading') return <FullPageLoader />

  if (status === 'authenticated') {
    return <Navigate to={getRedirectPath(location.state)} replace />
  }

  return <Outlet />
}
