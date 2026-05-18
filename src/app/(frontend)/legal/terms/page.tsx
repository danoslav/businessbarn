import type { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Terms of Service | The Business Barn',
  description: 'Terms governing your use of The Business Barn website and services.',
}

export default function TermsPage() {
  return (
    <>
      <section className="bg-ink-900 text-white py-12">
        <div className="site-container">
          <Breadcrumbs crumbs={[{ label: 'Legal', href: '/legal/terms' }, { label: 'Terms of Service' }]} />
          <h1 className="font-serif text-3xl font-bold">Terms of Service</h1>
        </div>
      </section>
      <section className="bg-cream py-12">
        <div className="site-container max-w-3xl prose prose-sm text-ink-700">
          <p className="text-sm text-ink-400 mb-8">Last updated: {new Date().getFullYear()}</p>

          <p>
            By accessing or using the website located at thebusinessbarn.ca (the
            &ldquo;Site&rdquo;) or any services offered by The Business Barn
            (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;), you agree to be bound
            by these Terms of Service. If you do not agree, do not use the Site or our services.
          </p>

          <h2>Services</h2>
          <p>
            The Business Barn provides business planning consulting services and a marketplace of
            business concept information. Consulting engagements are subject to a separate
            agreement provided at the time of engagement.
          </p>

          <h2>Use of site</h2>
          <p>You agree to use the Site only for lawful purposes. You must not:</p>
          <ul>
            <li>Misrepresent your identity or affiliation</li>
            <li>Scrape, copy, or redistribute our content without permission</li>
            <li>Use automated tools to access or query the Site at scale</li>
            <li>Attempt to gain unauthorized access to any part of the Site</li>
          </ul>

          <h2>Intellectual property</h2>
          <p>
            All content on this Site, including planning frameworks, concept descriptions, text,
            and design, is owned by The Business Barn unless otherwise stated. You may not
            reproduce or redistribute it without written permission.
          </p>

          <h2>No professional advice</h2>
          <p>
            Information on this Site is provided for general educational and planning purposes only.
            It does not constitute legal, financial, tax, or investment advice. Seek independent
            professional advice before making any business decision.
          </p>

          <h2>Limitation of liability</h2>
          <p>
            To the maximum extent permitted by law, The Business Barn shall not be liable for any
            indirect, incidental, or consequential damages arising from your use of the Site or
            our services.
          </p>

          <h2>Governing law</h2>
          <p>
            These Terms are governed by the laws of the Province of British Columbia and the federal
            laws of Canada applicable therein.
          </p>

          <h2>Changes</h2>
          <p>
            We may update these Terms at any time. Continued use of the Site after changes
            constitutes acceptance of the updated Terms.
          </p>

          <h2>Contact</h2>
          <p>
            Questions?{' '}
            <a href="mailto:hello@thebusinessbarn.ca" className="text-barn-600 underline">
              hello@thebusinessbarn.ca
            </a>
          </p>
        </div>
      </section>
    </>
  )
}
