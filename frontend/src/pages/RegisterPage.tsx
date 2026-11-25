import { Link } from 'react-router'
import { ROUTES } from '@/constants/routes'
import { RegisterForm } from '@/features/auth/components/RegisterForm'

export function RegisterPage() {
  return (
    <>
      <h1 className="text-2xl font-extrabold tracking-tight">Regisztráció</h1>
      <p className="mt-2 mb-6 text-sm text-ink-muted">
        Hozd létre a fiókodat, és tartsd rendben a hűtődet.
      </p>

      <RegisterForm />

      <p className="mt-6 text-center text-sm text-ink-muted">
        Már van fiókod?{' '}
        <Link to={ROUTES.login} className="font-semibold text-primary hover:underline">
          Jelentkezz be
        </Link>
      </p>
    </>
  )
}
