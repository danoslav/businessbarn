import type { Metadata } from 'next'
import LeadForm from '@/components/LeadForm'

export const metadata: Metadata = {
  title: 'Free Business Valuation | BusinessBARN',
  description:
    'Get a free, no-obligation business valuation from the BusinessBARN team. Find out what your B.C. business is worth in the current market.',
}

export default function ValuationPage() {
  return (
    <>
      <section className="bg-forest-950 text-white py-14">
        <div className="site-container max-w-xl">
          <h1 className="font-serif text-4xl font-bold mb-3">Free Business Valuation</h1>
          <p className="text-ink-300 leading-relaxed">
            Tell us about your business and we&apos;ll provide a no-obligation market assessment
            within 48 hours. No commitment, no cost.
          </p>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="site-container">
          <div className="grid lg:grid-cols-2 gap-16 max-w-4xl mx-auto">
            <div>
              <h2 className="font-serif text-2xl font-semibold text-ink-900 mb-4">
                What you&apos;ll get
              </h2>
              <ul className="space-y-3">
                {[
                  'A realistic market value range based on current B.C. comparable sales',
                  'An overview of buyer demand in your industry and location',
                  'Practical advice on timing, readiness, and what improves value',
                  'No pressure, no commitment — just clarity',
                ].map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm text-ink-700">
                    <span className="text-forest-700 mt-0.5 shrink-0">✓</span>
                    {point}
                  </li>
                ))}
              </ul>

              <div className="mt-8 card p-5 text-sm text-ink-600">
                <p className="font-semibold text-ink-800 mb-1">What happens next?</p>
                <p>
                  After you submit, a member of our team will reach out within one business day to
                  gather a few more details. The full valuation is then delivered by email or
                  on a brief call — your preference.
                </p>
              </div>
            </div>

            <div className="card p-6">
              <h2 className="font-serif text-lg font-semibold text-ink-900 mb-4">
                Request Your Valuation
              </h2>
              <LeadForm
                packageInterest="sell"
                sourceURL="/valuation"
                showTerritory
                showMessage
                ctaLabel="Request My Free Valuation"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
