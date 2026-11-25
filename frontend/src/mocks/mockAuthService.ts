/**
 * ⚠️ CSAK FEJLESZTÉSHEZ – MOCK HITELESÍTÉS ⚠️
 *
 * Valódi backend nélkül szimulálja a bejelentkezést és a regisztrációt.
 * - A felhasználók csak a memóriában élnek: az új regisztrációk oldalfrissítéskor elvesznek.
 * - Jelszó és token NEM kerül böngészőtárolóba. A sessionStorage-ban csak a felhasználó
 *   azonosítója van (a fül bezárásakor törlődik), hogy frissítés után ne kelljen újra belépni.
 * - Éles környezetben a `src/api/authService.ts` a valódi API-implementációt fogja használni.
 */
import { ApiError } from '@/api/errors'
import type { AuthService, LoginCredentials, RegisterData, User } from '@/types/auth'

/** Demófiók – kizárólag fejlesztési és tesztelési célra. */
export const DEMO_ACCOUNT = {
  username: 'demo',
  email: 'demo@smartfridge.hu',
  password: 'Demo1234',
} as const

interface MockUserRecord extends User {
  password: string
}

const SESSION_KEY = 'smartfridge:mock-session-user-id'
const NETWORK_DELAY_MS = 700

const users: MockUserRecord[] = [{ id: 'demo-user', ...DEMO_ACCOUNT }]

const delay = (ms = NETWORK_DELAY_MS) => new Promise<void>((resolve) => setTimeout(resolve, ms))

const normalizeEmail = (email: string) => email.trim().toLowerCase()

const toPublicUser = (record: MockUserRecord): User => ({
  id: record.id,
  username: record.username,
  email: record.email,
})

const session = {
  read(): string | null {
    try {
      return sessionStorage.getItem(SESSION_KEY)
    } catch {
      return null
    }
  },
  write(userId: string) {
    try {
      sessionStorage.setItem(SESSION_KEY, userId)
    } catch {
      // A tároló nem elérhető (pl. privát mód) – a munkamenet csak a memóriában marad.
    }
  },
  clear() {
    try {
      sessionStorage.removeItem(SESSION_KEY)
    } catch {
      // Nincs teendő.
    }
  },
}

export const mockAuthService: AuthService = {
  async login({ email, password }: LoginCredentials) {
    await delay()

    const user = users.find((u) => u.email === normalizeEmail(email))
    if (!user || user.password !== password) {
      throw new ApiError('Hibás e-mail-cím vagy jelszó.', 'invalid_credentials')
    }

    session.write(user.id)
    return toPublicUser(user)
  },

  async register({ username, email, password }: RegisterData) {
    await delay()

    const normalizedEmail = normalizeEmail(email)
    const trimmedUsername = username.trim()

    if (users.some((u) => u.email === normalizedEmail)) {
      throw new ApiError('Ezzel az e-mail-címmel már regisztráltak.', 'email_taken')
    }
    if (users.some((u) => u.username.toLowerCase() === trimmedUsername.toLowerCase())) {
      throw new ApiError('Ez a felhasználónév már foglalt.', 'username_taken')
    }

    const user: MockUserRecord = {
      id: crypto.randomUUID(),
      username: trimmedUsername,
      email: normalizedEmail,
      password,
    }
    users.push(user)

    session.write(user.id)
    return toPublicUser(user)
  },

  async logout() {
    await delay(300)
    session.clear()
  },

  async getCurrentUser() {
    await delay(300)

    const userId = session.read()
    const user = userId ? users.find((u) => u.id === userId) : undefined
    if (!user) {
      session.clear()
      return null
    }
    return toPublicUser(user)
  },
}
