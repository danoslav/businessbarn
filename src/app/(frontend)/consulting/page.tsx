import type { Metadata } from 'next'
import Link from 'next/link'
import PackageCard from '@/components/PackageCard'
import PackageComparisonTable from '@/components/PackageComparisonTable'
import FAQAccordion from '@/components/FAQAccordion'
import HeroPanel from '@/components/HeroPanel'
import { getConsultingPackages } from '@/lib/payload'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Business Planning Packages | The Business Barn',
  description:
    'Choose the depth of planning that fits your decision. Four tiers from market validation to full growth planning with funding-readiness.',
}

const FAQ_ITEMS = [
  {
    question: 'How long does a planning engagement take?',
    answer:
      'Timelines vary by package. The Basic Plan typically takes 7–10 business days; the Superscaler Plan can take 3–5 weeks depending on research depth and your responsiveness to information requests.',
  },
  {
    question: 'Do I need a business idea before booking?',
    answer:
      'You need a working idea — a rough description of what the business does, who the customer is, and roughly where you want to operate. You do not need a polished pitch or any financial projections.',
  },
  {
    question: 'Do you guarantee the plan will work?',
    answer:
      'No planning service can guarantee business success. What we guarantee is honest, independent analysis and clear documentation of the assumptions that need to hold true. We will tell you when the numbers do not support the concept.',
  },
  {
    question: 'What if my idea is not viable?',
    answer:
      "That is one of the most valuable things a planning process can surface. If our research identifies major demand, cost, or competitive issues, we will say so clearly — with specific reasoning, not vague caution. You can decide how to respond to that information.",
  },
  {
    question: 'Can I upgrade between tiers?',
    answer:
      'Yes. If you start with the Basic Plan and want deeper analysis, you can pay the difference and upgrade. We apply the work already done and extend the scope.',
  },
  {
    question: 'Is this the same as franchising?',
    answer:
      'No. We provide planning and analysis services. We do not sell franchise rights, require royalties, or mandate operating standards. Our Business Concepts are independently operated ventures — not franchised systems.',
  },
]

export default async function ConsultingPage() {
  const packages = await getConsultingPackages().catch(() => [])

  const staticPackages = [
    {
      name: 'Basic Plan',
      slug: 'basic',
      tagline: 'Validate the concept, understand the risk',
      bestFor: ['First-time founders', 'Early-stage ideas', 'Validating before committing'],
      deliverables: [
        'Business concept summary',
        'Customer & market overview',
        'Competitor snapshot',
        'Risk & assumption list',
        'Next-step roadmap',
        'Final business plan document',
      ],
      priceLabel: 'Contact for pricing',
      highlighted: false,
    },
    {
      name: 'Accelerator Plan',
      slug: 'accelerator',
      tagline: 'Build on validation with financial depth',
      bestFor: ['Founders ready to plan for real', 'Location-dependent businesses', 'Established concepts needing numbers'],
      deliverables: [
        'Everything in Basic',
        'Two-year revenue projection',
        'Break-even estimate',
        'Location & trade-area research',
        'Local competitor map',
      ],
      priceLabel: 'Contact for pricing',
      highlighted: false,
    },
    {
      name: 'Digital Incubator',
      slug: 'digital-incubator',
      tagline: 'Add a complete digital go-to-market layer',
      bestFor: ['Founders launching with a digital strategy', 'Businesses with online customer acquisition', 'Location businesses with digital demand'],
      deliverables: [
        'Everything in Accelerator',
        'Website & landing page plan',
        'Local SEO checklist',
        'Social & content plan',
        'Launch funnel outline',
        'Measurement plan',
      ],
      priceLabel: 'Contact for pricing',
      highlighted: true,
    },
    {
      name: 'Superscaler Plan',
      slug: 'superscaler',
      tagline: 'Full planning for funding-ready founders',
      bestFor: ['Founders seeking investment or funding', 'Multi-location expansion plans', 'Businesses needing a full funding narrative'],
      deliverables: [
        'Everything in Digital Incubator',
        'Funding-readiness checklist',
        'Grant & funding opportunity scan',
        'Draft funding narrative',
        'Use-of-funds summary',
      ],
      priceLabel: 'Contact for pricing',
      highlighted: false,
    },
  ]

  const displayPackages = packages.length > 0
    ? packages.map((pkg, i) => ({
        name: pkg.name,
        slug: pkg.slug,
        tagline: pkg.tagline ?? undefined,
        bestFor: Array.isArray(pkg.bestFor) ? pkg.bestFor.map((b: { item: string }) => b.item) : [],
        deliverables: Array.isArray(pkg.deliverables) ? pkg.deliverables.map((d: { item: string }) => d.item) : [],
        priceLabel: pkg.priceLabel ?? undefined,
        ctaLabel: pkg.ctaLabel ?? undefined,
        highlighted: i === 2,
      }))
    : staticPackages

  return (
    <>
      <HeroPanel
        eyebrow="Business planning packages"
        heading="Choose the depth that fits your decision"
        body="Every engagement runs through the same eight-question framework. You choose how deep to go."
        ctas={[
          { label: 'Book a planning call', href: '/book-a-call', gaCta: 'consulting_hero_book_call' },
          {
            label: 'Learn our methodology',
            href: '/methodology',
            variant: 'outline-white',
            gaCta: 'consulting_hero_methodology',
          },
        ]}
      />

      {/* Package cards */}
      <section className="bg-cream py-14 lg:py-20">
        <div className="site-container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayPackages.map((pkg) => (
              <PackageCard
                key={pkg.slug}
                {...pkg}
              />
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-sm text-ink-500">
              Not sure which package fits your situation?{' '}
              <Link
                href="/book-a-call"
                className="text-barn-600 underline hover:text-barn-800"
                data-ga-cta="consulting_fit_call_link"
              >
                Book a free 20-minute fit call →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="bg-white py-14 lg:py-20 border-t border-ink-100">
        <div className="site-container">
          <h2 className="font-serif text-2xl font-bold text-ink-900 mb-8">
            What&apos;s included in each package
          </h2>
          <PackageComparisonTable />
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-cream py-14 lg:py-20 border-t border-ink-100">
        <div className="site-container max-w-3xl">
          <h2 className="font-serif text-2xl font-bold text-ink-900 mb-8">
            Frequently asked questions
          </h2>
          <FAQAccordion items={FAQ_ITEMS} />
        </div>
      </section>
    </>
  )
}
