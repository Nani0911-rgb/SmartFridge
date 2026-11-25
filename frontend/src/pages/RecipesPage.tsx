import { ChefHat } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { EmptyState } from '@/components/ui/EmptyState'

export function RecipesPage() {
  return (
    <>
      <PageHeader
        title="Receptek"
        description="Böngéssz a receptek között, és nézd meg, mi hiányzik a hűtődből."
      />
      <EmptyState
        icon={ChefHat}
        title="Hamarosan elérhető"
        description="Itt jelennek majd meg a receptek kalóriatartalommal és a hiányzó hozzávalókkal."
      />
    </>
  )
}
