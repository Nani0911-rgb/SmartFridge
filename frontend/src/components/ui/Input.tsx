import { useId, type ComponentProps, type ReactNode } from 'react'
import { CircleExclamationPoint, type LucideIcon } from 'lucide-react'
import { cn } from '@/utils/cn'

export interface InputProps extends ComponentProps<'input'> {
  label: string
  /** Segítő szöveg a mező alatt. */
  hint?: string
  /** Hibaüzenet; ha meg van adva, a mező hibás állapotba kerül. */
  error?: string
  /** Opcionális ikon a mező bal oldalán. */
  icon?: LucideIcon
  /** A címke vizuális elrejtése (képernyőolvasók továbbra is felolvassák). */
  hideLabel?: boolean
  /** Jobb oldali elem a mezőn belül (pl. jelszó megjelenítése gomb). */
  endAdornment?: ReactNode
}

export function Input({
  label,
  hint,
  error,
  icon: Icon,
  hideLabel = false,
  endAdornment,
  id,
  className,
  ...props
}: InputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const messageId = `${inputId}-message`
  const message = error ?? hint

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label
        htmlFor={inputId}
        className={cn('text-sm font-semibold text-ink', hideLabel && 'sr-only')}
      >
        {label}
      </label>

      <div className="relative">
        {Icon && (
          <Icon
            size={18}
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-ink-muted"
          />
        )}
        <input
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={message ? messageId : undefined}
          className={cn(
            'h-11 w-full rounded-xl border bg-surface px-3.5 text-sm text-ink',
            'transition-colors duration-150 placeholder:text-ink-muted/60',
            'focus:ring-4 focus:outline-none disabled:cursor-not-allowed disabled:bg-canvas',
            Icon && 'pl-10',
            endAdornment ? 'pr-12' : undefined,
            error
              ? 'border-danger focus:border-danger focus:ring-danger/15'
              : 'border-line focus:border-primary focus:ring-primary/15',
          )}
          {...props}
        />
        {endAdornment && (
          <div className="absolute inset-y-0 right-1 flex items-center">{endAdornment}</div>
        )}
      </div>

      {message && (
        <p
          id={messageId}
          className={cn(
            'flex items-center gap-1.5 text-xs',
            error ? 'text-danger' : 'text-ink-muted',
          )}
        >
          {error && <CircleExclamationPoint size={14} aria-hidden="true" />}
          {message}
        </p>
      )}
    </div>
  )
}
