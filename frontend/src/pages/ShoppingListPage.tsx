import { ShoppingCart } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { EmptyState } from '@/components/ui/EmptyState'

export function ShoppingListPage() {
  return (
    <>
      <PageHeader title="Bevásárlólista" description="Amit legközelebb meg kell venned." />
      <EmptyState
        icon={ShoppingCart}
        title="Hamarosan elérhető"
        description="Ide kerülnek majd a receptekből hiányzó hozzávalók."
      />
    </>
  )
}
