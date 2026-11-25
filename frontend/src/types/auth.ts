/** A bejelentkezett felhasználó nyilvános adatai (jelszó soha nem kerül ide). */
export interface User {
  id: string
  username: string
  email: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  username: string
  email: string
  password: string
}

/** loading: a munkamenet ellenőrzése folyamatban (pl. oldalfrissítés után). */
export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated'

/**
 * A hitelesítési szolgáltatás szerződése.
 * A mock és a későbbi valódi (ASP.NET Core) implementációnak is ezt kell megvalósítania,
 * így a felület többi része változtatás nélkül marad a csere után.
 */
export interface AuthService {
  login(credentials: LoginCredentials): Promise<User>
  register(data: RegisterData): Promise<User>
  logout(): Promise<void>
  /** Az aktuális munkamenet felhasználója, vagy null, ha nincs bejelentkezve. */
  getCurrentUser(): Promise<User | null>
}
