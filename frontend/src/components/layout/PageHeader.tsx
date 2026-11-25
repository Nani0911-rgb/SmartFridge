import type { ReactNode } from 'react'

interface PageHeaderProps {
  title: string
  description?: string
  /** Jobb oldali műveletek, pl. „Új élelmiszer” gomb. */
  actions?: ReactNode
}

/** Az oldalak tetején megjelenő cím és leírás. */
export function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{title}</h1>
        {description && <p className="mt-2 text-ink-muted">{description}</p>}
      </div>
      {actions && <div className="flex shrink-0 gap-2">{actions}</div>}
    </div>
  )
}
