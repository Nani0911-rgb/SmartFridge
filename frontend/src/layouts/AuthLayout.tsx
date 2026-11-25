import { Outlet } from 'react-router'
import { Logo } from '@/components/layout/Logo'
import { Card } from '@/components/ui/Card'
import { usePageTitle } from '@/hooks/usePageTitle'

/** Bejelentkezés és regisztráció elrendezése, oldalsó navigáció nélkül. */
export function AuthLayout() {
  usePageTitle()

  return (
    <div className="flex min-h-svh flex-col items-center justify-center px-4 py-10">
      <div className="mb-8">
        <Logo />
      </div>
      <main className="w-full max-w-md">
        <Card padding="lg">
          <Outlet />
        </Card>
      </main>
      <p className="mt-8 text-center text-sm text-ink-muted">
        Okos hűtő – kevesebb pazarlás, több főzés.
      </p>
    </div>
  )
}
