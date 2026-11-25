import { Mail, UserRound } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card, CardHeader } from '@/components/ui/Card'
import { useAuth } from '@/features/auth/useAuth'

export function ProfilePage() {
  const { user } = useAuth()

  return (
    <>
      <PageHeader title="Profilom" description="Fiókadataid és beállításaid." />

      <Card className="max-w-xl">
        <CardHeader title="Fiókadatok" description="A fiók szerkesztése később lesz elérhető." />
        <dl className="flex flex-col gap-4 text-sm">
          <div className="flex items-center gap-3">
            <UserRound size={18} className="text-ink-muted" aria-hidden="true" />
            <dt className="w-32 text-ink-muted">Felhasználónév</dt>
            <dd className="min-w-0 truncate font-semibold">{user?.username}</dd>
          </div>
          <div className="flex items-center gap-3">
            <Mail size={18} className="text-ink-muted" aria-hidden="true" />
            <dt className="w-32 text-ink-muted">E-mail-cím</dt>
            <dd className="min-w-0 truncate font-semibold">{user?.email}</dd>
          </div>
        </dl>
      </Card>
    </>
  )
}
