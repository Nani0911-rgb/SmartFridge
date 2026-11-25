import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Logo } from './Logo'
import { NavMenu } from './NavMenu'

interface MobileNavProps {
  open: boolean
  onClose: () => void
}

/** Mobilon (lg alatt) a fejléc menügombjával nyitható oldalsó menü. */
export function MobileNav({ open, onClose }: MobileNavProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return

    closeButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-40 lg:hidden">
      <div className="absolute inset-0 bg-ink/30" onClick={onClose} aria-hidden="true" />

      <div
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Navigációs menü"
        className="relative flex h-full w-72 max-w-[85vw] flex-col gap-8 bg-surface px-4 py-6 shadow-raised"
      >
        <div className="flex items-center justify-between px-2">
          <Logo />
          <Button
            ref={closeButtonRef}
            variant="ghost"
            size="icon"
            icon={X}
            onClick={onClose}
            aria-label="Menü bezárása"
          />
        </div>
        <NavMenu onNavigate={onClose} />
      </div>
    </div>
  )
}
