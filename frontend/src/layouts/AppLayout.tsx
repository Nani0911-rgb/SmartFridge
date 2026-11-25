import { useCallback, useState } from 'react'
import { Outlet } from 'react-router'
import { Header } from '@/components/layout/Header'
import { MobileNav } from '@/components/layout/MobileNav'
import { Sidebar } from '@/components/layout/Sidebar'
import { usePageTitle } from '@/hooks/usePageTitle'

/** Bejelentkezett felhasználó elrendezése: oldalsáv + fejléc + tartalom. */
export function AppLayout() {
  const title = usePageTitle()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const closeMenu = useCallback(() => setIsMenuOpen(false), [])

  return (
    <div className="flex min-h-svh">
      <Sidebar />
      <MobileNav open={isMenuOpen} onClose={closeMenu} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header title={title} isMenuOpen={isMenuOpen} onMenuClick={() => setIsMenuOpen(true)} />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
