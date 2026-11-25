import { useState } from 'react'
import { LoaderCircle, LogOut } from 'lucide-react'
import { useAuth } from '../useAuth'

interface LogoutButtonProps {
  className?: string
  /** Kattintáskor hívódik (pl. a mobil menü bezárásához). */
  onClick?: () => void
}

/** Kijelentkezés; utána a ProtectedRoute a bejelentkezési oldalra irányít. */
export function LogoutButton({ className, onClick }: LogoutButtonProps) {
  const { logout } = useAuth()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleClick = async () => {
    setIsLoggingOut(true)
    try {
      await logout()
      onClick?.()
    } finally {
      setIsLoggingOut(false)
    }
  }

  const Icon = isLoggingOut ? LoaderCircle : LogOut

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isLoggingOut}
      aria-busy={isLoggingOut || undefined}
      className={className}
    >
      <Icon size={20} className={isLoggingOut ? 'animate-spin' : undefined} aria-hidden="true" />
      {isLoggingOut ? 'Kijelentkezés…' : 'Kijelentkezés'}
    </button>
  )
}
