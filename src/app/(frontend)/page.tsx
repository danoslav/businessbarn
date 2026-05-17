import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import MethodologySteps from '@/components/MethodologySteps'
import { HomeFeaturedConcepts } from '@/components/home/HomeFeaturedConcepts'
import {
  HomeConceptsFallback,
  HomePackagesFallback,
} from '@/components/home/HomeCmsSectionsFallback'
import { HomePackagesSection } from '@/components/home/HomePackagesSection'

/** Revalidate CMS-driven sections; hero is static and streams immediately. */
export const revalidate = 300

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

export default function HomePage() {
  return (
    <>
      {/* Hero — static; not blocked by Payload */}
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
              <Link href="/consulting" className="btn-primary" data-ga-cta="home_hero_consulting">
                Explore planning packages
              </Link>
              <Link
                href="/concepts"
                className="inline-flex items-center px-6 py-3 border border-white/30 text-white hover:bg-white/10 font-semibold text-sm rounded transition-colors duration-150"
                data-ga-cta="home_hero_concepts"
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
              <Link href="/consulting" className="btn-primary text-sm py-2" data-ga-cta="home_two_ways_packages">
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
              <Link href="/concepts" className="btn-secondary text-sm py-2" data-ga-cta="home_two_ways_concepts">
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
            <Link href="/how-it-works" className="btn-ghost text-ink-300 hover:text-white" data-ga-cta="home_founders_how_it_works">
              How we answer them →
            </Link>
          </div>
        </div>
      </section>

      <Suspense fallback={<HomePackagesFallback />}>
        <HomePackagesSection />
      </Suspense>

      <Suspense fallback={<HomeConceptsFallback />}>
        <HomeFeaturedConcepts />
      </Suspense>

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
            <Link href="/methodology" className="btn-secondary" data-ga-cta="home_methodology_read">
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
            data-ga-cta="home_final_book_call"
          >
            Book a planning call →
          </Link>
        </div>
      </section>
    </>
  )
}
