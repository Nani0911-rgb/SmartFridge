import type { RouteObject } from 'react-router'
import { ROUTES } from '@/constants/routes'
import { GuestRoute } from '@/features/auth/components/GuestRoute'
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute'
import { AppLayout } from '@/layouts/AppLayout'
import { AuthLayout } from '@/layouts/AuthLayout'
import { FridgePage } from '@/pages/FridgePage'
import { HomePage } from '@/pages/HomePage'
import { LoginPage } from '@/pages/LoginPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { NotificationsPage } from '@/pages/NotificationsPage'
import { ProfilePage } from '@/pages/ProfilePage'
import { RecipesPage } from '@/pages/RecipesPage'
import { RegisterPage } from '@/pages/RegisterPage'
import { ShoppingListPage } from '@/pages/ShoppingListPage'
import type { RouteHandle } from '@/types/route'

const title = (value: string): RouteHandle => ({ title: value })

/** Az alkalmazás útvonal-definíciói (a router létrehozása a router.ts-ben történik). */
export const routes: RouteObject[] = [
  {
    // Védett, bejelentkezett felület: oldalsáv + fejléc
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: ROUTES.home, element: <HomePage />, handle: title('Kezdőlap') },
          { path: ROUTES.fridge, element: <FridgePage />, handle: title('Hűtőm') },
          { path: ROUTES.recipes, element: <RecipesPage />, handle: title('Receptek') },
          { path: ROUTES.shoppingList, element: <ShoppingListPage />, handle: title('Bevásárlólista') },
          { path: ROUTES.notifications, element: <NotificationsPage />, handle: title('Értesítések') },
          { path: ROUTES.profile, element: <ProfilePage />, handle: title('Profilom') },
          { path: '*', element: <NotFoundPage />, handle: title('Az oldal nem található') },
        ],
      },
    ],
  },
  {
    // Hitelesítési felület (csak kijelentkezve): oldalsáv nélkül
    element: <GuestRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: ROUTES.login, element: <LoginPage />, handle: title('Bejelentkezés') },
          { path: ROUTES.register, element: <RegisterPage />, handle: title('Regisztráció') },
        ],
      },
    ],
  },
]
