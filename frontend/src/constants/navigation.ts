import {
  Bell,
  ChefHat,
  House,
  Refrigerator,
  ShoppingCart,
  UserRound,
  type LucideIcon,
} from 'lucide-react'
import { ROUTES, type AppRoute } from './routes'

export interface NavItem {
  label: string
  path: AppRoute
  icon: LucideIcon
  /** Rövid leírás (pl. a kezdőlapi gyorslinkekhez). */
  description: string
}

/** A bal oldali (és mobil) navigáció menüpontjai. */
export const MAIN_NAV_ITEMS: NavItem[] = [
  {
    label: 'Kezdőlap',
    path: ROUTES.home,
    icon: House,
    description: 'Áttekintés a hűtőd állapotáról.',
  },
  {
    label: 'Hűtőm',
    path: ROUTES.fridge,
    icon: Refrigerator,
    description: 'Élelmiszerek, mennyiségek és lejárati dátumok.',
  },
  {
    label: 'Receptek',
    path: ROUTES.recipes,
    icon: ChefHat,
    description: 'Receptek, hiányzó hozzávalók és kalóriák.',
  },
  {
    label: 'Bevásárlólista',
    path: ROUTES.shoppingList,
    icon: ShoppingCart,
    description: 'Amit legközelebb meg kell venni.',
  },
  {
    label: 'Értesítések',
    path: ROUTES.notifications,
    icon: Bell,
    description: 'Hamarosan lejáró élelmiszerek.',
  },
]

/** A navigáció alján, elkülönítve megjelenő menüpontok. */
export const ACCOUNT_NAV_ITEMS: NavItem[] = [
  {
    label: 'Profilom',
    path: ROUTES.profile,
    icon: UserRound,
    description: 'Fiókadatok és beállítások.',
  },
]
