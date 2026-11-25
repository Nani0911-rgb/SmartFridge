import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { authService } from '@/api/authService'
import type { AuthStatus, LoginCredentials, RegisterData, User } from '@/types/auth'
import { AuthContext, type AuthContextValue } from './authContext'

/** A bejelentkezési állapot központi kezelője; az egész alkalmazást ez veszi körül. */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [status, setStatus] = useState<AuthStatus>('loading')

  const applyUser = useCallback((nextUser: User | null) => {
    setUser(nextUser)
    setStatus(nextUser ? 'authenticated' : 'unauthenticated')
  }, [])

  // Induláskor ellenőrizzük, van-e érvényes munkamenet (pl. oldalfrissítés után).
  useEffect(() => {
    let isCancelled = false
    authService
      .getCurrentUser()
      .then((currentUser) => {
        if (!isCancelled) applyUser(currentUser)
      })
      .catch(() => {
        if (!isCancelled) applyUser(null)
      })
    return () => {
      isCancelled = true
    }
  }, [applyUser])

  const login = useCallback(
    async (credentials: LoginCredentials) => applyUser(await authService.login(credentials)),
    [applyUser],
  )

  const register = useCallback(
    async (data: RegisterData) => applyUser(await authService.register(data)),
    [applyUser],
  )

  const logout = useCallback(async () => {
    try {
      await authService.logout()
    } finally {
      applyUser(null)
    }
  }, [applyUser])

  const value = useMemo<AuthContextValue>(
    () => ({ user, status, login, register, logout }),
    [user, status, login, register, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
