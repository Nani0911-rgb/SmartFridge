import type { ComponentProps } from 'react'
import { LoaderCircle, type LucideIcon } from 'lucide-react'
import { buttonStyles, type ButtonSize, type ButtonVariant } from './buttonStyles'

interface ButtonProps extends ComponentProps<'button'> {
  variant?: ButtonVariant
  size?: ButtonSize
  /** Opcionális ikon a felirat előtt. */
  icon?: LucideIcon
  fullWidth?: boolean
  /** Betöltés közben letiltja a gombot és pörgő ikont mutat. */
  isLoading?: boolean
}

export function Button({
  variant,
  size,
  icon: Icon,
  fullWidth,
  isLoading = false,
  disabled,
  className,
  type = 'button',
  children,
  ...props
}: ButtonProps) {
  const iconSize = size === 'sm' ? 16 : 18

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      className={buttonStyles({ variant, size, fullWidth, className })}
      {...props}
    >
      {isLoading ? (
        <LoaderCircle size={iconSize} className="animate-spin" aria-hidden="true" />
      ) : (
        Icon && <Icon size={iconSize} aria-hidden="true" />
      )}
      {children}
    </button>
  )
}
