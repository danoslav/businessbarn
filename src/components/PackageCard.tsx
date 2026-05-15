import Link from 'next/link'

type Props = {
  name: string
  slug: string
  tagline?: string
  bestFor?: string[]
  deliverables?: string[]
  priceLabel?: string
  ctaLabel?: string
  highlighted?: boolean
}

export default function PackageCard({
  name,
  slug,
  tagline,
  bestFor = [],
  deliverables = [],
  priceLabel,
  ctaLabel = 'Book a planning call',
  highlighted = false,
}: Props) {
  return (
    <div
      className={`card flex flex-col h-full ${
        highlighted ? 'border-barn-600 ring-1 ring-barn-600' : ''
      }`}
    >
      {highlighted && (
        <div className="bg-barn-600 text-white text-center text-xs font-semibold py-1.5 uppercase tracking-wider">
          Most Popular
        </div>
      )}
      <div className="p-6 flex flex-col h-full">
        <div className="mb-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-barn-600 mb-1">
            Package
          </p>
          <h3 className="font-serif text-xl font-bold text-ink-900">{name}</h3>
          {tagline && <p className="text-sm text-ink-500 mt-1">{tagline}</p>}
        </div>

        {bestFor.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-semibold text-ink-500 uppercase tracking-wide mb-2">
              Best for
            </p>
            <ul className="space-y-1">
              {bestFor.slice(0, 3).map((item, i) => (
                <li key={i} className="text-sm text-ink-600 flex items-start gap-2">
                  <span className="text-harvest-600 mt-0.5 shrink-0">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {deliverables.length > 0 && (
          <div className="mb-6 flex-1">
            <p className="text-xs font-semibold text-ink-500 uppercase tracking-wide mb-2">
              Deliverables
            </p>
            <ul className="space-y-1">
              {deliverables.slice(0, 5).map((item, i) => (
                <li key={i} className="text-sm text-ink-600 flex items-start gap-2">
                  <span className="text-field-600 mt-0.5 shrink-0">✓</span>
                  {item}
                </li>
              ))}
              {deliverables.length > 5 && (
                <li className="text-sm text-ink-400 italic">
                  + {deliverables.length - 5} more deliverables
                </li>
              )}
            </ul>
          </div>
        )}

        <div className="mt-auto pt-4 border-t border-ink-100">
          {priceLabel && (
            <p className="text-sm font-semibold text-ink-700 mb-3">{priceLabel}</p>
          )}
          <Link href={`/consulting/${slug}`} className={highlighted ? 'btn-primary w-full justify-center' : 'btn-secondary w-full justify-center'}>
            {ctaLabel}
          </Link>
        </div>
      </div>
    </div>
  )
}
