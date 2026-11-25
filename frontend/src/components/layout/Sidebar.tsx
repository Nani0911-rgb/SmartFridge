import { Logo } from './Logo'
import { NavMenu } from './NavMenu'

/** Asztali nézetben (lg felett) állandóan látható bal oldali navigáció. */
export function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-svh w-64 shrink-0 flex-col gap-8 border-r border-line bg-surface px-4 py-6 lg:flex">
      <div className="px-2">
        <Logo />
      </div>
      <NavMenu />
    </aside>
  )
}
