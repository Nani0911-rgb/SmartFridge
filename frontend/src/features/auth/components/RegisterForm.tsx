import { Mail, UserPlus, UserRound } from 'lucide-react'
import { Alert } from '@/components/ui/Alert'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { PasswordInput } from '@/components/ui/PasswordInput'
import { useForm } from '@/hooks/useForm'
import { useAuth } from '../useAuth'
import { PASSWORD_MIN_LENGTH, validateRegister, type RegisterFormValues } from '../validation'

const initialValues: RegisterFormValues = {
  username: '',
  email: '',
  password: '',
  passwordConfirm: '',
}

export function RegisterForm() {
  const { register } = useAuth()
  const { values, errors, isSubmitting, submitError, handleChange, handleSubmit } = useForm({
    initialValues,
    validate: validateRegister,
    // Sikeres regisztráció után a felhasználó be is van jelentkezve; a GuestRoute irányít tovább.
    onSubmit: ({ username, email, password }) => register({ username, email, password }),
  })

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      {submitError && <Alert variant="error">{submitError}</Alert>}

      <Input
        label="Felhasználónév"
        name="username"
        autoComplete="username"
        placeholder="pl. kovacs.anna"
        icon={UserRound}
        value={values.username}
        onChange={handleChange}
        error={errors.username}
        disabled={isSubmitting}
        required
      />
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
        autoComplete="new-password"
        placeholder="••••••••"
        hint={`Legalább ${PASSWORD_MIN_LENGTH} karakter, betűvel és számmal.`}
        value={values.password}
        onChange={handleChange}
        error={errors.password}
        disabled={isSubmitting}
        required
      />
      <PasswordInput
        label="Jelszó megerősítése"
        name="passwordConfirm"
        autoComplete="new-password"
        placeholder="••••••••"
        value={values.passwordConfirm}
        onChange={handleChange}
        error={errors.passwordConfirm}
        disabled={isSubmitting}
        required
      />

      <Button type="submit" size="lg" icon={UserPlus} fullWidth isLoading={isSubmitting} className="mt-2">
        {isSubmitting ? 'Regisztráció…' : 'Regisztráció'}
      </Button>
    </form>
  )
}
