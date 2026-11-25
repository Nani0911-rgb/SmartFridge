import type { FieldErrors } from '@/types/form'
import { isBlank, isValidEmail } from '@/utils/validation'

export interface LoginFormValues {
  email: string
  password: string
}

export interface RegisterFormValues {
  username: string
  email: string
  password: string
  passwordConfirm: string
}

export const PASSWORD_MIN_LENGTH = 8
const USERNAME_MIN_LENGTH = 3
const USERNAME_MAX_LENGTH = 30
const USERNAME_PATTERN = /^[\p{L}\d._-]+$/u

function validateEmail(email: string): string | undefined {
  if (isBlank(email)) return 'Add meg az e-mail-címedet.'
  if (!isValidEmail(email)) return 'Adj meg érvényes e-mail-címet (pl. pelda@email.hu).'
  return undefined
}

function validateUsername(username: string): string | undefined {
  const value = username.trim()
  if (!value) return 'Add meg a felhasználóneved.'
  if (value.length < USERNAME_MIN_LENGTH || value.length > USERNAME_MAX_LENGTH) {
    return `A felhasználónév ${USERNAME_MIN_LENGTH}–${USERNAME_MAX_LENGTH} karakter hosszú lehet.`
  }
  if (!USERNAME_PATTERN.test(value)) {
    return 'A felhasználónév csak betűket, számokat, pontot, kötőjelet és aláhúzást tartalmazhat.'
  }
  return undefined
}

function validateNewPassword(password: string): string | undefined {
  if (!password) return 'Add meg a jelszót.'
  if (password.length < PASSWORD_MIN_LENGTH) {
    return `A jelszónak legalább ${PASSWORD_MIN_LENGTH} karakterből kell állnia.`
  }
  if (!/\p{L}/u.test(password) || !/\d/.test(password)) {
    return 'A jelszónak betűt és számot is tartalmaznia kell.'
  }
  return undefined
}

/** Csak a hibás mezők kerülnek a visszaadott objektumba (a mezők sorrendjében). */
function compact<T>(errors: Record<keyof T, string | undefined>): FieldErrors<T> {
  return Object.fromEntries(
    Object.entries(errors).filter(([, message]) => message !== undefined),
  ) as FieldErrors<T>
}

export function validateLogin(values: LoginFormValues): FieldErrors<LoginFormValues> {
  return compact<LoginFormValues>({
    email: validateEmail(values.email),
    password: values.password ? undefined : 'Add meg a jelszavadat.',
  })
}

export function validateRegister(values: RegisterFormValues): FieldErrors<RegisterFormValues> {
  let passwordConfirm: string | undefined
  if (!values.passwordConfirm) passwordConfirm = 'Erősítsd meg a jelszót.'
  else if (values.passwordConfirm !== values.password) passwordConfirm = 'A két jelszó nem egyezik.'

  return compact<RegisterFormValues>({
    username: validateUsername(values.username),
    email: validateEmail(values.email),
    password: validateNewPassword(values.password),
    passwordConfirm,
  })
}
