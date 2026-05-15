import type { Metadata } from 'next'
import LeadForm from '@/components/LeadForm'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Book a Planning Call | The Business Barn',
  description:
    'Tell us about your idea and we will be in touch within one business day to arrange a free 20-minute planning fit call.',
}

export default function BookACallPage() {
  return (
    <>
      <section className="bg-ink-900 text-white py-12 lg:py-16">
        <div className="site-container">
          <Breadcrumbs crumbs={[{ label: 'Book a Planning Call' }]} />
          <p className="text-xs font-semibold uppercase tracking-widest text-harvest-400 mb-3">
            Get started
          </p>
          <h1 className="font-serif text-4xl font-bold mb-3">Bring your idea to the Barn</h1>
          <p className="text-base text-ink-300 max-w-xl">
            Fill in the form below and we will be in touch within one business day to arrange
            your free 20-minute planning fit call. No pitch required — just tell us what you
            are working on.
          </p>
        </div>
      </section>

      <section className="bg-cream py-14 lg:py-20">
        <div className="site-container">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Form */}
            <div>
              <LeadForm
                leadType="general"
                heading=""
                subheading=""
              />
            </div>

            {/* Context */}
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-xl font-bold text-ink-900 mb-4">
                  What happens next
                </h2>
                <ul className="space-y-4">
                  {[
                    {
                      step: '1',
                      text: 'We review your submission within one business day.',
                    },
                    {
                      step: '2',
                      text: 'We send you a few follow-up questions to understand your idea and decision context.',
                    },
                    {
                      step: '3',
                      text: 'We book a free 20-minute fit call — no pitch, just honest questions to make sure we are the right fit for what you need.',
                    },
                    {
                      step: '4',
                      text: 'If we are a good match, we scope the engagement and get started.',
                    },
                  ].map(({ step, text }) => (
                    <li key={step} className="flex items-start gap-4">
                      <span className="font-serif text-2xl font-bold text-barn-600/40 shrink-0">
                        {step}
                      </span>
                      <p className="text-sm text-ink-600 leading-relaxed pt-1">{text}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white border border-ink-200 rounded-lg p-6">
                <h3 className="font-semibold text-ink-900 mb-2 text-sm">
                  You do not need a polished idea
                </h3>
                <p className="text-sm text-ink-500 leading-relaxed">
                  A rough concept, a question you cannot answer, or a decision you are stuck on
                  — all good starting points. We will help you figure out what you actually need.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
