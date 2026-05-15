import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getListingBySlug, formatPrice } from '@/lib/payload'
import LeadForm from '@/components/LeadForm'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const listing = await getListingBySlug(slug)
  if (!listing) return { title: 'Listing Not Found' }
  const title = listing.confidential
    ? `Business for Sale — ${listing.location}`
    : listing.title
  return {
    title,
    description: listing.shortDescription,
    openGraph: { title, description: listing.shortDescription },
  }
}

export default async function ListingDetailPage({ params }: Props) {
  const { slug } = await params
  const listing = await getListingBySlug(slug)
  if (!listing) notFound()

  const displayTitle = listing.confidential
    ? `Confidential Business for Sale — ${listing.location}`
    : listing.title

  const CATEGORY_LABELS: Record<string, string> = {
    'food-beverage': 'Food & Beverage',
    retail: 'Retail',
    services: 'Services',
    manufacturing: 'Manufacturing',
    'construction-trades': 'Construction & Trades',
    'health-wellness': 'Health & Wellness',
    automotive: 'Automotive',
    technology: 'Technology',
    hospitality: 'Hospitality',
    agriculture: 'Agriculture',
    other: 'Other',
  }

  const STATUS_BADGE: Record<string, string> = {
    active: 'bg-forest-50 text-forest-800',
    'under-offer': 'bg-amber-50 text-amber-700',
    sold: 'bg-ink-100 text-ink-500',
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-forest-950 text-white py-14">
        <div className="site-container">
          <div className="flex items-center gap-3 mb-3">
            <Link href="/buy" className="text-ink-400 hover:text-white text-sm transition-colors">
              ← All Listings
            </Link>
            <span className="text-ink-600">|</span>
            <span
              className={`label-pill text-[11px] ${STATUS_BADGE[listing.status] ?? STATUS_BADGE.active}`}
            >
              {listing.status === 'active' ? 'Active' : listing.status === 'under-offer' ? 'Under Offer' : 'Sold'}
            </span>
          </div>
          <h1 className="font-serif text-3xl lg:text-4xl font-bold mb-2">{displayTitle}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-ink-300">
            <span>{CATEGORY_LABELS[listing.category] ?? listing.category}</span>
            <span>·</span>
            <span>{listing.location}</span>
            {listing.established && (
              <>
                <span>·</span>
                <span>Est. {listing.established}</span>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="site-container">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Key numbers */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="card p-4">
                  <p className="text-xs text-ink-400 uppercase tracking-wide mb-1">Asking Price</p>
                  <p className="font-serif text-2xl font-bold text-forest-900">
                    {formatPrice(listing.askingPrice)}
                  </p>
                </div>
                {listing.annualRevenue && (
                  <div className="card p-4">
                    <p className="text-xs text-ink-400 uppercase tracking-wide mb-1">
                      Annual Revenue
                    </p>
                    <p className="font-serif text-2xl font-bold text-ink-800">
                      {formatPrice(listing.annualRevenue)}
                    </p>
                  </div>
                )}
                {listing.cashFlow && (
                  <div className="card p-4">
                    <p className="text-xs text-ink-400 uppercase tracking-wide mb-1">Cash Flow</p>
                    <p className="font-serif text-2xl font-bold text-ink-800">
                      {formatPrice(listing.cashFlow)}
                    </p>
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <h2 className="font-serif text-xl font-semibold text-ink-900 mb-3">
                  About This Business
                </h2>
                <p className="text-ink-600 leading-relaxed">{listing.shortDescription}</p>
              </div>

              {/* Highlights */}
              {listing.highlights && listing.highlights.length > 0 && (
                <div>
                  <h2 className="font-serif text-xl font-semibold text-ink-900 mb-3">
                    Key Highlights
                  </h2>
                  <ul className="space-y-2">
                    {listing.highlights.map((h: { point: string }, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-ink-700">
                        <span className="text-forest-700 mt-0.5 shrink-0">✓</span>
                        {h.point}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Additional details */}
              <div className="card p-5">
                <h3 className="font-semibold text-ink-800 mb-3 text-sm">Listing Details</h3>
                <dl className="grid grid-cols-2 gap-3 text-sm">
                  {listing.employees != null && (
                    <>
                      <dt className="text-ink-400">Employees</dt>
                      <dd className="text-ink-800">{listing.employees}</dd>
                    </>
                  )}
                  {listing.established && (
                    <>
                      <dt className="text-ink-400">Established</dt>
                      <dd className="text-ink-800">{listing.established}</dd>
                    </>
                  )}
                  {listing.leaseInfo && (
                    <>
                      <dt className="text-ink-400">Lease</dt>
                      <dd className="text-ink-800">{listing.leaseInfo}</dd>
                    </>
                  )}
                  <dt className="text-ink-400">Financing</dt>
                  <dd className="text-ink-800">
                    {listing.financingAvailable ? 'May be available' : 'Not offered'}
                  </dd>
                </dl>
              </div>

              {listing.reasonForSelling && (
                <div>
                  <h2 className="font-serif text-xl font-semibold text-ink-900 mb-2">
                    Reason for Selling
                  </h2>
                  <p className="text-ink-600 text-sm">{listing.reasonForSelling}</p>
                </div>
              )}
            </div>

            {/* Sidebar — lead form */}
            <div className="lg:col-span-1">
              <div className="card p-6 sticky top-20">
                <h2 className="font-serif text-lg font-semibold text-ink-900 mb-1">
                  Enquire About This Listing
                </h2>
                <p className="text-sm text-ink-500 mb-4">
                  All enquiries are handled confidentially.
                </p>
                <LeadForm
                  packageInterest="side-one"
                  listingSlug={listing.slug}
                  sourceURL={`/buy/${listing.slug}`}
                  showTerritory={false}
                  ctaLabel="Request Information"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
