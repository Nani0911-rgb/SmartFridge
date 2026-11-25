import { Link } from 'react-router'
import { ROUTES } from '@/constants/routes'
import { LoginForm } from '@/features/auth/components/LoginForm'

export function LoginPage() {
  return (
    <>
      <h1 className="text-2xl font-extrabold tracking-tight">Bejelentkezés</h1>
      <p className="mt-2 mb-6 text-sm text-ink-muted">Jó újra látni! Lépj be a fiókodba.</p>

      <LoginForm />

      <p className="mt-6 text-center text-sm text-ink-muted">
        Még nincs fiókod?{' '}
        <Link to={ROUTES.register} className="font-semibold text-primary hover:underline">
          Regisztrálj
        </Link>
      </p>
    </>
  )
}
