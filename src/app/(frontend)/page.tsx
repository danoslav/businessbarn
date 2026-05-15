import type { Metadata } from 'next'
import Link from 'next/link'
import ConceptCard from '@/components/ConceptCard'
import PackageCard from '@/components/PackageCard'
import MethodologySteps from '@/components/MethodologySteps'
import DisclaimerBlock from '@/components/DisclaimerBlock'
import { getConcepts, getConsultingPackages } from '@/lib/payload'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Better questions. Better business starts. | The Business Barn',
  description:
    'Practical business planning packages and pre-vetted business concepts for founders who want real numbers before they commit.',
}

const FOUNDER_QUESTIONS = [
  'Is there real demand for this where I live?',
  'What does it actually cost to open and run?',
  'Who am I really competing against?',
  'Can I make money in year one?',
  'Does this fit how I want to work?',
  'What would make this fail?',
]

export default async function HomePage() {
  const [packages, concepts] = await Promise.all([
    getConsultingPackages().catch(() => []),
    getConcepts({ featuredOnly: true, limit: 3 }).catch(() => []),
  ])

  return (
    <>
      {/* Hero */}
      <section className="bg-ink-900 text-white py-16 lg:py-24">
        <div className="site-container">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-harvest-400 mb-4">
              Small-business planning for real-world founders
            </p>
            <h1 className="font-serif text-4xl lg:text-6xl font-bold leading-tight mb-6">
              Better questions.
              <br />
              <span className="text-barn-400">Better business starts.</span>
            </h1>
            <p className="text-lg text-ink-300 leading-relaxed mb-8 max-w-xl">
              We work with founders who want the honest picture before they commit — not glossy
              templates, not vague advice, not hockey-stick projections. Real planning for real
              businesses.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/consulting" className="btn-primary">
                Explore planning packages
              </Link>
              <Link
                href="/concepts"
                className="inline-flex items-center px-6 py-3 border border-white/30 text-white hover:bg-white/10 font-semibold text-sm rounded transition-colors duration-150"
              >
                Browse business concepts
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Two ways to start */}
      <section className="bg-cream py-14 lg:py-20 border-b border-ink-100">
        <div className="site-container">
          <h2 className="font-serif text-2xl font-bold text-ink-900 mb-8">Two ways to work with us</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-ink-200 rounded-lg p-7">
              <div className="inline-block label-pill bg-barn-50 text-barn-700 border border-barn-200 mb-4 text-[10px]">
                Get a plan
              </div>
              <h3 className="font-serif text-xl font-bold text-ink-900 mb-2">
                Business planning packages
              </h3>
              <p className="text-sm text-ink-600 leading-relaxed mb-4">
                You bring the idea. We run it through eight layers of pressure-testing — market
                demand, costs, competition, location, digital, founder fit, and risk — and give you
                a clear plan with real numbers attached.
              </p>
              <Link href="/consulting" className="btn-primary text-sm py-2">
                See all packages →
              </Link>
            </div>
            <div className="bg-white border border-ink-200 rounded-lg p-7">
              <div className="inline-block label-pill bg-field-50 text-field-600 border border-field-200 mb-4 text-[10px]">
                Start from a concept
              </div>
              <h3 className="font-serif text-xl font-bold text-ink-900 mb-2">
                Pre-vetted business concepts
              </h3>
              <p className="text-sm text-ink-600 leading-relaxed mb-4">
                Not sure what to build? Browse our marketplace of researched, modelled business
                concepts. Each one comes with startup cost ranges, revenue models, territory fit,
                and a clear picture of what it takes to operate.
              </p>
              <Link href="/concepts" className="btn-secondary text-sm py-2">
                Browse concepts →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Founder questions block */}
      <section className="bg-field-950 text-white py-14 lg:py-20">
        <div className="site-container">
          <div className="max-w-xl mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-harvest-400 mb-3">
              The questions that actually matter
            </p>
            <h2 className="font-serif text-2xl font-bold leading-snug">
              Most planning focuses on the pitch. We focus on the questions that kill businesses
              before they open.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FOUNDER_QUESTIONS.map((q, i) => (
              <div
                key={i}
                className="border border-white/10 rounded-lg px-5 py-4 text-sm text-ink-300 leading-relaxed"
              >
                <span className="font-serif text-harvest-400 font-semibold">{i + 1}. </span>
                {q}
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/how-it-works" className="btn-ghost text-ink-300 hover:text-white">
              How we answer them →
            </Link>
          </div>
        </div>
      </section>

      {/* Package cards */}
      {packages.length > 0 && (
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
              <Link href="/consulting" className="btn-ghost text-ink-600">
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
                    Array.isArray(pkg.bestFor)
                      ? pkg.bestFor.map((b: { item: string }) => b.item)
                      : []
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
                <Link href="/book-a-call" className="text-barn-600 underline hover:text-barn-800">
                  Book a free 20-minute fit call →
                </Link>
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Featured concepts */}
      {concepts.length > 0 && (
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
              <Link href="/concepts" className="btn-ghost text-ink-600">
                Browse all concepts →
              </Link>
            </div>
            <DisclaimerBlock short />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {concepts.map((c) => {
                const cat = typeof c.category === 'object' && c.category ? (c.category as { name: string }).name : undefined
                return (
                  <ConceptCard
                    key={c.id}
                    name={c.name}
                    slug={c.slug}
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
      )}

      {/* Methodology preview */}
      <section className="bg-cream py-14 lg:py-20 border-t border-ink-100">
        <div className="site-container">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-barn-600 mb-2">
              Our approach
            </p>
            <h2 className="font-serif text-2xl font-bold text-ink-900 mb-3">
              Eight questions every serious founder needs answered
            </h2>
            <p className="text-sm text-ink-600 leading-relaxed">
              Our planning methodology is built around the conditions most likely to make a
              small business succeed or fail. Every package and every concept runs through
              the same eight-layer framework.
            </p>
          </div>
          <MethodologySteps />
          <div className="mt-10">
            <Link href="/methodology" className="btn-secondary">
              Read our methodology →
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-barn-600 text-white py-14 lg:py-20">
        <div className="site-container text-center">
          <h2 className="font-serif text-3xl font-bold mb-4">Bring your idea to the Barn</h2>
          <p className="text-base text-barn-100 max-w-lg mx-auto mb-8">
            Whether you have a rough concept or a near-ready plan, the next step is a
            20-minute planning call. No pitch. Just honest questions.
          </p>
          <Link
            href="/book-a-call"
            className="inline-flex items-center px-8 py-4 bg-white text-barn-700 font-semibold text-sm rounded hover:bg-harvest-100 transition-colors duration-150"
          >
            Book a planning call →
          </Link>
        </div>
      </section>
    </>
  )
}
