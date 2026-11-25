import { LogIn, Mail } from 'lucide-react'
import { Alert } from '@/components/ui/Alert'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { PasswordInput } from '@/components/ui/PasswordInput'
import { useForm } from '@/hooks/useForm'
import { useAuth } from '../useAuth'
import { validateLogin, type LoginFormValues } from '../validation'
import { DemoAccountNotice } from './DemoAccountNotice'

const initialValues: LoginFormValues = { email: '', password: '' }

export function LoginForm() {
  const { login } = useAuth()
  // Sikeres belépés után a GuestRoute irányít tovább, itt nincs teendő.
  const { values, errors, isSubmitting, submitError, handleChange, handleSubmit, setValues } =
    useForm({ initialValues, validate: validateLogin, onSubmit: login })

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      {submitError && <Alert variant="error">{submitError}</Alert>}

      <Input
        label="E-mail-cím"
        type="email"
        name="email"
        autoComplete="email"
        inputMode="email"
        placeholder="pelda@email.hu"
        icon={Mail}
        value={values.email}
        onChange={handleChange}
        error={errors.email}
        disabled={isSubmitting}
        required
      />
      <PasswordInput
        label="Jelszó"
        name="password"
        autoComplete="current-password"
        placeholder="••••••••"
        value={values.password}
        onChange={handleChange}
        error={errors.password}
        disabled={isSubmitting}
        required
      />

      <Button type="submit" size="lg" icon={LogIn} fullWidth isLoading={isSubmitting} className="mt-2">
        {isSubmitting ? 'Bejelentkezés…' : 'Bejelentkezés'}
      </Button>

      <DemoAccountNotice
        disabled={isSubmitting}
        onFill={(email, password) => setValues({ email, password })}
      />
    </form>
  )
}
