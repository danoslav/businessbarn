import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getConceptBySlug, getConcepts, formatPriceRange } from '@/lib/payload'

export const dynamic = 'force-dynamic'
import DisclaimerBlock from '@/components/DisclaimerBlock'
import LeadForm from '@/components/LeadForm'
import ConceptCard from '@/components/ConceptCard'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const concept = await getConceptBySlug(slug)
  if (!concept) return { title: 'Concept Not Found' }
  const title = `${concept.name} | Business Opportunity in B.C.`
  return {
    title,
    description: concept.shortDescription,
    openGraph: { title, description: concept.shortDescription },
  }
}

const TERRITORY_BADGE: Record<string, { label: string; className: string }> = {
  available: { label: 'Territory Available', className: 'bg-forest-50 text-forest-800 border-forest-200' },
  limited: { label: 'Limited Availability', className: 'bg-amber-50 text-amber-700 border-amber-200' },
  sold: { label: 'Territories Sold', className: 'bg-ink-100 text-ink-500 border-ink-200' },
}

export default async function ConceptDetailPage({ params }: Props) {
  const { slug } = await params
  const [concept, relatedResult] = await Promise.all([
    getConceptBySlug(slug),
    getConcepts({ limit: 3 }),
  ])
  if (!concept) notFound()

  const badge = TERRITORY_BADGE[concept.territoryStatus] ?? TERRITORY_BADGE.available
  const related = relatedResult.docs.filter((c) => c.slug !== slug).slice(0, 3)

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: concept.name,
    description: concept.shortDescription,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'CAD',
      price: concept.startupCostMin,
      priceSpecification: {
        '@type': 'PriceSpecification',
        minPrice: concept.startupCostMin,
        maxPrice: concept.startupCostMax,
        priceCurrency: 'CAD',
      },
    },
    areaServed: { '@type': 'State', name: 'British Columbia', containedIn: 'Canada' },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="bg-forest-950 text-white py-14">
        <div className="site-container">
          <Link href="/concepts" className="text-ink-400 hover:text-white text-sm transition-colors block mb-4">
            ← All Concepts
          </Link>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="label-pill bg-terra-700 text-white text-xs">
              {concept.category.split('-').map((w: string) => w[0].toUpperCase() + w.slice(1)).join(' ')}
            </span>
            <span
              className={`label-pill border text-xs ${badge.className}`}
            >
              {badge.label}
            </span>
          </div>
          <h1 className="font-serif text-3xl lg:text-4xl font-bold mb-2">{concept.name}</h1>
          <p className="text-ink-300 max-w-xl text-lg">{concept.shortDescription}</p>
        </div>
      </section>

      {/* Numbers strip */}
      <section className="bg-forest-900 text-white py-5">
        <div className="site-container">
          <div className="flex flex-wrap gap-8">
            <div>
              <p className="text-xs text-ink-400 uppercase tracking-wide mb-0.5">Startup Cost</p>
              <p className="font-semibold text-white">
                {formatPriceRange(concept.startupCostMin, concept.startupCostMax)}
              </p>
            </div>
            {concept.revenueMin && concept.revenueMax && (
              <div>
                <p className="text-xs text-ink-400 uppercase tracking-wide mb-0.5">
                  Revenue (illustrative)
                </p>
                <p className="font-semibold text-white">
                  {formatPriceRange(concept.revenueMin, concept.revenueMax)}/yr
                </p>
              </div>
            )}
            <div>
              <p className="text-xs text-ink-400 uppercase tracking-wide mb-0.5">Complexity</p>
              <p className="font-semibold text-white capitalize">
                {concept.complexity.replace('-', '\u2013')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="site-container">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Disclaimer — prominent position */}
              <DisclaimerBlock />

              {/* What's included */}
              {concept.whatsIncluded && concept.whatsIncluded.length > 0 && (
                <div>
                  <h2 className="font-serif text-xl font-semibold text-ink-900 mb-4">
                    What&apos;s Included
                  </h2>
                  <ul className="space-y-2">
                    {concept.whatsIncluded.map((w: { item: string }, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-ink-700">
                        <span className="text-terra-600 mt-0.5 shrink-0">✓</span>
                        {w.item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Founder fit */}
              {concept.founderFit && concept.founderFit.length > 0 && (
                <div>
                  <h2 className="font-serif text-xl font-semibold text-ink-900 mb-4">
                    Who Is This For?
                  </h2>
                  <ul className="space-y-2">
                    {concept.founderFit.map((f: { trait: string }, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-ink-700">
                        <span className="text-forest-700 mt-0.5 shrink-0">→</span>
                        {f.trait}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Risks */}
              {concept.risks && concept.risks.length > 0 && (
                <div>
                  <h2 className="font-serif text-xl font-semibold text-ink-900 mb-4">
                    Risks &amp; Considerations
                  </h2>
                  <ul className="space-y-2">
                    {concept.risks.map((r: { risk: string }, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-ink-600">
                        <span className="text-amber-600 mt-0.5 shrink-0">!</span>
                        {r.risk}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* FAQ */}
              <div>
                <h2 className="font-serif text-xl font-semibold text-ink-900 mb-4">
                  Common Questions
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      q: "What's included in the startup package?",
                      a: 'The package includes the brand, operating playbook, territory rights (subject to formal agreement), and launch support from the BusinessBARN team.',
                    },
                    {
                      q: 'Can I speak with someone before committing?',
                      a: 'Yes. Request a briefing and we\'ll set up a no-pressure call to walk through the concept in detail.',
                    },
                    {
                      q: 'Is the territory exclusive?',
                      a: 'Territory exclusivity is available and subject to formal written agreement. Check the territory status above for current availability.',
                    },
                    {
                      q: 'Is this a franchise?',
                      a: 'No. BusinessBARN business concepts are not franchise offerings. Please review our terms and seek independent legal advice before committing.',
                    },
                  ].map(({ q, a }) => (
                    <div key={q} className="border-t border-ink-100 pt-4">
                      <h3 className="font-semibold text-sm text-ink-900 mb-1">{q}</h3>
                      <p className="text-sm text-ink-600 leading-relaxed">{a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="card p-6 sticky top-20">
                <h2 className="font-serif text-lg font-semibold text-ink-900 mb-1">
                  Request a Concept Briefing
                </h2>
                <p className="text-sm text-ink-500 mb-4">
                  No commitment. We&apos;ll walk you through the details on a brief call.
                </p>
                <LeadForm
                  packageInterest="side-two"
                  conceptSlug={concept.slug}
                  sourceURL={`/concepts/${concept.slug}`}
                  showTerritory
                  showMessage
                  ctaLabel="Request Briefing"
                />
              </div>
            </div>
          </div>

          {/* Related concepts */}
          {related.length > 0 && (
            <div className="mt-20">
              <h2 className="font-serif text-2xl font-bold text-ink-900 mb-6">
                Related Concepts
              </h2>
              <div className="grid sm:grid-cols-3 gap-6">
                {related.map((c) => (
                  <ConceptCard
                    key={String(c.id)}
                    name={c.name}
                    slug={c.slug}
                    category={c.category}
                    startupCostMin={c.startupCostMin}
                    startupCostMax={c.startupCostMax}
                    revenueMin={c.revenueMin ?? undefined}
                    revenueMax={c.revenueMax ?? undefined}
                    territoryStatus={c.territoryStatus as 'available' | 'limited' | 'sold'}
                    shortDescription={c.shortDescription}
                    complexity={c.complexity}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
