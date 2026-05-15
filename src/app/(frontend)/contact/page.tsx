import type { Metadata } from 'next'
import LeadForm from '@/components/LeadForm'

export const metadata: Metadata = {
  title: 'Contact BusinessBARN',
  description:
    'Get in touch with the BusinessBARN team. Questions about buying, selling, or business concepts — we\'re happy to help.',
}

export default function ContactPage() {
  return (
    <>
      <section className="bg-forest-950 text-white py-14">
        <div className="site-container max-w-xl">
          <h1 className="font-serif text-4xl font-bold mb-3">Get in Touch</h1>
          <p className="text-ink-300 leading-relaxed">
            Questions about a listing, a concept, or just want to talk through your options? We
            respond to every enquiry within one business day.
          </p>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="site-container">
          <div className="grid lg:grid-cols-2 gap-16 max-w-4xl mx-auto">
            <div>
              <h2 className="font-serif text-2xl font-semibold text-ink-900 mb-6">
                How can we help?
              </h2>
              <div className="space-y-4">
                {[
                  { label: 'Buying a business', desc: 'Browse our listings or tell us what you\'re looking for.' },
                  { label: 'Selling your business', desc: 'Get a free valuation and learn about the process.' },
                  { label: 'Business concepts', desc: 'Explore what\'s available and request a no-pressure briefing.' },
                  { label: 'General enquiry', desc: 'Anything else — just say hello.' },
                ].map(({ label, desc }) => (
                  <div key={label} className="card p-4">
                    <p className="font-semibold text-ink-800 text-sm">{label}</p>
                    <p className="text-sm text-ink-500 mt-0.5">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-6">
              <h2 className="font-serif text-lg font-semibold text-ink-900 mb-4">
                Send a Message
              </h2>
              <LeadForm
                packageInterest="general"
                sourceURL="/contact"
                showTerritory
                showMessage
                ctaLabel="Send Message"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
