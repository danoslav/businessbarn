import type { Metadata } from 'next'
import Link from 'next/link'
import { getConcepts } from '@/lib/payload'
import ConceptCard from '@/components/ConceptCard'

export const dynamic = 'force-dynamic'

type SearchParams = Promise<{ category?: string; territory?: string; page?: string }>

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams
}): Promise<Metadata> {
  const { category, territory } = await searchParams

  const catLabel = category
    ? category
        .split('-')
        .map((w) => w[0].toUpperCase() + w.slice(1))
        .join(' ')
    : null
  const locLabel = territory
    ? territory
        .split('-')
        .map((w) => w[0].toUpperCase() + w.slice(1))
        .join(' ')
    : null

  const titleParts = ['Business Concepts Available in B.C.']
  if (catLabel && locLabel) titleParts[0] = `${catLabel} Concepts in ${locLabel}, B.C.`
  else if (catLabel) titleParts[0] = `${catLabel} Business Concepts in B.C.`
  else if (locLabel) titleParts[0] = `Business Concepts in ${locLabel}, B.C.`

  return {
    title: titleParts[0],
    description: `Explore proven business concepts with territory availability in B.C. ${catLabel ? `Browse ${catLabel} concepts.` : ''} Startup costs, revenue assumptions, and founder fit for each opportunity.`,
  }
}

const CATEGORIES = [
  { value: '', label: 'All' },
  { value: 'home-services', label: 'Home Services' },
  { value: 'outdoor-services', label: 'Outdoor Services' },
  { value: 'automotive', label: 'Automotive' },
  { value: 'facility-services', label: 'Facility Services' },
  { value: 'pet-services', label: 'Pet Services' },
  { value: 'events', label: 'Events' },
  { value: 'professional-services', label: 'Professional Services' },
  { value: 'health-wellness', label: 'Health & Wellness' },
  { value: 'food-beverage', label: 'Food & Beverage' },
]

export default async function ConceptsPage({ searchParams }: { searchParams: SearchParams }) {
  const { category, page: pageParam } = await searchParams
  const page = Math.max(1, Number(pageParam ?? 1))

  const result = await getConcepts({ category, page, limit: 12 })
  const concepts = result.docs

  return (
    <>
      {/* Header */}
      <section className="bg-forest-950 text-white py-14">
        <div className="site-container">
          <p className="text-terra-400 text-xs font-semibold uppercase tracking-widest mb-2">
            Side Two
          </p>
          <h1 className="font-serif text-4xl font-bold mb-2">Business Concepts</h1>
          <p className="text-ink-300 max-w-xl">
            Proven operating models with territory availability in B.C. Startup cost, revenue
            assumptions, and everything you need to evaluate each opportunity.
          </p>
        </div>
      </section>

      {/* Important notice */}
      <div className="bg-amber-50 border-b border-amber-200">
        <div className="site-container py-3 text-xs text-amber-800">
          Revenue figures are illustrative estimates only — not a guarantee of earnings. These
          listings are not franchise offerings.{' '}
          <Link href="/terms" className="underline hover:text-amber-900">
            Learn more
          </Link>
        </div>
      </div>

      {/* Filters */}
      <section className="bg-white border-b border-ink-200">
        <div className="site-container py-4 flex flex-wrap gap-2">
          {CATEGORIES.map(({ value, label }) => (
            <Link
              key={value}
              href={value ? `/concepts?category=${value}` : '/concepts'}
              className={`px-4 py-1.5 text-sm rounded-full border transition-colors duration-150 ${
                category === value || (!category && !value)
                  ? 'bg-terra-700 text-white border-terra-700'
                  : 'border-ink-200 text-ink-600 hover:border-terra-600 hover:text-terra-700'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="section bg-cream">
        <div className="site-container">
          {concepts.length > 0 ? (
            <>
              <p className="text-sm text-ink-500 mb-6">
                {result.totalDocs} concept{result.totalDocs !== 1 ? 's' : ''} available
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {concepts.map((c) => (
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
              {result.totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-12">
                  {Array.from({ length: result.totalPages }, (_, i) => i + 1).map((p) => (
                    <Link
                      key={p}
                      href={`/concepts?${category ? `category=${category}&` : ''}page=${p}`}
                      className={`w-9 h-9 flex items-center justify-center text-sm rounded border transition-colors ${
                        p === page
                          ? 'bg-terra-700 text-white border-terra-700'
                          : 'border-ink-200 text-ink-600 hover:border-terra-600'
                      }`}
                    >
                      {p}
                    </Link>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-ink-500 mb-4">No concepts found. Check back soon.</p>
              <Link href="/concepts" className="btn-secondary">
                Clear filters
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Briefing CTA */}
      <section className="py-16 bg-terra-800 text-white text-center">
        <div className="site-container max-w-md mx-auto">
          <h2 className="font-serif text-2xl font-bold mb-2">Not sure which concept fits you?</h2>
          <p className="text-terra-200 text-sm mb-6">
            Request a no-pressure briefing and we&apos;ll walk you through the options best suited
            to your goals, budget, and location.
          </p>
          <Link
            href="/request-briefing"
            className="inline-flex items-center px-8 py-4 bg-white text-terra-800 font-semibold rounded hover:bg-terra-50 transition-colors"
          >
            Request a Concept Briefing
          </Link>
        </div>
      </section>
    </>
  )
}
