import type { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Earnings Disclaimer | The Business Barn',
  description:
    'Revenue, margin, and cost figures shown on this site are illustrative only and are not a guarantee of results.',
}

export default function EarningsDisclaimerPage() {
  return (
    <>
      <section className="bg-ink-900 text-white py-12">
        <div className="site-container">
          <Breadcrumbs crumbs={[{ label: 'Legal', href: '/legal/terms' }, { label: 'Earnings Disclaimer' }]} />
          <h1 className="font-serif text-3xl font-bold">Earnings Disclaimer</h1>
        </div>
      </section>
      <section className="bg-cream py-12">
        <div className="site-container max-w-3xl prose prose-sm text-ink-700">
          <p className="text-sm text-ink-400 mb-8">Last updated: {new Date().getFullYear()}</p>

          <p>
            The Business Barn (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) provides
            business planning services and a marketplace of business concept information. All
            financial figures, including but not limited to startup cost estimates, monthly
            revenue projections, gross margin ranges, and break-even estimates, are{' '}
            <strong>illustrative estimates only</strong>.
          </p>

          <h2>No guarantee of results</h2>
          <p>
            Figures shown for Business Concepts and within planning documents are based on modelled
            assumptions, industry benchmarks, and publicly available market data. They are provided
            for educational and planning purposes only. They are <strong>not</strong> a prediction,
            promise, or guarantee of the financial results you will achieve.
          </p>

          <h2>Individual results vary</h2>
          <p>
            Your actual results will depend on many factors outside our control, including but not
            limited to:
          </p>
          <ul>
            <li>Your specific location, trade area, and local market conditions</li>
            <li>Your experience, skills, and operational execution</li>
            <li>Economic conditions and competitive changes</li>
            <li>Your capital, staffing, and operational decisions</li>
            <li>Timing, seasonality, and external events</li>
          </ul>

          <h2>Not professional financial or legal advice</h2>
          <p>
            Nothing on this website or in any planning document we produce constitutes financial,
            legal, tax, or investment advice. You should consult qualified independent professionals
            , including accountants, lawyers, and financial advisors, before making any business
            commitment.
          </p>

          <h2>Business concepts are not franchises</h2>
          <p>
            Business Concepts available through The Business Barn are independently operated
            ventures. We do not sell franchise rights, guarantee exclusivity, or mandate operating
            standards. Any revenue figures displayed are illustrative benchmarks, not earnings
            claims.
          </p>

          <h2>Contact</h2>
          <p>
            If you have questions about this disclaimer, contact us at{' '}
            <a href="mailto:hello@thebusinessbarn.ca" className="text-barn-600 underline">
              hello@thebusinessbarn.ca
            </a>
            .
          </p>
        </div>
      </section>
    </>
  )
}
