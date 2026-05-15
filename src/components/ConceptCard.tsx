import Link from 'next/link'
import { formatPriceRange } from '@/lib/payload'

type Props = {
  name: string
  slug: string
  category: string
  startupCostMin: number
  startupCostMax: number
  revenueMin?: number
  revenueMax?: number
  territoryStatus: 'available' | 'limited' | 'sold'
  shortDescription: string
  complexity: string
}

const CATEGORY_LABELS: Record<string, string> = {
  automotive: 'Automotive',
  'facility-services': 'Facility Services',
  'home-services': 'Home Services',
  'outdoor-services': 'Outdoor Services',
  'pet-services': 'Pet Services',
  events: 'Events',
  'professional-services': 'Professional Services',
  'health-wellness': 'Health & Wellness',
  'food-beverage': 'Food & Beverage',
  technology: 'Technology',
}

const TERRITORY_BADGE: Record<string, { label: string; className: string }> = {
  available: { label: 'Available', className: 'bg-forest-50 text-forest-800' },
  limited: { label: 'Limited', className: 'bg-amber-50 text-amber-700' },
  sold: { label: 'Sold Out', className: 'bg-ink-100 text-ink-500' },
}

export default function ConceptCard({
  name,
  slug,
  category,
  startupCostMin,
  startupCostMax,
  revenueMin,
  revenueMax,
  territoryStatus,
  shortDescription,
  complexity,
}: Props) {
  const badge = TERRITORY_BADGE[territoryStatus] ?? TERRITORY_BADGE.available

  return (
    <Link
      href={`/concepts/${slug}`}
      className="card block hover:border-terra-600 transition-colors duration-150 group"
    >
      {/* Accent bar */}
      <div className="h-1 bg-terra-600" />

      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="label-pill bg-terra-50 text-terra-700 text-[10px]">
            {CATEGORY_LABELS[category] ?? category}
          </span>
          <span className={`label-pill text-[10px] ${badge.className}`}>{badge.label}</span>
        </div>

        <h3 className="font-serif font-semibold text-ink-900 mb-2 group-hover:text-terra-700 transition-colors">
          {name}
        </h3>

        <p className="text-sm text-ink-500 line-clamp-2 mb-4">{shortDescription}</p>

        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-ink-100">
          <div>
            <p className="text-[10px] text-ink-400 uppercase tracking-wide mb-0.5">Startup cost</p>
            <p className="text-sm font-semibold text-ink-800">
              {formatPriceRange(startupCostMin, startupCostMax)}
            </p>
          </div>
          {revenueMin && revenueMax && (
            <div>
              <p className="text-[10px] text-ink-400 uppercase tracking-wide mb-0.5">
                Revenue <span className="normal-case">(illus.)</span>
              </p>
              <p className="text-sm font-semibold text-ink-800">
                {formatPriceRange(revenueMin, revenueMax)}/yr
              </p>
            </div>
          )}
          <div>
            <p className="text-[10px] text-ink-400 uppercase tracking-wide mb-0.5">Complexity</p>
            <p className="text-sm font-medium text-ink-700 capitalize">
              {complexity.replace('-', '\u2013')}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}
