import { NavLink } from 'react-router'
import { ACCOUNT_NAV_ITEMS, MAIN_NAV_ITEMS, type NavItem } from '@/constants/navigation'
import { ROUTES } from '@/constants/routes'
import { LogoutButton } from '@/features/auth/components/LogoutButton'
import { cn } from '@/utils/cn'

interface NavMenuProps {
  /** Menüpontra kattintáskor hívódik (mobilon ezzel zárjuk be a menüt). */
  onNavigate?: () => void
}

const linkBase =
  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors duration-150'

function NavMenuLink({ item, onNavigate }: { item: NavItem; onNavigate?: () => void }) {
  const Icon = item.icon

  return (
    <NavLink
      to={item.path}
      end={item.path === ROUTES.home}
      onClick={onNavigate}
      className={({ isActive }) =>
        cn(
          linkBase,
          isActive
            ? 'bg-sage-soft text-primary'
            : 'text-ink-muted hover:bg-ink/5 hover:text-ink',
        )
      }
    >
      <Icon size={20} aria-hidden="true" />
      {item.label}
    </NavLink>
  )
}

/** A navigációs menü tartalma; az asztali oldalsávban és a mobil menüben is ezt használjuk. */
export function NavMenu({ onNavigate }: NavMenuProps) {
  return (
    <nav aria-label="Fő navigáció" className="flex flex-1 flex-col">
      <ul className="flex flex-col gap-1">
        {MAIN_NAV_ITEMS.map((item) => (
          <li key={item.path}>
            <NavMenuLink item={item} onNavigate={onNavigate} />
          </li>
        ))}
      </ul>

      <ul className="mt-auto flex flex-col gap-1 border-t border-line pt-4">
        {ACCOUNT_NAV_ITEMS.map((item) => (
          <li key={item.path}>
            <NavMenuLink item={item} onNavigate={onNavigate} />
          </li>
        ))}
        <li>
          <LogoutButton
            onClick={onNavigate}
            className={cn(
              linkBase,
              'w-full text-ink-muted hover:bg-ink/5 hover:text-ink disabled:cursor-wait',
            )}
          />
        </li>
      </ul>
    </nav>
  )
}
