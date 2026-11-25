import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Card } from './Card'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description?: string
  action?: ReactNode
}

/** Üres lista vagy még el nem készült funkció jelzése. */
export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <Card padding="lg" className="flex flex-col items-center text-center">
      <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-sage-soft text-primary">
        <Icon size={26} aria-hidden="true" />
      </div>
      <h2 className="text-lg font-bold">{title}</h2>
      {description && <p className="mt-2 max-w-md text-sm text-ink-muted">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </Card>
  )
}
