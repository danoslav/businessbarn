import type { Metadata } from 'next'
import LeadForm from '@/components/LeadForm'
import Breadcrumbs from '@/components/Breadcrumbs'
import WhatHappensNext from '@/components/WhatHappensNext'

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
            your free 20-minute planning fit call. No pitch required. Just tell us what you
            are working on.
          </p>
        </div>
      </section>

      <section className="bg-cream py-14 lg:py-20">
        <div className="site-container">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <LeadForm leadType="general" heading="" subheading="" />
            </div>
            <WhatHappensNext variant="sidebar" />
          </div>
        </div>
      </section>
    </>
  )
}
