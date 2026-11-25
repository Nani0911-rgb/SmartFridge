import { useState } from 'react'
import { Eye, EyeOff, Lock } from 'lucide-react'
import { Input, type InputProps } from './Input'

type PasswordInputProps = Omit<InputProps, 'type' | 'endAdornment'>

/** Jelszómező megjelenítés/elrejtés gombbal. */
export function PasswordInput({ icon = Lock, disabled, ...props }: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ToggleIcon = isVisible ? EyeOff : Eye

  return (
    <Input
      {...props}
      icon={icon}
      disabled={disabled}
      type={isVisible ? 'text' : 'password'}
      endAdornment={
        <button
          type="button"
          onClick={() => setIsVisible((visible) => !visible)}
          disabled={disabled}
          aria-label={isVisible ? 'Jelszó elrejtése' : 'Jelszó megjelenítése'}
          aria-pressed={isVisible}
          className="flex size-9 items-center justify-center rounded-lg text-ink-muted transition-colors duration-150 hover:bg-ink/5 hover:text-ink disabled:cursor-not-allowed disabled:opacity-60"
        >
          <ToggleIcon size={18} aria-hidden="true" />
        </button>
      }
    />
  )
}
