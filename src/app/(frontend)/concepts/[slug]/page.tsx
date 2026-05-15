import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import FAQAccordion from '@/components/FAQAccordion'
import DisclaimerBlock from '@/components/DisclaimerBlock'
import Breadcrumbs from '@/components/Breadcrumbs'
import { getConceptBySlug, formatPriceRange, formatCurrency } from '@/lib/payload'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const concept = await getConceptBySlug(slug).catch(() => null)
  if (!concept) return {}

  const cat = typeof concept.category === 'object' && concept.category
    ? (concept.category as { name: string }).name
    : undefined

  return {
    title: `${concept.name} Business Concept${cat ? ` — ${cat}` : ''} | The Business Barn`,
    description: concept.shortDescription,
  }
}

export default async function ConceptDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const c = await getConceptBySlug(slug).catch(() => null)
  if (!c) notFound()

  const cat = typeof c.category === 'object' && c.category
    ? (c.category as { name: string; slug: string })
    : null

  const badge =
    c.territoryStatus === 'available'
      ? { label: 'Territories Available', cls: 'bg-field-50 text-field-600 border-field-200' }
      : c.territoryStatus === 'limited'
      ? { label: 'Limited Availability', cls: 'bg-harvest-100 text-harvest-700 border-harvest-300' }
      : { label: 'Sold Out', cls: 'bg-ink-100 text-ink-500 border-ink-200' }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: c.name,
    description: c.shortDescription,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'CAD',
      price: c.startupCostMin,
      priceSpecification: {
        '@type': 'PriceSpecification',
        minPrice: c.startupCostMin,
        maxPrice: c.startupCostMax,
        priceCurrency: 'CAD',
      },
      availability:
        c.territoryStatus === 'available'
          ? 'https://schema.org/InStock'
          : 'https://schema.org/LimitedAvailability',
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="bg-ink-900 text-white py-12 lg:py-16">
        <div className="site-container">
          <Breadcrumbs
            crumbs={[
              { label: 'Business Concepts', href: '/concepts' },
              ...(cat ? [{ label: cat.name, href: `/concepts?category=${cat.slug}` }] : []),
              { label: c.name },
            ]}
          />
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {cat && (
              <span className="label-pill bg-harvest-400/20 text-harvest-300 text-[11px]">
                {cat.name}
              </span>
            )}
            <span className={`label-pill border text-[11px] ${badge.cls}`}>{badge.label}</span>
          </div>
          <h1 className="font-serif text-4xl font-bold mb-3">{c.name}</h1>
          <p className="text-base text-ink-300 max-w-2xl">{c.shortDescription}</p>
        </div>
      </section>

      {/* Body */}
      <section className="bg-cream py-12 lg:py-16">
        <div className="site-container">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-10">

              {/* Disclaimer */}
              <DisclaimerBlock />

              {/* Business type & model */}
              {(c.businessType || c.revenueModel) && (
                <div>
                  <h2 className="font-serif text-xl font-bold text-ink-900 mb-4">What is this concept?</h2>
                  <p className="text-sm text-ink-600 leading-relaxed mb-3">{c.businessType}</p>
                  {c.revenueModel && (
                    <p className="text-sm text-ink-600 leading-relaxed">{c.revenueModel}</p>
                  )}
                </div>
              )}

              {/* Customer profile */}
              {c.customerProfile && (
                <div>
                  <h2 className="font-serif text-xl font-bold text-ink-900 mb-3">Customer profile</h2>
                  <p className="text-sm text-ink-600 leading-relaxed">{c.customerProfile}</p>
                </div>
              )}

              {/* Ideal locations */}
              {c.idealLocations && (
                <div>
                  <h2 className="font-serif text-xl font-bold text-ink-900 mb-3">Ideal location types</h2>
                  <p className="text-sm text-ink-600 leading-relaxed">{c.idealLocations}</p>
                </div>
              )}

              {/* Startup requirements */}
              {Array.isArray(c.startupRequirements) && c.startupRequirements.length > 0 && (
                <div>
                  <h2 className="font-serif text-xl font-bold text-ink-900 mb-4">
                    What you need to get started
                  </h2>
                  <ul className="space-y-2">
                    {c.startupRequirements.map((r: { item: string }, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-ink-600">
                        <span className="text-barn-600 font-bold mt-0.5">→</span>
                        {r.item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Included materials */}
              {Array.isArray(c.includedMaterials) && c.includedMaterials.length > 0 && (
                <div>
                  <h2 className="font-serif text-xl font-bold text-ink-900 mb-4">
                    Included materials
                  </h2>
                  <ul className="space-y-2">
                    {c.includedMaterials.map((m: { item: string }, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-ink-600">
                        <span className="text-field-600 font-bold mt-0.5">✓</span>
                        {m.item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Operator fit */}
              {Array.isArray(c.founderFit) && c.founderFit.length > 0 && (
                <div>
                  <h2 className="font-serif text-xl font-bold text-ink-900 mb-4">Operator fit</h2>
                  <ul className="space-y-2">
                    {c.founderFit.map((f: { trait: string }, i: number) => (
                      <li key={i} className="text-sm text-ink-600 flex items-start gap-3">
                        <span className="text-harvest-600 mt-0.5">✦</span>
                        {f.trait}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Risks */}
              {Array.isArray(c.risks) && c.risks.length > 0 && (
                <div>
                  <h2 className="font-serif text-xl font-bold text-ink-900 mb-4">
                    Risks and assumptions to watch
                  </h2>
                  <ul className="space-y-2">
                    {c.risks.map((r: { risk: string }, i: number) => (
                      <li key={i} className="text-sm text-ink-600 flex items-start gap-3">
                        <span className="text-barn-600 mt-0.5">!</span>
                        {r.risk}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div>
              <div className="sticky top-24 card p-6 space-y-5">
                <h2 className="font-serif text-lg font-bold text-ink-900">At a glance</h2>

                <Stat label="Startup cost" value={formatPriceRange(c.startupCostMin, c.startupCostMax)} />
                {c.estimatedMonthlyRevenueMin && c.estimatedMonthlyRevenueMax && (
                  <Stat
                    label="Monthly revenue (illus.)"
                    value={`${formatPriceRange(c.estimatedMonthlyRevenueMin, c.estimatedMonthlyRevenueMax)}/mo`}
                    note="Illustrative only — not a guarantee"
                  />
                )}
                {c.grossMarginMin && c.grossMarginMax && (
                  <Stat
                    label="Gross margin (illus.)"
                    value={`${c.grossMarginMin}–${c.grossMarginMax}%`}
                  />
                )}
                {c.launchTimeline && <Stat label="Launch timeline" value={c.launchTimeline} />}
                {c.difficultyLevel && (
                  <Stat label="Difficulty" value={c.difficultyLevel.charAt(0).toUpperCase() + c.difficultyLevel.slice(1)} />
                )}
                {c.royaltyTerms && <Stat label="Royalty terms" value={c.royaltyTerms} />}

                <div className="border-t border-ink-100 pt-4 space-y-3">
                  <Link href="/book-a-call" className="btn-primary w-full justify-center">
                    Enquire about this concept
                  </Link>
                  <Link href="/concepts" className="btn-ghost text-ink-500 text-xs justify-center w-full">
                    ← Browse all concepts
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function Stat({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-400 mb-0.5">{label}</p>
      <p className="text-sm font-semibold text-ink-900">{value}</p>
      {note && <p className="text-[10px] text-ink-400 italic mt-0.5">{note}</p>}
    </div>
  )
}
