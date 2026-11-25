/** Az API réteg által dobott, felhasználónak megjeleníthető (magyar) hibaüzenetű hiba. */
export class ApiError extends Error {
  readonly code: string

  constructor(message: string, code = 'unknown') {
    super(message)
    this.name = 'ApiError'
    this.code = code
  }
}

const FALLBACK_MESSAGE = 'Váratlan hiba történt. Kérjük, próbáld újra később.'

/** Bármilyen hibából megjeleníthető magyar üzenetet készít. */
export function getErrorMessage(error: unknown): string {
  return error instanceof ApiError ? error.message : FALLBACK_MESSAGE
}
