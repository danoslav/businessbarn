import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'About | The Business Barn',
  description:
    'The Business Barn is a small-business planning practice built for founders who want honest analysis before they commit.',
}

export default function AboutPage() {
  return (
    <>
      <section className="bg-ink-900 text-white py-12 lg:py-16">
        <div className="site-container">
          <Breadcrumbs crumbs={[{ label: 'About' }]} />
          <p className="text-xs font-semibold uppercase tracking-widest text-harvest-400 mb-3">
            Our story
          </p>
          <h1 className="font-serif text-4xl font-bold mb-3">About The Business Barn</h1>
          <p className="text-base text-ink-300 max-w-xl">
            A small-business planning practice built for founders who want real answers before
            they sign a lease, order inventory, or quit their job.
          </p>
        </div>
      </section>

      <section className="bg-cream py-14 lg:py-20">
        <div className="site-container max-w-3xl space-y-10">
          <div>
            <h2 className="font-serif text-2xl font-bold text-ink-900 mb-4">Why we exist</h2>
            <p className="text-sm text-ink-600 leading-relaxed mb-4">
              Most small business failures are predictable. They happen because someone committed
              capital, time, and emotional energy to an idea without ever rigorously asking whether
              the demand is real, whether the numbers work, or whether they are the right person
              to run it.
            </p>
            <p className="text-sm text-ink-600 leading-relaxed mb-4">
              That is not a failure of ambition. It is a failure of the planning process most
              founders have access to. Business plan templates ask you to fill in a market size
              number. Advisors give vague encouragement. Online courses sell the dream of
              entrepreneurship without stress-testing the conditions for success.
            </p>
            <p className="text-sm text-ink-600 leading-relaxed">
              The Business Barn exists to offer something different: honest, structured,
              research-based planning that surfaces the hard questions before you pay for them.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-ink-900 mb-4">What we believe</h2>
            <ul className="space-y-4">
              {[
                {
                  lead: 'The best business plan is honest.',
                  body: 'A plan that inflates your addressable market or ignores a dominant competitor is not a plan. It is a wish list. We document what needs to be true for the business to work.',
                },
                {
                  lead: 'Real founders deserve real numbers.',
                  body: 'Not hockey-stick projections. Not broad industry statistics. Real local demand signals, real competitor names, real cost assumptions tied to real inputs.',
                },
                {
                  lead: 'A good plan can say no.',
                  body: 'If the concept does not hold up under scrutiny, we will say so clearly, specifically, and with reasoning. That is part of the value.',
                },
                {
                  lead: 'The decision is always yours.',
                  body: 'We give you the clearest picture we can build. What you do with it is entirely your call. We are not here to manage your business. We are here to help you decide whether to start it.',
                },
              ].map(({ lead, body }) => (
                <li key={lead} className="text-sm text-ink-600 leading-relaxed">
                  <strong className="font-semibold text-ink-900">{lead}</strong> {body}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white border border-ink-200 rounded-lg p-7">
            <h2 className="font-serif text-xl font-bold text-ink-900 mb-3">
              Ready to start?
            </h2>
            <p className="text-sm text-ink-600 leading-relaxed mb-5">
              The first step is a free 20-minute planning call. No pitch, no pressure. Just
              honest questions to find out if we are the right fit for what you are building.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/book-a-call" className="btn-primary" data-ga-cta="about_book_call">
                Book a planning call →
              </Link>
              <Link href="/consulting" className="btn-secondary" data-ga-cta="about_consulting">
                See our packages
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
