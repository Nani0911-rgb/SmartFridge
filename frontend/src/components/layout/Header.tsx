import { Link } from 'react-router'
import { Bell, Menu, UserRound } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { buttonStyles } from '@/components/ui/buttonStyles'
import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/features/auth/useAuth'

interface HeaderProps {
  title?: string
  isMenuOpen: boolean
  onMenuClick: () => void
}

export function Header({ title, isMenuOpen, onMenuClick }: HeaderProps) {
  const { user } = useAuth()

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-canvas/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:px-6 lg:px-10">
        <Button
          variant="ghost"
          size="icon"
          icon={Menu}
          onClick={onMenuClick}
          aria-label="Menü megnyitása"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav"
          className="-ml-2 lg:hidden"
        />

        <p className="truncate text-lg font-bold">{title}</p>

        <div className="ml-auto flex items-center gap-1">
          <Link
            to={ROUTES.notifications}
            aria-label="Értesítések"
            className={buttonStyles({ variant: 'ghost', size: 'icon' })}
          >
            <Bell size={20} aria-hidden="true" />
          </Link>
          <Link
            to={ROUTES.profile}
            className="group ml-1 flex items-center gap-2 rounded-full"
          >
            <span className="flex size-10 items-center justify-center rounded-full bg-peach-soft text-ink transition-colors duration-150 group-hover:bg-peach/50">
              <UserRound size={20} aria-hidden="true" />
            </span>
            <span className="sr-only">Profilom</span>
            {user && (
              <span className="hidden max-w-40 truncate pr-2 text-sm font-semibold sm:block">
                {user.username}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  )
}
