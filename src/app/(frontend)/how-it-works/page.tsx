import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'How It Works | The Business Barn',
  description:
    'From your first idea to a plan that holds up under scrutiny — here is exactly how we work, what we need from you, and what you get back.',
}

const STEPS = [
  {
    number: '01',
    heading: 'Tell us about your idea',
    body: 'You share a description of the business, who you think the customer is, and where you are considering operating. A one-page overview, a rough paragraph, or a conversation — all fine. We handle the research.',
  },
  {
    number: '02',
    heading: 'We choose the right package together',
    body: 'We ask a few questions about your decision: Are you validating or committing? Do you need financial projections? Are you applying for a loan or grant? The right package depth depends on what you are actually deciding.',
  },
  {
    number: '03',
    heading: 'We run the eight-question framework',
    body: 'Every engagement follows the same eight-layer methodology: market, competition, revenue pressure, cost structure, location, digital, founder fit, and risk. The depth of each layer scales with your package.',
  },
  {
    number: '04',
    heading: 'We build your plan document',
    body: 'You get a clear, structured document — not a template with your words swapped in, but a researched plan with real numbers, real competitor names, and honest risk assessments.',
  },
  {
    number: '05',
    heading: 'You review and ask questions',
    body: 'We include a review period where you can ask for clarification or additional context. We do not re-open the research scope, but we will make sure the document is clear.',
  },
  {
    number: '06',
    heading: 'You decide what to do next',
    body: 'You get the plan in PDF and editable format. What you do with it is up to you — launch, pause, adjust, or pivot. We give you the clearest picture we can. The decision is always yours.',
  },
]

export default function HowItWorksPage() {
  return (
    <>
      <section className="bg-ink-900 text-white py-12 lg:py-16">
        <div className="site-container">
          <Breadcrumbs crumbs={[{ label: 'How It Works' }]} />
          <p className="text-xs font-semibold uppercase tracking-widest text-harvest-400 mb-3">
            Our process
          </p>
          <h1 className="font-serif text-4xl font-bold mb-3">How we work together</h1>
          <p className="text-base text-ink-300 max-w-xl">
            From first conversation to finished plan — a clear, predictable process with no
            surprises.
          </p>
        </div>
      </section>

      <section className="bg-cream py-14 lg:py-20">
        <div className="site-container max-w-3xl">
          <div className="space-y-12">
            {STEPS.map(({ number, heading, body }) => (
              <div key={number} className="flex gap-8">
                <div className="shrink-0">
                  <span className="font-serif text-4xl font-bold text-barn-600/30">{number}</span>
                </div>
                <div>
                  <h2 className="font-serif text-xl font-bold text-ink-900 mb-2">{heading}</h2>
                  <p className="text-sm text-ink-600 leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 p-8 bg-white border border-ink-200 rounded-lg">
            <h2 className="font-serif text-xl font-bold text-ink-900 mb-3">
              What we need from you
            </h2>
            <ul className="space-y-2 mb-6 text-sm text-ink-600">
              <li className="flex items-start gap-3">
                <span className="text-barn-600 font-bold mt-0.5">→</span>
                A working description of your idea (a paragraph is enough)
              </li>
              <li className="flex items-start gap-3">
                <span className="text-barn-600 font-bold mt-0.5">→</span>
                Who you think the customer is
              </li>
              <li className="flex items-start gap-3">
                <span className="text-barn-600 font-bold mt-0.5">→</span>
                Where you are considering operating (city, neighbourhood, or region)
              </li>
              <li className="flex items-start gap-3">
                <span className="text-barn-600 font-bold mt-0.5">→</span>
                Responsiveness during the research period — we may need a few clarifications
              </li>
            </ul>
            <Link href="/book-a-call" className="btn-primary" data-ga-cta="how_it_works_book_call">
              Start with a planning call →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
