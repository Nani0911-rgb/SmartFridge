import type { ReactNode } from 'react'
import { CircleExclamationPoint, Info, type LucideIcon } from 'lucide-react'
import { cn } from '@/utils/cn'

type AlertVariant = 'error' | 'info'

const variants: Record<AlertVariant, { className: string; icon: LucideIcon }> = {
  error: { className: 'border-danger/20 bg-danger-soft text-danger', icon: CircleExclamationPoint },
  info: { className: 'border-sage/40 bg-sage-soft text-ink', icon: Info },
}

interface AlertProps {
  variant?: AlertVariant
  title?: string
  children: ReactNode
  className?: string
}

/** Rövid üzenetdoboz (pl. sikertelen bejelentkezés). */
export function Alert({ variant = 'info', title, children, className }: AlertProps) {
  const { className: variantClassName, icon: Icon } = variants[variant]

  return (
    <div
      role={variant === 'error' ? 'alert' : 'status'}
      className={cn('flex gap-3 rounded-xl border p-3.5 text-sm', variantClassName, className)}
    >
      <Icon size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
      <div className="min-w-0">
        {title && <p className="font-bold">{title}</p>}
        <div className={cn(title && 'mt-0.5')}>{children}</div>
      </div>
    </div>
  )
}
