import type { Metadata } from 'next'
import Link from 'next/link'
import { getListings } from '@/lib/payload'
import ListingCard from '@/components/ListingCard'

export const metadata: Metadata = {
  title: 'Businesses for Sale in B.C.',
  description:
    'Search verified business listings across British Columbia — retail, food & beverage, services, construction, and more. Browse active listings and enquire today.',
}

const CATEGORIES = [
  { value: '', label: 'All Categories' },
  { value: 'food-beverage', label: 'Food & Beverage' },
  { value: 'retail', label: 'Retail' },
  { value: 'services', label: 'Services' },
  { value: 'construction-trades', label: 'Construction & Trades' },
  { value: 'health-wellness', label: 'Health & Wellness' },
  { value: 'automotive', label: 'Automotive' },
  { value: 'hospitality', label: 'Hospitality' },
  { value: 'technology', label: 'Technology' },
]

export default async function BuyPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string }>
}) {
  const { category, page: pageParam } = await searchParams
  const page = Math.max(1, Number(pageParam ?? 1))

  const result = await getListings({ category, page, limit: 12 })
  const listings = result.docs

  return (
    <>
      {/* Header */}
      <section className="bg-forest-950 text-white py-14">
        <div className="site-container">
          <p className="text-amber-400 text-xs font-semibold uppercase tracking-widest mb-2">
            Side One
          </p>
          <h1 className="font-serif text-4xl font-bold mb-2">Businesses for Sale in B.C.</h1>
          <p className="text-ink-300 max-w-xl">
            Verified listings across British Columbia. Confidential, professionally managed.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-ink-200">
        <div className="site-container py-4 flex flex-wrap gap-2">
          {CATEGORIES.map(({ value, label }) => (
            <Link
              key={value}
              href={value ? `/buy?category=${value}` : '/buy'}
              className={`px-4 py-1.5 text-sm rounded-full border transition-colors duration-150 ${
                category === value || (!category && !value)
                  ? 'bg-forest-900 text-white border-forest-900'
                  : 'border-ink-200 text-ink-600 hover:border-forest-700 hover:text-forest-800'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </section>

      {/* Listings grid */}
      <section className="section bg-cream">
        <div className="site-container">
          {listings.length > 0 ? (
            <>
              <p className="text-sm text-ink-500 mb-6">
                {result.totalDocs} listing{result.totalDocs !== 1 ? 's' : ''} found
              </p>
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

              {/* Pagination */}
              {result.totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-12">
                  {Array.from({ length: result.totalPages }, (_, i) => i + 1).map((p) => (
                    <Link
                      key={p}
                      href={`/buy?${category ? `category=${category}&` : ''}page=${p}`}
                      className={`w-9 h-9 flex items-center justify-center text-sm rounded border transition-colors ${
                        p === page
                          ? 'bg-forest-900 text-white border-forest-900'
                          : 'border-ink-200 text-ink-600 hover:border-forest-700'
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
              <p className="text-ink-500 mb-4">No listings found for this category.</p>
              <Link href="/buy" className="btn-secondary">
                Clear filters
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Sell CTA */}
      <section className="bg-white py-16 border-t border-ink-100">
        <div className="site-container text-center max-w-lg mx-auto">
          <h2 className="font-serif text-2xl font-bold text-ink-900 mb-2">
            Thinking of selling?
          </h2>
          <p className="text-ink-500 text-sm mb-6">
            Get a free, no-obligation valuation and find out what your business is worth.
          </p>
          <Link href="/sell" className="btn-primary">
            Learn About Selling
          </Link>
        </div>
      </section>
    </>
  )
}
