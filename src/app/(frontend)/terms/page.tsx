import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'BusinessBARN terms of service.',
}

export default function TermsPage() {
  return (
    <section className="section bg-cream">
      <div className="site-container max-w-2xl">
        <h1 className="font-serif text-3xl font-bold text-ink-900 mb-2">Terms of Service</h1>
        <p className="text-sm text-ink-400 mb-10">Last updated: May 2026</p>
        <div className="prose prose-sm max-w-none text-ink-700 space-y-6 leading-relaxed">
          <p>
            By accessing this website, you agree to these terms. If you do not agree, please do not
            use the site.
          </p>
          <h2 className="font-serif text-xl font-semibold text-ink-900 mt-8 mb-2">
            No Franchise Offering
          </h2>
          <p>
            Nothing on this site constitutes an offer to sell a franchise. Business concept listings
            on Side Two are informational only. Revenue figures are illustrative estimates and are
            not a guarantee of earnings. Territory exclusivity is subject to availability and formal
            written agreement. Prospective operators must seek independent legal and financial advice
            before committing to any business opportunity.
          </p>
          <h2 className="font-serif text-xl font-semibold text-ink-900 mt-8 mb-2">
            Listing Accuracy
          </h2>
          <p>
            BusinessBARN makes reasonable efforts to ensure listing information is accurate.
            However, all information is provided &ldquo;as is&rdquo; without warranty. Buyers are
            responsible for conducting their own due diligence before entering into any transaction.
          </p>
          <h2 className="font-serif text-xl font-semibold text-ink-900 mt-8 mb-2">
            Limitation of Liability
          </h2>
          <p>
            To the fullest extent permitted by law, BusinessBARN is not liable for any indirect,
            incidental, or consequential damages arising from use of this site or reliance on any
            listing or concept information.
          </p>
          <h2 className="font-serif text-xl font-semibold text-ink-900 mt-8 mb-2">
            Governing Law
          </h2>
          <p>
            These terms are governed by the laws of the Province of British Columbia and the federal
            laws of Canada applicable therein.
          </p>
          <h2 className="font-serif text-xl font-semibold text-ink-900 mt-8 mb-2">Contact</h2>
          <p>
            Questions about these terms?{' '}
            <a href="mailto:hello@businessbarn.ca" className="underline text-forest-800">
              hello@businessbarn.ca
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
