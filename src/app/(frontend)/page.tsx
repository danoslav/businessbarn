import type { Metadata } from 'next'
import Link from 'next/link'
import { getListings, getConcepts } from '@/lib/payload'

export const dynamic = 'force-dynamic'
import ListingCard from '@/components/ListingCard'
import ConceptCard from '@/components/ConceptCard'

export const metadata: Metadata = {
  title: 'BusinessBARN — Buy, Sell & Start Businesses in B.C.',
  description:
    "Browse businesses for sale or explore proven business concepts available in B.C. Get a free valuation, find qualified buyers, or launch something new.",
  openGraph: {
    title: 'BusinessBARN — Buy, Sell & Start Businesses in B.C.',
    description:
      "Browse businesses for sale or explore proven business concepts available in B.C.",
  },
}

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Tell us what you want',
    body: 'Browse our listings or explore our curated business concepts. Request a briefing or a free valuation — no commitment required.',
  },
  {
    step: '02',
    title: 'We do the groundwork',
    body: 'Our team qualifies both buyers and sellers, prepares packages, and matches the right people to the right opportunity.',
  },
  {
    step: '03',
    title: 'Close with confidence',
    body: 'We guide you through due diligence, negotiation, and transition so you can sign with clarity.',
  },
]

export default async function HomePage() {
  const [listingsResult, conceptsResult] = await Promise.all([
    getListings({ limit: 3 }),
    getConcepts({ featured: true, limit: 3 }),
  ])

  const listings = listingsResult.docs
  const concepts = conceptsResult.docs

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="bg-forest-950 text-white py-24 lg:py-36">
        <div className="site-container">
          <div className="max-w-3xl">
            <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-4">
              British Columbia&apos;s Business Marketplace
            </p>
            <h1 className="font-serif text-4xl lg:text-6xl font-bold leading-tight mb-6">
              Buy, Sell, or Start a Business in B.C.
            </h1>
            <p className="text-ink-300 text-lg lg:text-xl leading-relaxed mb-10 max-w-xl">
              Whether you&apos;re ready to exit, looking for your next venture, or exploring a
              proven business concept — BusinessBARN connects you to the right opportunity.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/buy" className="btn-primary px-8 py-4 text-base">
                Browse Listings
              </Link>
              <Link
                href="/concepts"
                className="inline-flex items-center gap-2 px-8 py-4 border border-white/30 text-white hover:bg-white/10 font-semibold text-base rounded transition-colors duration-150"
              >
                Explore Concepts
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust strip ───────────────────────────────────────────────────── */}
      <section className="bg-forest-900 text-white py-6">
        <div className="site-container">
          <div className="flex flex-wrap justify-center gap-8 lg:gap-16 text-center">
            {[
              { value: '50+', label: 'Active Listings' },
              { value: '10+', label: 'Business Concepts' },
              { value: 'B.C.-Wide', label: 'Territory Coverage' },
              { value: 'Free', label: 'Valuation Assessment' },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="font-serif text-2xl font-bold text-amber-400">{value}</p>
                <p className="text-xs text-ink-300 uppercase tracking-widest mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured listings ─────────────────────────────────────────────── */}
      <section className="section bg-cream">
        <div className="site-container">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-forest-700 mb-1">
                Side One
              </p>
              <h2 className="font-serif text-3xl font-bold text-ink-900">
                Businesses for Sale
              </h2>
            </div>
            <Link href="/buy" className="btn-ghost hidden sm:flex">
              View all listings →
            </Link>
          </div>

          {listings.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((l) => (
                <ListingCard
                  key={String(l.id)}
                  title={l.title}
                  slug={l.slug}
                  category={l.category}
                  location={l.location}
                  askingPrice={l.askingPrice}
                  annualRevenue={l.annualRevenue ?? undefined}
                  shortDescription={l.shortDescription}
                  confidential={l.confidential ?? false}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-ink-200 bg-white p-12 text-center">
              <p className="text-ink-500">Listings coming soon. Check back shortly.</p>
            </div>
          )}

          <div className="mt-6 sm:hidden text-center">
            <Link href="/buy" className="btn-ghost">
              View all listings →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Featured concepts ─────────────────────────────────────────────── */}
      <section className="section bg-white">
        <div className="site-container">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-terra-700 mb-1">
                Side Two
              </p>
              <h2 className="font-serif text-3xl font-bold text-ink-900">
                Business Concepts
              </h2>
              <p className="text-ink-500 mt-1 text-sm">
                Proven models with territory availability in B.C.
              </p>
            </div>
            <Link href="/concepts" className="btn-ghost hidden sm:flex">
              All concepts →
            </Link>
          </div>

          {concepts.length > 0 ? (
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
          ) : (
            <div className="rounded-lg border border-ink-200 p-12 text-center">
              <p className="text-ink-500">Concepts launching soon — request early access.</p>
              <Link href="/request-briefing" className="btn-primary mt-4 inline-flex">
                Request a Briefing
              </Link>
            </div>
          )}

          <div className="mt-6 sm:hidden text-center">
            <Link href="/concepts" className="btn-ghost">
              All concepts →
            </Link>
          </div>
        </div>
      </section>

      {/* ── How it works ──────────────────────────────────────────────────── */}
      <section id="how-it-works" className="section bg-ink-50">
        <div className="site-container">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-ink-900">How It Works</h2>
            <p className="text-ink-500 mt-2 max-w-lg mx-auto">
              We guide buyers, sellers, and new operators from first conversation to signed deal.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map(({ step, title, body }) => (
              <div key={step} className="text-center">
                <p className="font-serif text-4xl font-bold text-amber-500 mb-3">{step}</p>
                <h3 className="font-serif text-lg font-semibold text-ink-900 mb-2">{title}</h3>
                <p className="text-sm text-ink-500 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA band ──────────────────────────────────────────────────────── */}
      <section className="py-16 bg-amber-600">
        <div className="site-container text-center">
          <h2 className="font-serif text-3xl font-bold text-white mb-3">
            Ready to make a move?
          </h2>
          <p className="text-amber-100 text-lg mb-8 max-w-md mx-auto">
            Free valuation for sellers. No-pressure briefings for buyers and concept operators.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/valuation"
              className="inline-flex items-center px-8 py-4 bg-white text-amber-700 font-semibold rounded hover:bg-amber-50 transition-colors duration-150"
            >
              Get a Free Valuation
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 border border-white/50 text-white font-semibold rounded hover:bg-white/10 transition-colors duration-150"
            >
              Talk to Us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
