import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Sell Your Business in B.C. | Free Valuation',
  description:
    'Get a free, no-obligation business valuation and connect with qualified buyers across B.C. Confidential, professionally managed process from first conversation to close.',
}

const PROCESS = [
  {
    step: '01',
    title: 'Free Valuation',
    body: 'Tell us about your business. We provide a no-obligation market assessment within 48 hours.',
  },
  {
    step: '02',
    title: 'Listing & Marketing',
    body: 'We prepare a confidential information memorandum and market your business to qualified buyers.',
  },
  {
    step: '03',
    title: 'Buyer Matching',
    body: 'We screen and qualify all enquiries. You only meet buyers who are serious and financially capable.',
  },
  {
    step: '04',
    title: 'Negotiation & Close',
    body: 'We guide you through offers, due diligence, and transition — protecting your interests throughout.',
  },
]

const FAQS = [
  {
    q: 'How is my business valued?',
    a: 'We use a combination of earnings multiples (SDE, EBITDA), comparable transactions, and asset values appropriate to your industry and B.C. market conditions.',
  },
  {
    q: 'How long does it take to sell?',
    a: 'Most businesses sell within 6–12 months of listing. Timeline depends on price, industry, and buyer demand. We\'ll give you a realistic estimate based on your specific situation.',
  },
  {
    q: 'Is the process confidential?',
    a: 'Yes. We never disclose your business name publicly without your consent. All buyers sign an NDA before receiving details.',
  },
  {
    q: 'What does it cost to list?',
    a: 'There are no upfront fees. We earn a success fee on completion. You only pay if we close a deal.',
  },
]

export default function SellPage() {
  return (
    <>
      <section className="bg-forest-950 text-white py-14">
        <div className="site-container max-w-2xl">
          <p className="text-amber-400 text-xs font-semibold uppercase tracking-widest mb-2">
            Side One — Sellers
          </p>
          <h1 className="font-serif text-4xl font-bold mb-4">
            Sell Your Business with Confidence
          </h1>
          <p className="text-ink-300 text-lg leading-relaxed mb-8">
            We handle buyer qualification, confidential marketing, negotiation, and transition —
            so you can focus on running the business until the day you sign.
          </p>
          <Link href="/valuation" className="btn-primary px-8 py-4 text-base">
            Get a Free Valuation
          </Link>
        </div>
      </section>

      {/* Process */}
      <section className="section bg-cream">
        <div className="site-container">
          <h2 className="font-serif text-3xl font-bold text-ink-900 mb-10 text-center">
            How the Process Works
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROCESS.map(({ step, title, body }) => (
              <div key={step}>
                <p className="font-serif text-4xl font-bold text-amber-500 mb-3">{step}</p>
                <h3 className="font-serif text-lg font-semibold text-ink-900 mb-2">{title}</h3>
                <p className="text-sm text-ink-500 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why BusinessBARN */}
      <section className="section bg-white">
        <div className="site-container max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl font-bold text-ink-900 mb-4">
            Why Sell with BusinessBARN?
          </h2>
          <div className="grid sm:grid-cols-3 gap-6 mt-8 text-left">
            {[
              {
                title: 'B.C.-Focused',
                body: 'We know the B.C. market. Our buyer network is local, qualified, and active.',
              },
              {
                title: 'No Upfront Fees',
                body: 'Success-only model. You pay nothing until your business sells.',
              },
              {
                title: 'Confidential by Default',
                body: 'Your staff, customers, and competitors won\'t know you\'re selling until you decide.',
              },
            ].map(({ title, body }) => (
              <div key={title} className="card p-5">
                <h3 className="font-semibold text-ink-900 mb-2">{title}</h3>
                <p className="text-sm text-ink-500">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section bg-ink-50">
        <div className="site-container max-w-2xl mx-auto">
          <h2 className="font-serif text-2xl font-bold text-ink-900 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {FAQS.map(({ q, a }) => (
              <div key={q}>
                <h3 className="font-semibold text-ink-900 mb-1">{q}</h3>
                <p className="text-sm text-ink-600 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-amber-600 text-white text-center">
        <div className="site-container max-w-md mx-auto">
          <h2 className="font-serif text-2xl font-bold mb-2">Ready to find out what your business is worth?</h2>
          <p className="text-amber-100 text-sm mb-6">Free, no-obligation. Takes 5 minutes.</p>
          <Link href="/valuation" className="inline-flex items-center px-8 py-4 bg-white text-amber-700 font-semibold rounded hover:bg-amber-50 transition-colors">
            Start My Free Valuation
          </Link>
        </div>
      </section>
    </>
  )
}
