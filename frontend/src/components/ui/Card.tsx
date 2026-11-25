import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@/utils/cn'

type CardPadding = 'none' | 'sm' | 'md' | 'lg'

const paddings: Record<CardPadding, string> = {
  none: '',
  sm: 'p-4',
  md: 'p-5 sm:p-6',
  lg: 'p-6 sm:p-8',
}

interface CardProps extends ComponentProps<'div'> {
  padding?: CardPadding
}

/** Fehér, lekerekített, finom árnyékú tartalomdoboz. */
export function Card({ padding = 'md', className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-line/70 bg-surface shadow-soft',
        paddings[padding],
        className,
      )}
      {...props}
    />
  )
}

interface CardHeaderProps {
  title: ReactNode
  description?: ReactNode
  /** Jobb oldalra igazított elem, pl. gomb. */
  action?: ReactNode
  className?: string
}

export function CardHeader({ title, description, action, className }: CardHeaderProps) {
  return (
    <div className={cn('mb-4 flex items-start justify-between gap-4', className)}>
      <div className="min-w-0">
        <h2 className="text-lg font-bold text-ink">{title}</h2>
        {description && <p className="mt-1 text-sm text-ink-muted">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
