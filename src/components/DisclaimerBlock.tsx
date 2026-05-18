import Link from 'next/link'

type Props = {
  short?: boolean
}

export default function DisclaimerBlock({ short = false }: Props) {
  return (
    <div className="notice-warning" role="note" aria-label="Earnings and financial disclaimer">
      <p className="font-semibold text-ink-800 mb-1">Financial figures are illustrative only</p>
      <p>
        Revenue, margin, and startup cost estimates shown for Business Concepts are based on
        modelled assumptions and industry benchmarks. They are{' '}
        <strong>not a guarantee or prediction of your actual results</strong>. Individual outcomes
        vary significantly based on location, operator skill, market conditions, and execution.
        {!short && (
          <>
            {' '}
            You should conduct your own independent research and consult with qualified financial
            and legal professionals before making any business commitment.{' '}
            <Link href="/legal/earnings-disclaimer" className="underline hover:text-barn-700">
              Read our full Earnings Disclaimer →
            </Link>
          </>
        )}
      </p>
    </div>
  )
}
