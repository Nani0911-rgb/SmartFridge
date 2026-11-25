import { mockAuthService } from '@/mocks/mockAuthService'
import type { AuthService } from '@/types/auth'

/**
 * Az alkalmazás által használt hitelesítési szolgáltatás.
 *
 * TODO: Ha elkészül az ASP.NET Core auth API, ide kell bekötni a valódi implementációt
 * (pl. `httpAuthService`, amely HttpOnly sütis munkamenetet használ). Más fájlt nem kell módosítani,
 * mert minden komponens az `AuthService` interfészen keresztül éri el.
 */
export const authService: AuthService = mockAuthService
