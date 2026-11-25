import { Plus, Refrigerator } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'

export function FridgePage() {
  return (
    <>
      <PageHeader
        title="Hűtőm"
        description="A hűtődben lévő élelmiszerek, mennyiségek és lejárati dátumok."
        actions={
          <Button icon={Plus} disabled>
            Új élelmiszer
          </Button>
        }
      />
      <EmptyState
        icon={Refrigerator}
        title="Hamarosan elérhető"
        description="Itt fogod tudni hozzáadni, módosítani és törölni a hűtődben lévő élelmiszereket."
      />
    </>
  )
}
