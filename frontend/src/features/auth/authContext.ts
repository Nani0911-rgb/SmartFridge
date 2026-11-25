import { createContext } from 'react'
import type { AuthStatus, LoginCredentials, RegisterData, User } from '@/types/auth'

export interface AuthContextValue {
  user: User | null
  status: AuthStatus
  login: (credentials: LoginCredentials) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)
