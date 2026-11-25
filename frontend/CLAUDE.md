# SmartFridge – Frontend

A SmartFridge többfelhasználós okoshűtő webalkalmazás frontendje. Háromfős csapat dolgozik rajta:
egy fejlesztő a frontendért, kettő a backendért és az adatbázisért felel.

## Technológiák

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS v4 (`@tailwindcss/vite` plugin),
  React Router, lucide-react ikonok
- **Backend:** ASP.NET Core Web API (külön csapattag fejleszti)
- **Adatbázis:** PostgreSQL (külön csapattag fejleszti)
- **Futtatás:** Docker Compose
- **Verziókezelés:** GitHub

## Az alkalmazás követelményei

- Teljesen **magyar nyelvű** felület (minden felirat, hibaüzenet, dátum- és számformátum).
- Többfelhasználós működés: regisztráció és bejelentkezés.
- Saját hűtő tartalmának nyilvántartása.
- Élelmiszerek hozzáadása, módosítása és törlése.
- Mennyiségek és lejárati dátumok kezelése.
- Mértékegységek: **kg, g, dkg, liter, dl, cl**.
- Receptek böngészése.
- Receptekhez hiányzó hozzávalók kiszámítása.
- Hiányzó hozzávalók hozzáadása a bevásárlólistához.
- Receptek kalóriatartalmának megjelenítése.
- Lejárati értesítések kezelése és elvetése.
- **Nem** szükséges statisztikai felület.

## Fejlesztési szabályok

- Kizárólag a `frontend` mappában dolgozz.
- Ne módosítsd a backend vagy az adatbázis fájljait.
- Ne hozz létre saját backendet.
- Amíg nincs kész a backend, használj mintaadatokat (`src/mocks`).
- A kód legyen átlátható, moduláris és könnyen karbantartható.
- A felület legyen modern és reszponzív (mobil-első megközelítés).
- Ne végezz automatikus Git commitot vagy push-t.
- Minden módosítás után röviden magyarázd el magyarul, mit csináltál.
- Lépésenként haladunk: csak az aktuálisan kért feladatot valósítsd meg.

## Parancsok

```bash
npm run dev      # fejlesztői szerver
npm run build    # típusellenőrzés (tsc -b) + éles build
npm run lint     # ESLint
npm run preview  # az éles build előnézete
```

Minden módosítás után ellenőrizd, hogy a `npm run build` és a `npm run lint` hibamentesen lefut.

## Mappaszerkezet

```
src/
├── api/            # HTTP kliens és backend végpontok hívásai (később a mock helyett)
├── assets/         # képek, ikonok, statikus fájlok
├── components/
│   ├── ui/         # általános, újrahasznosítható UI elemek (gomb, input, modal, kártya)
│   └── layout/     # oldalváz elemei (fejléc, navigáció, lábléc)
├── constants/      # állandók (pl. mértékegységek listája, útvonalnevek)
├── features/       # funkciónkénti modulok (saját komponensek, hookok, logika)
│   ├── auth/           # regisztráció, bejelentkezés
│   ├── fridge/         # hűtő tartalma, élelmiszerek CRUD
│   ├── recipes/        # receptek, hiányzó hozzávalók, kalória
│   ├── shopping-list/  # bevásárlólista
│   └── notifications/  # lejárati értesítések
├── hooks/          # közös, funkciófüggetlen React hookok
├── layouts/        # oldalelrendezések (pl. bejelentkezett felhasználó elrendezése)
├── mocks/          # mintaadatok, amíg a backend nem készül el
├── pages/          # útvonalakhoz tartozó oldal-komponensek (vékonyak, a features-t használják)
├── routes/         # útvonal-definíciók, védett útvonalak
├── types/          # közös TypeScript típusok (backend DTO-k tükre)
├── utils/          # tiszta segédfüggvények (dátum, mértékegység-átváltás, formázás)
├── main.tsx        # belépési pont (RouterProvider)
└── index.css       # Tailwind import és globális stílusok
```

## Konvenciók

- Import alias: `@/` → `src/` (pl. `import { Button } from '@/components/ui/Button'`).
- Komponensfájlok PascalCase névvel (`FoodItemCard.tsx`), hookok `use` előtaggal (`useFridgeItems.ts`).
- Stílusozás Tailwind utility osztályokkal; egyedi témaértékek az `index.css` `@theme` blokkjában.
- Feltételes osztálynevekhez a `cn()` segédfüggvényt használd (`@/utils/cn`).
- Komponensfájlból csak komponenst exportálj (React Fast Refresh); a nem komponens
  exportok (pl. `buttonStyles`) külön `.ts` fájlba kerüljenek.
- Az adatelérés mindig az `api/` rétegen keresztül történjen, hogy a mintaadatok később
  egy helyen cserélhetők legyenek a valódi backend hívásokra.
- A backend és a frontend közötti adatszerkezeteket a `types/` mappában tartsd egyeztetve a backend csapattal.

## Útvonalak és navigáció

- Könyvtár: **React Router** (`react-router` csomag, adat-router API).
- Útvonalak szövegei: `src/constants/routes.ts` (`ROUTES`) – soha ne írj be kézzel útvonalszöveget.
- Útvonal-definíciók: `src/routes/routes.tsx`; a router létrehozása: `src/routes/router.ts`.
- Minden útvonal kapjon `handle: { title }` mezőt; ebből jön a fejléc és a böngészőfül címe
  (`usePageTitle` hook).
- Menüpontok: `src/constants/navigation.ts` (`MAIN_NAV_ITEMS`, `ACCOUNT_NAV_ITEMS`).
  Új oldalnál itt is vedd fel, így az asztali és a mobil menüben is megjelenik.

| Oldal          | Útvonal           | Elrendezés   |
| -------------- | ----------------- | ------------ |
| Kezdőlap       | `/`               | `AppLayout`  |
| Hűtőm          | `/hutom`          | `AppLayout`  |
| Receptek       | `/receptek`       | `AppLayout`  |
| Bevásárlólista | `/bevasarlolista` | `AppLayout`  |
| Értesítések    | `/ertesitesek`    | `AppLayout`  |
| Profilom       | `/profil`         | `AppLayout`  |
| Bejelentkezés  | `/bejelentkezes`  | `AuthLayout` |
| Regisztráció   | `/regisztracio`   | `AuthLayout` |
| 404            | `*`               | `AppLayout`  |

- `AppLayout`: bal oldali menü (`Sidebar`, `lg` felett) + fejléc + tartalom. `lg` alatt a menü
  a fejléc menügombjával nyitható oldalsó panel (`MobileNav`), Esc-re és háttérkattintásra záródik.
- `AuthLayout`: középre igazított kártya, oldalsó navigáció nélkül.

## Hitelesítés

- **Szolgáltatás:** a komponensek csak az `AuthService` interfészt ismerik (`src/types/auth.ts`).
  Az aktív implementációt az `src/api/authService.ts` választja ki – a backend elkészülte után
  **csak ezt a fájlt** kell átírni a valódi API-ra (HttpOnly sütis munkamenet javasolt).
- **Mock:** `src/mocks/mockAuthService.ts` – **kizárólag fejlesztéshez**. A felhasználók a memóriában
  élnek (új regisztráció oldal-újratöltéskor elvész), mesterséges hálózati késleltetéssel.
- **Demófiók (csak fejlesztéshez):** `demo@smartfridge.hu` / `Demo1234`. A bejelentkezési oldalon
  csak `npm run dev` alatt jelenik meg (`import.meta.env.DEV`).
- **Tárolás:** jelszót, tokent vagy személyes adatot **tilos** `localStorage`-ba/`sessionStorage`-ba írni.
  A mock csak a felhasználó azonosítóját tartja a `sessionStorage`-ban.
- **Állapot:** `AuthProvider` (`src/features/auth/AuthProvider.tsx`) + `useAuth()` hook;
  `status`: `loading` | `authenticated` | `unauthenticated`.
- **Útvonalvédelem:** `ProtectedRoute` (kijelentkezve → `/bejelentkezes`, a kért oldal megjegyzésével),
  `GuestRoute` (bejelentkezve → a kért oldal vagy a kezdőlap). Az átirányítást ezek végzik, nem az űrlapok.
- **Hibák:** az API réteg `ApiError`-t dob magyar üzenettel (`src/api/errors.ts`);
  a megjelenítéshez `getErrorMessage()`.
- **Űrlapok:** a `useForm` hook (`src/hooks/useForm.ts`) kezeli az értékeket, a mezőnkénti hibákat,
  a betöltési állapotot és a szerverhibát. A validáció tiszta függvény (`features/auth/validation.ts`),
  minden hibaüzenet magyar. Az űrlapok `noValidate` attribútummal, saját ellenőrzéssel működnek.

## Dizájnrendszer

Hangulat: **minimalista, pasztell, természetes, otthonos.**

### Színpaletta (`src/index.css` → `@theme`)

| Token               | Érték     | Tailwind osztály példa           | Használat                                   |
| ------------------- | --------- | -------------------------------- | ------------------------------------------- |
| `canvas`            | `#F7F5EF` | `bg-canvas`                      | oldalháttér                                 |
| `surface`           | `#FFFFFF` | `bg-surface`                     | kártyák, panelek, beviteli mezők            |
| `sage`              | `#A8B5A2` | `bg-sage`, `border-sage`         | díszítés, hover szegély – **szövegnek nem** |
| `sage-soft`         | `#E9EDE6` | `bg-sage-soft`                   | aktív menüpont, ikonháttér, másodlagos gomb |
| `primary`           | `#526B50` | `bg-primary`, `text-primary`     | elsődleges gombok, linkek, aktív elemek     |
| `primary-hover`     | `#435942` | `hover:bg-primary-hover`         | elsődleges gomb hover                       |
| `peach`             | `#E6B8A2` | `bg-peach`                       | kiemelés, lejáró tételek                    |
| `peach-soft`        | `#F8E9E1` | `bg-peach-soft`                  | figyelmeztető háttér, avatar                |
| `ink`               | `#303A32` | `text-ink`                       | fő szöveg                                   |
| `ink-muted`         | `#5E6A60` | `text-ink-muted`                 | másodlagos szöveg                           |
| `line`              | `#E7E3D9` | `border-line`                    | szegélyek, elválasztók                      |
| `danger` / `-soft`  | `#A65448` | `bg-danger`, `text-danger`       | hibák, törlés                               |

Ne használj nyers hex kódot vagy a Tailwind alapszíneit (`slate`, `green` stb.) – csak a fenti tokeneket.

### Szabályok

- **Betűtípus:** Nunito (Google Fonts, `index.html`), tartalék: rendszer sans-serif.
  Címek `font-extrabold`/`font-bold`, szöveg normál, címkék/gombok `font-semibold`.
- **Lekerekítés:** kártyák `rounded-2xl`, gombok és beviteli mezők `rounded-xl`, avatar `rounded-full`.
- **Árnyék:** csak `shadow-soft` (kártya, gomb) és `shadow-raised` (lebegő panel, mobil menü).
- **Térköz:** szellős elrendezés – oldaltartalom `py-8`/`lg:py-10`, kártyák között `gap-4`,
  oldalcím alatt `mb-8`. Tartalom max. szélessége `max-w-6xl`.
- **Ikonok:** kizárólag `lucide-react`. Méret: menüben 20, gombban 18 (kis gombnál 16),
  kiemelt ikon 22–26. Díszítő ikon mindig `aria-hidden="true"`; csak ikonos gombnál kötelező az `aria-label`.
- **Animáció:** csak finom színátmenet (`transition-colors duration-150`) és a betöltésjelző forgása.
  **Tilos:** színátmenetes (gradient) háttér, mozgó/ugráló animációk, transzformációs hover effektek.
- **Reszponzivitás:** mobil-első; töréspontok: `sm` (640px), `lg` (1024px – itt jelenik meg az oldalsáv),
  `xl` (1280px). Minden oldalt ellenőrizz kb. 375px szélességen is.
- **Akadálymentesség:** minden beviteli mezőnek legyen címkéje (`Input` `label` propja kötelező),
  a fókusz legyen látható (globális `:focus-visible` körvonal).

### Közös komponensek (`src/components`)

| Komponens       | Fájl                          | Leírás                                                                 |
| --------------- | ----------------------------- | ---------------------------------------------------------------------- |
| `Button`        | `ui/Button.tsx`               | `variant`: primary, secondary, accent, ghost, danger; `size`: sm, md, lg, icon; `icon`, `isLoading`, `fullWidth` |
| `buttonStyles`  | `ui/buttonStyles.ts`          | gombstílus linkekhez (`<Link className={buttonStyles()}>`)             |
| `Card`, `CardHeader` | `ui/Card.tsx`            | fehér, lekerekített doboz; `padding`: none, sm, md, lg                 |
| `Input`         | `ui/Input.tsx`                | címke, `hint`, `error`, bal oldali `icon`, akadálymentes hibaüzenet    |
| `EmptyState`    | `ui/EmptyState.tsx`           | üres lista / még el nem készült funkció jelzése                        |
| `PasswordInput` | `ui/PasswordInput.tsx`        | jelszómező megjelenítés/elrejtés gombbal                               |
| `Alert`         | `ui/Alert.tsx`                | üzenetdoboz (`error`, `info`)                                          |
| `FullPageLoader`| `ui/FullPageLoader.tsx`       | teljes képernyős betöltésjelző                                         |
| `PageHeader`    | `layout/PageHeader.tsx`       | oldalcím, leírás, jobb oldali műveletek                                |
| `Sidebar`, `MobileNav`, `NavMenu`, `Header`, `Logo` | `layout/` | oldalváz elemei                                   |

Új UI elem előtt nézd meg, hogy a meglévő komponensekből összerakható-e.
