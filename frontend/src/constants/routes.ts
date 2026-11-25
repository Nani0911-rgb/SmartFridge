/** Az alkalmazás összes útvonala egy helyen, hogy ne legyenek szétszórt szövegek. */
export const ROUTES = {
  home: '/',
  fridge: '/hutom',
  recipes: '/receptek',
  shoppingList: '/bevasarlolista',
  notifications: '/ertesitesek',
  profile: '/profil',
  login: '/bejelentkezes',
  register: '/regisztracio',
} as const

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES]
