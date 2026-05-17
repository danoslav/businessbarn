import Link from 'next/link'
import PackageCard from '@/components/PackageCard'
import { getConsultingPackages } from '@/lib/payload'

export async function HomePackagesSection() {
  const packages = await getConsultingPackages().catch(() => [])
  if (packages.length === 0) return null

  return (
    <section className="bg-cream py-14 lg:py-20">
      <div className="site-container">
        <div className="flex items-end justify-between mb-8 gap-4 flex-wrap">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-barn-600 mb-1">
              Planning packages
            </p>
            <h2 className="font-serif text-2xl font-bold text-ink-900">
              Choose the depth that fits your decision
            </h2>
          </div>
          <Link href="/consulting" className="btn-ghost text-ink-600" data-ga-cta="home_packages_compare_link">
            Compare all packages →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg, i) => (
            <PackageCard
              key={pkg.id}
              name={pkg.name}
              slug={pkg.slug}
              tagline={pkg.tagline ?? undefined}
              bestFor={
                Array.isArray(pkg.bestFor) ? pkg.bestFor.map((b: { item: string }) => b.item) : []
              }
              deliverables={
                Array.isArray(pkg.deliverables)
                  ? pkg.deliverables.map((d: { item: string }) => d.item)
                  : []
              }
              priceLabel={pkg.priceLabel ?? undefined}
              ctaLabel={pkg.ctaLabel ?? undefined}
              highlighted={i === 2}
            />
          ))}
        </div>
        <div className="mt-8 text-center">
          <p className="text-sm text-ink-400">
            Not sure which fits?{' '}
            <Link
              href="/book-a-call"
              className="text-barn-600 underline hover:text-barn-800"
              data-ga-cta="home_packages_fit_call"
            >
              Book a free 20-minute fit call →
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
