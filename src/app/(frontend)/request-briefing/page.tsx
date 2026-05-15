import type { Metadata } from 'next'
import DisclaimerBlock from '@/components/DisclaimerBlock'
import LeadForm from '@/components/LeadForm'

export const metadata: Metadata = {
  title: 'Request a Concept Briefing',
  description:
    'Request a no-pressure briefing on BusinessBARN business concepts available in B.C. We\'ll walk you through options that match your goals, budget, and territory.',
}

export default async function RequestBriefingPage({
  searchParams,
}: {
  searchParams: Promise<{ concept?: string }>
}) {
  const { concept } = await searchParams

  return (
    <>
      <section className="bg-forest-950 text-white py-14">
        <div className="site-container max-w-xl">
          <p className="text-terra-400 text-xs font-semibold uppercase tracking-widest mb-2">
            Side Two
          </p>
          <h1 className="font-serif text-4xl font-bold mb-3">Request a Concept Briefing</h1>
          <p className="text-ink-300 leading-relaxed">
            No pressure. No commitment. We&apos;ll answer your questions and help you figure out
            if any of our concepts are a good fit for your goals and location.
          </p>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="site-container">
          <div className="grid lg:grid-cols-2 gap-16 max-w-4xl mx-auto">
            <div>
              <h2 className="font-serif text-2xl font-semibold text-ink-900 mb-4">
                What to expect
              </h2>
              <ul className="space-y-3 mb-8">
                {[
                  'A 20–30 minute call with the BusinessBARN team',
                  'We\'ll cover the concepts that match your interest, budget, and territory',
                  'Full startup cost breakdown and honest discussion of risks',
                  'Answers to any questions — no sales pressure',
                  'You decide if and when you want to move forward',
                ].map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm text-ink-700">
                    <span className="text-terra-600 mt-0.5 shrink-0">→</span>
                    {point}
                  </li>
                ))}
              </ul>

              <DisclaimerBlock />
            </div>

            <div className="card p-6">
              <h2 className="font-serif text-lg font-semibold text-ink-900 mb-4">
                Book Your Briefing
              </h2>
              <LeadForm
                packageInterest="side-two"
                conceptSlug={concept}
                sourceURL="/request-briefing"
                showTerritory
                showMessage
                ctaLabel="Request My Briefing"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
