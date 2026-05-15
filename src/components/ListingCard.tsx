import Link from 'next/link'
import { formatPrice } from '@/lib/payload'

type Props = {
  title: string
  slug: string
  category: string
  location: string
  askingPrice: number
  annualRevenue?: number
  shortDescription: string
  confidential?: boolean
}

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

export default function ListingCard({
  title,
  slug,
  category,
  location,
  askingPrice,
  annualRevenue,
  shortDescription,
  confidential,
}: Props) {
  return (
    <Link
      href={`/buy/${slug}`}
      className="card block hover:border-forest-700 transition-colors duration-150 group"
    >
      {/* Placeholder image area */}
      <div className="h-40 bg-ink-100 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-ink-400 text-xs font-medium uppercase tracking-wider">
          {confidential ? 'Confidential' : CATEGORY_LABELS[category] ?? 'Business'}
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="label-pill bg-forest-50 text-forest-800 text-[10px]">
            {CATEGORY_LABELS[category] ?? category}
          </span>
          <span className="text-xs text-ink-400">{location}</span>
        </div>

        <h3 className="font-serif font-semibold text-ink-900 mb-2 group-hover:text-forest-800 transition-colors line-clamp-2">
          {confidential ? `${CATEGORY_LABELS[category] ?? 'Business'} for Sale` : title}
        </h3>

        <p className="text-sm text-ink-500 line-clamp-2 mb-4">{shortDescription}</p>

        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs text-ink-400">Asking Price</p>
            <p className="font-semibold text-forest-900 text-lg">{formatPrice(askingPrice)}</p>
          </div>
          {annualRevenue && (
            <div className="text-right">
              <p className="text-xs text-ink-400">Annual Revenue</p>
              <p className="text-sm font-medium text-ink-700">{formatPrice(annualRevenue)}</p>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
