import { useContext } from 'react'
import { AuthContext, type AuthContextValue } from './authContext'

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('A useAuth hook csak AuthProvider-en belül használható.')
  }
  return context
}
