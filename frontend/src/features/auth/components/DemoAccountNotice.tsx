import { FlaskConical } from 'lucide-react'
import { DEMO_ACCOUNT } from '@/mocks/mockAuthService'

interface DemoAccountNoticeProps {
  onFill: (email: string, password: string) => void
  disabled?: boolean
}

/**
 * ⚠️ Csak fejlesztői módban (npm run dev) jelenik meg.
 * A mock hitelesítés demófiókját mutatja és egy kattintással kitölti.
 */
export function DemoAccountNotice({ onFill, disabled }: DemoAccountNoticeProps) {
  if (!import.meta.env.DEV) return null

  return (
    <div className="rounded-xl border border-dashed border-peach bg-peach-soft/60 p-3.5 text-sm">
      <p className="flex items-center gap-2 font-bold">
        <FlaskConical size={16} aria-hidden="true" />
        Demófiók – csak fejlesztéshez
      </p>
      <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5 text-ink-muted">
        <dt>E-mail:</dt>
        <dd className="font-mono text-ink">{DEMO_ACCOUNT.email}</dd>
        <dt>Jelszó:</dt>
        <dd className="font-mono text-ink">{DEMO_ACCOUNT.password}</dd>
      </dl>
      <button
        type="button"
        disabled={disabled}
        onClick={() => onFill(DEMO_ACCOUNT.email, DEMO_ACCOUNT.password)}
        className="mt-2 font-semibold text-primary hover:underline disabled:opacity-60"
      >
        Kitöltés a demóadatokkal
      </button>
    </div>
  )
}
