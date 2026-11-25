# SmartFridge – Frontend

A SmartFridge többfelhasználós okoshűtő webalkalmazás frontendje. Háromfős csapat dolgozik rajta:
egy fejlesztő a frontendért, kettő a backendért és az adatbázisért felel.

## Technológiák

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS v4 (`@tailwindcss/vite` plugin)
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
├── App.tsx
├── main.tsx
└── index.css       # Tailwind import és globális stílusok
```

## Konvenciók

- Import alias: `@/` → `src/` (pl. `import { Button } from '@/components/ui/Button'`).
- Komponensfájlok PascalCase névvel (`FoodItemCard.tsx`), hookok `use` előtaggal (`useFridgeItems.ts`).
- Stílusozás Tailwind utility osztályokkal; egyedi témaértékek az `index.css` `@theme` blokkjában.
- Az adatelérés mindig az `api/` rétegen keresztül történjen, hogy a mintaadatok később
  egy helyen cserélhetők legyenek a valódi backend hívásokra.
- A backend és a frontend közötti adatszerkezeteket a `types/` mappában tartsd egyeztetve a backend csapattal.
