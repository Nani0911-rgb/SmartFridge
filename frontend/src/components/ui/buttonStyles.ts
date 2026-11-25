import { cn } from '@/utils/cn'

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon'

const base =
  'inline-flex items-center justify-center gap-2 rounded-xl font-semibold whitespace-nowrap ' +
  'transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-60'

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white shadow-soft hover:bg-primary-hover',
  secondary: 'bg-sage-soft text-primary hover:bg-sage/40',
  accent: 'bg-peach-soft text-ink hover:bg-peach/50',
  ghost: 'text-ink-muted hover:bg-ink/5 hover:text-ink',
  danger: 'bg-danger text-white shadow-soft hover:bg-danger/90',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
  icon: 'size-10',
}

interface ButtonStyleOptions {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  className?: string
}

/**
 * A gomb megjelenése külön függvényben, hogy linkekre (pl. <Link>) is
 * alkalmazható legyen a gombstílus.
 */
export function buttonStyles({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
}: ButtonStyleOptions = {}): string {
  return cn(base, variants[variant], sizes[size], fullWidth && 'w-full', className)
}
