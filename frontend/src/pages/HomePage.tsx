import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/Card'
import { MAIN_NAV_ITEMS } from '@/constants/navigation'
import { ROUTES } from '@/constants/routes'

const quickLinks = MAIN_NAV_ITEMS.filter((item) => item.path !== ROUTES.home)

export function HomePage() {
  return (
    <>
      <PageHeader title="Üdvözlünk!" description="Itt láthatod majd a hűtőd legfontosabb adatait." />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {quickLinks.map(({ path, label, description, icon: Icon }) => (
          <Link key={path} to={path} className="group rounded-2xl">
            <Card className="flex h-full flex-col transition-colors duration-150 group-hover:border-sage">
              <span className="mb-4 flex size-11 items-center justify-center rounded-xl bg-sage-soft text-primary">
                <Icon size={22} aria-hidden="true" />
              </span>
              <h2 className="font-bold">{label}</h2>
              <p className="mt-1 flex-1 text-sm text-ink-muted">{description}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                Megnyitás
                <ArrowRight size={16} aria-hidden="true" />
              </span>
            </Card>
          </Link>
        ))}
      </div>
    </>
  )
}
