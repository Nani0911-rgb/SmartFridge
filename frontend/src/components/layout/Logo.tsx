import { Link } from 'react-router'
import { Leaf } from 'lucide-react'
import { ROUTES } from '@/constants/routes'

export function Logo() {
  return (
    <Link to={ROUTES.home} className="flex items-center gap-2.5 rounded-xl">
      <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-white">
        <Leaf size={18} aria-hidden="true" />
      </span>
      <span className="text-lg font-extrabold tracking-tight text-ink">SmartFridge</span>
    </Link>
  )
}
