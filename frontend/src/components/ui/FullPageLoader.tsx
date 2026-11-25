import { LoaderCircle } from 'lucide-react'

interface FullPageLoaderProps {
  label?: string
}

/** Teljes képernyős betöltésjelző (pl. a munkamenet ellenőrzése közben). */
export function FullPageLoader({ label = 'Betöltés…' }: FullPageLoaderProps) {
  return (
    <div
      role="status"
      className="flex min-h-svh flex-col items-center justify-center gap-3 text-ink-muted"
    >
      <LoaderCircle size={28} className="animate-spin text-primary" aria-hidden="true" />
      <span className="text-sm font-semibold">{label}</span>
    </div>
  )
}
