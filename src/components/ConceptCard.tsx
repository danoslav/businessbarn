import Link from 'next/link'
import { formatPriceRange } from '@/lib/payload'

type Props = {
  name: string
  slug: string
  categoryName?: string
  startupCostMin: number
  startupCostMax: number
  estimatedMonthlyRevenueMin?: number
  estimatedMonthlyRevenueMax?: number
  launchTimeline?: string
  difficultyLevel?: string
  territoryStatus: 'available' | 'limited' | 'sold'
  shortDescription: string
}

const TERRITORY_BADGE: Record<string, { label: string; className: string }> = {
  available: { label: 'Territories Available', className: 'bg-field-50 text-field-600' },
  limited: { label: 'Limited Availability', className: 'bg-harvest-100 text-harvest-700' },
  sold: { label: 'Sold Out', className: 'bg-ink-100 text-ink-500' },
}

export default function ConceptCard({
  name,
  slug,
  categoryName,
  startupCostMin,
  startupCostMax,
  estimatedMonthlyRevenueMin,
  estimatedMonthlyRevenueMax,
  launchTimeline,
  difficultyLevel,
  territoryStatus,
  shortDescription,
}: Props) {
  const badge = TERRITORY_BADGE[territoryStatus] ?? TERRITORY_BADGE.available

  return (
    <Link
      href={`/concepts/${slug}`}
      className="card flex flex-col hover:border-barn-400 transition-colors duration-150 group"
    >
      {/* Category bar */}
      <div className="h-1 bg-barn-600" />

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3">
          {categoryName && (
            <span className="label-pill bg-cream text-barn-700 border border-barn-200 text-[10px]">
              {categoryName}
            </span>
          )}
          <span className={`label-pill text-[10px] ${badge.className}`}>{badge.label}</span>
        </div>

        <h3 className="font-serif font-semibold text-ink-900 mb-2 group-hover:text-barn-700 transition-colors">
          {name}
        </h3>

        <p className="text-sm text-ink-500 line-clamp-2 mb-4 flex-1">{shortDescription}</p>

        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-ink-100 text-[11px]">
          <div>
            <p className="text-ink-400 uppercase tracking-wide mb-0.5">Startup cost</p>
            <p className="font-semibold text-ink-800">
              {formatPriceRange(startupCostMin, startupCostMax)}
            </p>
          </div>
          {estimatedMonthlyRevenueMin && estimatedMonthlyRevenueMax && (
            <div>
              <p className="text-ink-400 uppercase tracking-wide mb-0.5">
                Monthly rev. <span className="normal-case font-normal">(illus.)</span>
              </p>
              <p className="font-semibold text-ink-800">
                {formatPriceRange(estimatedMonthlyRevenueMin, estimatedMonthlyRevenueMax)}/mo
              </p>
            </div>
          )}
          {launchTimeline && (
            <div>
              <p className="text-ink-400 uppercase tracking-wide mb-0.5">Launch</p>
              <p className="font-semibold text-ink-800">{launchTimeline}</p>
            </div>
          )}
          {difficultyLevel && (
            <div>
              <p className="text-ink-400 uppercase tracking-wide mb-0.5">Difficulty</p>
              <p className="font-semibold text-ink-800 capitalize">{difficultyLevel}</p>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
