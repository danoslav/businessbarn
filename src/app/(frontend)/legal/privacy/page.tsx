import type { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Privacy Policy | The Business Barn',
  description: 'How The Business Barn collects, uses, and protects your personal information.',
}

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-ink-900 text-white py-12">
        <div className="site-container">
          <Breadcrumbs crumbs={[{ label: 'Legal', href: '/legal/terms' }, { label: 'Privacy Policy' }]} />
          <h1 className="font-serif text-3xl font-bold">Privacy Policy</h1>
        </div>
      </section>
      <section className="bg-cream py-12">
        <div className="site-container max-w-3xl prose prose-sm text-ink-700">
          <p className="text-sm text-ink-400 mb-8">Last updated: {new Date().getFullYear()}</p>

          <p>
            The Business Barn (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is
            committed to protecting your personal information in accordance with the{' '}
            <em>Personal Information Protection and Electronic Documents Act</em> (PIPEDA) and
            applicable British Columbia privacy laws.
          </p>

          <h2>What we collect</h2>
          <ul>
            <li>Contact information you submit (name, email, phone, city)</li>
            <li>Enquiry context (business type, startup budget, launch timeline)</li>
            <li>Communication records (emails, call notes)</li>
            <li>Technical data (IP address, browser type, pages visited) via analytics</li>
          </ul>

          <h2>Why we collect it</h2>
          <ul>
            <li>To respond to your enquiry and provide our services</li>
            <li>To send relevant follow-up communications you have consented to</li>
            <li>To improve the quality of our services and content</li>
            <li>To understand aggregate usage of our website</li>
          </ul>

          <h2>How we use it</h2>
          <p>
            We use your information only for the purposes described above. We do not sell, rent,
            or trade your personal information to third parties.
          </p>

          <h2>Third-party services</h2>
          <p>We use the following third-party services that may process your data:</p>
          <ul>
            <li>
              <strong>Vercel</strong>: website hosting (servers may be located outside Canada)
            </li>
            <li>
              <strong>Neon</strong>: database hosting (servers may be located outside Canada)
            </li>
          </ul>

          <h2>Data retention</h2>
          <p>
            We retain your information for as long as necessary to provide our services and
            comply with legal obligations. You may request deletion at any time.
          </p>

          <h2>Your rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Withdraw consent to communications at any time</li>
          </ul>

          <h2>Contact</h2>
          <p>
            To exercise any of these rights or to ask questions about this policy, contact us at{' '}
            <a href="mailto:hello@thebusinessbarn.ca" className="text-barn-600 underline">
              hello@thebusinessbarn.ca
            </a>
            .
          </p>
        </div>
      </section>
    </>
  )
}
