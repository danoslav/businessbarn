import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import ConceptCard from '@/components/ConceptCard'
import WhatHappensNext from '@/components/WhatHappensNext'
import { DEMO_CONCEPTS } from '@/lib/demo-concepts'
import { getConcepts } from '@/lib/payload'

export const metadata: Metadata = {
  title: 'Thank you | The Business Barn',
  description: 'We received your planning call request and will be in touch within one business day.',
}

export const dynamic = 'force-dynamic'

export default async function ThankYouPage() {
  const cmsConcepts = await getConcepts({ limit: 6 }).catch(() => [])

  const recommendations =
    cmsConcepts.length > 0
      ? cmsConcepts.map((c) => {
          const cat =
            typeof c.category === 'object' && c.category
              ? (c.category as { name: string }).name
              : undefined
          return {
            name: c.name,
            slug: c.slug,
            categoryName: cat,
            startupCostMin: c.startupCostMin,
            startupCostMax: c.startupCostMax,
            estimatedMonthlyRevenueMin: c.estimatedMonthlyRevenueMin ?? undefined,
            estimatedMonthlyRevenueMax: c.estimatedMonthlyRevenueMax ?? undefined,
            launchTimeline: c.launchTimeline ?? undefined,
            difficultyLevel: c.difficultyLevel ?? undefined,
            territoryStatus: c.territoryStatus as 'available' | 'limited' | 'sold',
            shortDescription: c.shortDescription,
          }
        })
      : DEMO_CONCEPTS

  return (
    <>
      <section className="bg-field-700 text-white py-14 lg:py-20">
        <div className="site-container max-w-3xl">
          <Breadcrumbs crumbs={[{ label: 'Book a Planning Call', href: '/book-a-call' }, { label: 'Thank you' }]} />
          <p className="text-xs font-semibold uppercase tracking-widest text-harvest-300 mb-4">
            You are on the list
          </p>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-4">Thank you. We got it</h1>
          <p className="text-lg text-field-100 leading-relaxed max-w-xl">
            Your enquiry is in our queue. We review every submission personally and will reach out
            within one business day.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/concepts"
              className="btn-primary bg-white text-field-800 hover:bg-field-50"
              data-ga-cta="thank_you_browse_concepts"
            >
              Browse business concepts
            </Link>
            <Link
              href="/"
              className="btn-secondary border-field-400 text-white hover:bg-field-600"
              data-ga-cta="thank_you_home"
            >
              Back to home
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-cream py-14 lg:py-20">
        <div className="site-container max-w-3xl">
          <WhatHappensNext variant="page" />
        </div>
      </section>

      <section className="bg-white py-14 lg:py-20 border-t border-ink-100">
        <div className="site-container">
          <div className="mb-8 max-w-2xl">
            <h2 className="font-serif text-2xl font-bold text-ink-900 mb-2">You may be interested in</h2>
            <p className="text-sm text-ink-500">
              While you wait, explore pre-vetted business concepts with illustrative startup costs and
              territory notes.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((c) => (
              <ConceptCard
                key={c.slug}
                name={c.name}
                slug={c.slug}
                categoryName={c.categoryName}
                startupCostMin={c.startupCostMin}
                startupCostMax={c.startupCostMax}
                estimatedMonthlyRevenueMin={c.estimatedMonthlyRevenueMin}
                estimatedMonthlyRevenueMax={c.estimatedMonthlyRevenueMax}
                launchTimeline={c.launchTimeline}
                difficultyLevel={c.difficultyLevel}
                territoryStatus={c.territoryStatus}
                shortDescription={c.shortDescription}
                gaCta={`thank_you_concept_${c.slug}`}
              />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/concepts" className="btn-primary" data-ga-cta="thank_you_all_concepts">
              View all business concepts →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
