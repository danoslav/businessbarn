import Link from 'next/link'
import ConceptCard from '@/components/ConceptCard'
import DisclaimerBlock from '@/components/DisclaimerBlock'
import { getConcepts } from '@/lib/payload'

export async function HomeFeaturedConcepts() {
  const concepts = await getConcepts({ featuredOnly: true, limit: 3 }).catch(() => [])
  if (concepts.length === 0) return null

  return (
    <section className="bg-white py-14 lg:py-20 border-t border-ink-100">
      <div className="site-container">
        <div className="flex items-end justify-between mb-8 gap-4 flex-wrap">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-field-600 mb-1">
              Business concepts
            </p>
            <h2 className="font-serif text-2xl font-bold text-ink-900">
              Start from something already researched
            </h2>
          </div>
          <Link href="/concepts" className="btn-ghost text-ink-600" data-ga-cta="home_concepts_browse_all">
            Browse all concepts →
          </Link>
        </div>
        <DisclaimerBlock short />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {concepts.map((c) => {
            const cat =
              typeof c.category === 'object' && c.category
                ? (c.category as { name: string }).name
                : undefined
            return (
              <ConceptCard
                key={c.id}
                name={c.name}
                slug={c.slug}
                gaCta={`home_featured_concept_${c.slug}`}
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
      </div>
    </section>
  )
}
