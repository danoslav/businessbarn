import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About BusinessBARN',
  description:
    'BusinessBARN is a B.C.-focused business marketplace and brokerage helping buyers, sellers, and new operators find the right opportunity.',
}

export default function AboutPage() {
  return (
    <>
      <section className="bg-forest-950 text-white py-14">
        <div className="site-container max-w-2xl">
          <h1 className="font-serif text-4xl font-bold mb-4">About BusinessBARN</h1>
          <p className="text-ink-300 text-lg leading-relaxed">
            We&apos;re a B.C.-based business marketplace and brokerage built for buyers, sellers,
            and new operators who want to do things properly.
          </p>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="site-container max-w-3xl">
          <div className="space-y-8 text-ink-700 leading-relaxed">
            <div>
              <h2 className="font-serif text-2xl font-bold text-ink-900 mb-3">What We Do</h2>
              <p>
                BusinessBARN operates on two sides. On <strong>Side One</strong>, we help business
                owners sell their businesses confidentially and connect qualified buyers with
                established, verified listings across British Columbia.
              </p>
              <p className="mt-3">
                On <strong>Side Two</strong>, we curate business concepts — proven operating models
                with territory availability in B.C. — for people who want to start something
                structured and supported, without building from scratch.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-ink-900 mb-3">Our Approach</h2>
              <p>
                We believe the best transactions happen when both sides have the right information.
                We don&apos;t hype listings. We don&apos;t oversell concepts. We give buyers and
                sellers an honest picture of what they&apos;re getting into — and we stay involved
                until the deal closes.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-ink-900 mb-3">Get in Touch</h2>
              <p>
                Whether you&apos;re buying, selling, or just exploring, we&apos;re happy to talk.
                No pressure, no pitch.
              </p>
              <div className="flex gap-4 mt-4">
                <Link href="/contact" className="btn-primary">Contact Us</Link>
                <Link href="/valuation" className="btn-secondary">Free Valuation</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
