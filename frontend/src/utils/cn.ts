/** Feltételes CSS osztálynevek összefűzése (a hamis értékeket kihagyja). */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ')
}
