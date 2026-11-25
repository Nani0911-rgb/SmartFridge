import { Bell } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { EmptyState } from '@/components/ui/EmptyState'

export function NotificationsPage() {
  return (
    <>
      <PageHeader title="Értesítések" description="Figyelmeztetések a hamarosan lejáró élelmiszerekről." />
      <EmptyState
        icon={Bell}
        title="Hamarosan elérhető"
        description="Itt fogod látni és elvetni a lejárati értesítéseket."
      />
    </>
  )
}
