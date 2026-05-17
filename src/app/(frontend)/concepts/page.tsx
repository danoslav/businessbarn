import type { Metadata } from 'next'
import Link from 'next/link'
import ConceptCard from '@/components/ConceptCard'
import DisclaimerBlock from '@/components/DisclaimerBlock'
import { getConcepts, getCategories, getLocations } from '@/lib/payload'

export const revalidate = 300

type SearchParams = { category?: string; location?: string }

function buildMetadata(cat?: string, loc?: string): Metadata {
  if (cat && loc) {
    return {
      title: `${cat} Business Concepts in ${loc} | The Business Barn`,
      description: `Browse pre-vetted ${cat} business concepts suited to ${loc}. Real startup costs, revenue models, and territory availability.`,
    }
  }
  if (cat) {
    return {
      title: `${cat} Business Concepts | The Business Barn`,
      description: `Pre-vetted ${cat} business concepts with startup costs, revenue models, and operator fit guidance.`,
    }
  }
  if (loc) {
    return {
      title: `Business Concepts in ${loc} | The Business Barn`,
      description: `Browse pre-vetted business concepts suited to ${loc}. Startup costs, revenue models, and territory availability.`,
    }
  }
  return {
    title: 'Business Concepts | The Business Barn',
    description:
      'Browse our marketplace of pre-vetted business concepts. Each includes real startup cost ranges, revenue models, territory availability, and operator fit guidance.',
  }
}

export async function generateMetadata({ searchParams }: { searchParams: Promise<SearchParams> }): Promise<Metadata> {
  const sp = await searchParams
  return buildMetadata(sp.category, sp.location)
}

export default async function ConceptsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const sp = await searchParams
  const [concepts, categories, locations] = await Promise.all([
    getConcepts({ category: sp.category, location: sp.location }).catch(() => []),
    getCategories().catch(() => []),
    getLocations().catch(() => []),
  ])

  const pageHeading =
    sp.category && sp.location
      ? `${sp.category} concepts in ${sp.location}`
      : sp.category
      ? `${sp.category} business concepts`
      : sp.location
      ? `Business concepts in ${sp.location}`
      : 'Business concepts'

  return (
    <>
      <section className="bg-ink-900 text-white py-12 lg:py-16">
        <div className="site-container">
          <p className="text-xs font-semibold uppercase tracking-widest text-harvest-400 mb-3">
            Pre-vetted business concepts
          </p>
          <h1 className="font-serif text-4xl font-bold mb-3">{pageHeading}</h1>
          <p className="text-base text-ink-300 max-w-xl">
            Each concept has been modelled for startup cost, revenue potential, operator fit,
            and local market demand. These are starting points — not guarantees.
          </p>
        </div>
      </section>

      <section className="bg-cream py-10 border-b border-ink-100">
        <div className="site-container">
          <div className="flex flex-wrap gap-3 items-center">
            <span className="text-xs font-semibold text-ink-500 uppercase tracking-wide">Filter by category:</span>
            <Link
              href="/concepts"
              className={`label-pill border text-[11px] ${!sp.category ? 'bg-barn-600 text-white border-barn-600' : 'bg-white text-ink-600 border-ink-200 hover:border-barn-400'}`}
            >
              All
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/concepts?category=${cat.slug}${sp.location ? `&location=${sp.location}` : ''}`}
                className={`label-pill border text-[11px] ${sp.category === cat.slug ? 'bg-barn-600 text-white border-barn-600' : 'bg-white text-ink-600 border-ink-200 hover:border-barn-400'}`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-10 lg:py-14">
        <div className="site-container">
          <div className="mb-6">
            <DisclaimerBlock short />
          </div>

          {concepts.length === 0 ? (
            <div className="text-center py-16">
              <p className="font-serif text-xl text-ink-700 mb-2">
                No concepts match this filter yet.
              </p>
              <p className="text-sm text-ink-500 mb-6">
                We add new concepts regularly. Or, tell us what you are looking for.
              </p>
              <Link href="/book-a-call" className="btn-primary" data-ga-cta="concepts_no_results_book_call">
                Talk to us about your idea →
              </Link>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {concepts.map((c) => {
                const cat = typeof c.category === 'object' && c.category
                  ? (c.category as { name: string }).name
                  : undefined
                return (
                  <ConceptCard
                    key={c.id}
                    name={c.name}
                    slug={c.slug}
                    gaCta={`concepts_list_${c.slug}`}
                    categoryName={cat}
                    startupCostMin={c.startupCostMin}
                    startupCostMax={c.startupCostMax}
                    estimatedMonthlyRevenueMin={c.estimatedMonthlyRevenueMin ?? undefined}
                    estimatedMonthlyRevenueMax={c.estimatedMonthlyRevenueMax ?? undefined}
                    launchTimeline={c.launchTimeline ?? undefined}
                    difficultyLevel={c.difficultyLevel ?? undefined}
                    territoryStatus={c.territoryStatus as 'available' | 'limited' | 'sold'}
                    shortDescription={c.shortDescription}
                  />
                )
              })}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
