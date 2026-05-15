import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Contact | The Business Barn',
  description:
    'Get in touch with The Business Barn. For most enquiries, booking a planning call is the fastest way to get started.',
}

export default function ContactPage() {
  return (
    <>
      <section className="bg-ink-900 text-white py-12">
        <div className="site-container">
          <Breadcrumbs crumbs={[{ label: 'Contact' }]} />
          <h1 className="font-serif text-3xl font-bold mb-3">Get in touch</h1>
          <p className="text-base text-ink-300 max-w-xl">
            For most enquiries, the fastest route is to book a planning call. For everything
            else, email us directly.
          </p>
        </div>
      </section>

      <section className="bg-cream py-14">
        <div className="site-container max-w-2xl space-y-8">
          <div className="card p-8">
            <h2 className="font-serif text-xl font-bold text-ink-900 mb-2">
              Book a planning call
            </h2>
            <p className="text-sm text-ink-600 leading-relaxed mb-5">
              Tell us about your idea and we will arrange a free 20-minute fit call within one
              business day.
            </p>
            <Link href="/book-a-call" className="btn-primary">
              Fill in the planning call form →
            </Link>
          </div>

          <div className="card p-8">
            <h2 className="font-serif text-xl font-bold text-ink-900 mb-2">Email us</h2>
            <p className="text-sm text-ink-600 leading-relaxed mb-5">
              For partnership enquiries, media, or anything else:
            </p>
            <a
              href="mailto:hello@thebusinessbarn.ca"
              className="text-barn-600 font-semibold hover:underline"
            >
              hello@thebusinessbarn.ca
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
