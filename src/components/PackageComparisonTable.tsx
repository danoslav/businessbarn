import Link from 'next/link'

const PACKAGES = [
  { name: 'Basic', slug: 'basic', tier: 1 },
  { name: 'Accelerator', slug: 'accelerator', tier: 2 },
  { name: 'Digital Incubator', slug: 'digital-incubator', tier: 3 },
  { name: 'Superscaler', slug: 'superscaler', tier: 4, highlighted: true },
]

const ROWS: { label: string; values: (boolean | string)[] }[] = [
  { label: 'Business concept summary', values: [true, true, true, true] },
  { label: 'Customer & market overview', values: [true, true, true, true] },
  { label: 'Competitor snapshot', values: [true, true, true, true] },
  { label: 'Risk & assumption list', values: [true, true, true, true] },
  { label: 'Next-step roadmap', values: [true, true, true, true] },
  { label: 'Final business plan document', values: [true, true, true, true] },
  { label: 'Two-year revenue projection', values: [false, true, true, true] },
  { label: 'Break-even estimate', values: [false, true, true, true] },
  { label: 'Location & trade-area research', values: [false, true, true, true] },
  { label: 'Local competitor map', values: [false, true, true, true] },
  { label: 'Website & landing page plan', values: [false, false, true, true] },
  { label: 'Local SEO checklist', values: [false, false, true, true] },
  { label: 'Social & content plan', values: [false, false, true, true] },
  { label: 'Launch funnel outline', values: [false, false, true, true] },
  { label: 'Measurement plan', values: [false, false, true, true] },
  { label: 'Funding-readiness checklist', values: [false, false, false, true] },
  { label: 'Grant & funding opportunity scan', values: [false, false, false, true] },
  { label: 'Draft funding narrative', values: [false, false, false, true] },
  { label: 'Use-of-funds summary', values: [false, false, false, true] },
]

export default function PackageComparisonTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-ink-200">
            <th className="text-left py-3 pr-4 text-ink-500 font-medium w-1/3">Deliverable</th>
            {PACKAGES.map((pkg) => (
              <th
                key={pkg.slug}
                className={`text-center py-3 px-3 font-serif font-semibold text-base ${
                  pkg.highlighted ? 'text-barn-600' : 'text-ink-900'
                }`}
              >
                <Link href={`/consulting/${pkg.slug}`} className="hover:underline">
                  {pkg.name}
                </Link>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row, i) => (
            <tr key={i} className={`border-b border-ink-100 ${i % 2 === 0 ? 'bg-white' : 'bg-ink-50/30'}`}>
              <td className="py-2.5 pr-4 text-ink-700">{row.label}</td>
              {row.values.map((val, j) => (
                <td key={j} className="text-center py-2.5 px-3">
                  {val === true ? (
                    <span className="text-field-600 font-bold">✓</span>
                  ) : val === false ? (
                    <span className="text-ink-300">—</span>
                  ) : (
                    <span className="text-ink-600">{val}</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t border-ink-200">
            <td className="py-4" />
            {PACKAGES.map((pkg) => (
              <td key={pkg.slug} className="text-center py-4 px-3">
                <Link
                  href={`/consulting/${pkg.slug}`}
                  className={pkg.highlighted ? 'btn-primary text-xs py-2' : 'btn-secondary text-xs py-2'}
                >
                  View {pkg.name}
                </Link>
              </td>
            ))}
          </tr>
        </tfoot>
      </table>
    </div>
  )
}
