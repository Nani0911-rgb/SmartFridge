/** Mezőnkénti hibaüzenetek egy űrlaphoz. */
export type FieldErrors<T> = Partial<Record<keyof T, string>>
