import { Link } from 'react-router'
import { Compass } from 'lucide-react'
import { EmptyState } from '@/components/ui/EmptyState'
import { buttonStyles } from '@/components/ui/buttonStyles'
import { ROUTES } from '@/constants/routes'

export function NotFoundPage() {
  return (
    <EmptyState
      icon={Compass}
      title="Az oldal nem található"
      description="A keresett oldal nem létezik, vagy áthelyezték."
      action={
        <Link to={ROUTES.home} className={buttonStyles()}>
          Vissza a kezdőlapra
        </Link>
      }
    />
  )
}
