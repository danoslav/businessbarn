import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import FAQAccordion from '@/components/FAQAccordion'
import Breadcrumbs from '@/components/Breadcrumbs'
import { getConsultingPackageBySlug, getConsultingPackages } from '@/lib/payload'

export const dynamic = 'force-dynamic'

// Static fallback data when the CMS has no content yet
const STATIC_PACKAGES: Record<string, {
  name: string
  tagline: string
  shortDescription: string
  bestFor: string[]
  deliverables: string[]
  notIncluded: string[]
  turnaround: string
  priceLabel: string
  ctaLabel: string
  faq: { question: string; answer: string }[]
}> = {
  basic: {
    name: 'Basic Plan',
    tagline: 'Validate the concept, understand the risk',
    shortDescription:
      'The starting point for any serious business idea. We examine the core assumptions — who buys, what it costs, who competes, and whether the concept holds up — and give you a clear, honest summary document.',
    bestFor: [
      'First-time founders still testing the idea',
      'Experienced operators exploring a new category',
      'Founders who want clarity before spending on premises or inventory',
    ],
    deliverables: [
      'Business concept summary (what it is, who it serves, how it makes money)',
      'Customer & market overview (demand signals, customer profile)',
      'Competitor snapshot (3–5 real local competitors, competitive positioning)',
      'Risk & assumption list (what needs to be true for the model to work)',
      'Next-step roadmap (what to do after this plan)',
      'Final business plan document (PDF + editable format)',
    ],
    notIncluded: [
      'Financial projections or revenue modelling',
      'Location-specific trade area research',
      'Digital marketing plan',
      'Funding narrative or grant scan',
    ],
    turnaround: '7–10 business days',
    priceLabel: 'Contact for pricing',
    ctaLabel: 'Book a planning call',
    faq: [
      {
        question: 'What do you need from me to get started?',
        answer:
          'A working description of the business idea (a paragraph is fine), who you think the customer is, and where you are considering operating. We handle the research.',
      },
      {
        question: 'How is this different from a business plan template?',
        answer:
          'Templates give you sections to fill in. We give you researched content for each section — real competitor names, real demand signals, and honest risk assessments based on your specific idea and location.',
      },
      {
        question: 'Will you tell me if the idea is bad?',
        answer:
          'Yes. That is part of the value. If the demand evidence is weak, the competition is too strong, or the cost structure does not support the revenue model, we will say so clearly.',
      },
    ],
  },
  accelerator: {
    name: 'Accelerator Plan',
    tagline: 'Build on validation with financial depth',
    shortDescription:
      'Everything in the Basic Plan plus a two-year revenue projection, break-even estimate, and detailed location research. For founders who need numbers to make a confident decision — or to show a lender or partner.',
    bestFor: [
      'Founders ready to commit to a location or lease',
      'Businesses where local foot traffic and demographics matter',
      'Operators who need a financial model for a bank or investor conversation',
    ],
    deliverables: [
      'Everything included in the Basic Plan',
      'Two-year revenue projection (conservative, base, and optimistic scenarios)',
      'Break-even estimate (monthly revenue required, time to break-even)',
      'Location & trade-area research (demographics, foot traffic patterns, proximity analysis)',
      'Local competitor map (mapped, scored, and compared)',
    ],
    notIncluded: [
      'Digital marketing plan or SEO strategy',
      'Funding narrative or grant scan',
      'Social content planning',
    ],
    turnaround: '12–15 business days',
    priceLabel: 'Contact for pricing',
    ctaLabel: 'Book a planning call',
    faq: [
      {
        question: 'Are the revenue projections realistic?',
        answer:
          'We build three scenarios — conservative, base, and optimistic — with explicit assumptions for each. We document what needs to be true to hit each number. We do not build hockey-stick projections.',
      },
      {
        question: 'What locations can you research?',
        answer:
          'We can research any location in Canada. Trade area analysis is most detailed for urban and suburban areas with accessible demographic and foot traffic data.',
      },
    ],
  },
  'digital-incubator': {
    name: 'Digital Incubator',
    tagline: 'Add a complete digital go-to-market layer',
    shortDescription:
      'The Accelerator Plan extended with a full digital go-to-market strategy — website plan, local SEO, social and content plan, launch funnel, and measurement framework. For founders who know digital is central to their customer acquisition.',
    bestFor: [
      'Founders launching a business where customers find them online first',
      'Retail, service, and hospitality businesses competing on local search',
      'Operators building a direct-to-consumer or community-led model',
    ],
    deliverables: [
      'Everything included in the Accelerator Plan',
      'Website structure & landing page plan (sitemap, key page briefs)',
      'Local SEO checklist (Google Business Profile, citation strategy, keyword focus areas)',
      'Social & content plan (platform selection, content pillars, posting cadence)',
      'Launch funnel outline (awareness → consideration → conversion)',
      'Measurement plan (KPIs, tracking setup, 90-day milestone targets)',
    ],
    notIncluded: [
      'Funding narrative or grant scan',
      'Website or content creation (this is a plan, not an execution service)',
    ],
    turnaround: '15–20 business days',
    priceLabel: 'Contact for pricing',
    ctaLabel: 'Book a planning call',
    faq: [
      {
        question: 'Do you build the website for me?',
        answer:
          'No. The Digital Incubator gives you a detailed plan for your website and digital presence — page structure, SEO priorities, content strategy — which you or a developer/designer implements.',
      },
      {
        question: 'Which social platforms do you plan for?',
        answer:
          'We match platform selection to your customer profile and business type. We do not recommend platforms because they are popular — we recommend them because your specific customers use them.',
      },
    ],
  },
  superscaler: {
    name: 'Superscaler Plan',
    tagline: 'Full planning for funding-ready founders',
    shortDescription:
      'Our most comprehensive engagement. Includes everything in the Digital Incubator plus a funding-readiness layer — a grant and funding opportunity scan, a draft funding narrative, and a use-of-funds summary ready for lender or investor conversations.',
    bestFor: [
      'Founders applying for business loans, grants, or investment',
      'Multi-location or expansion-phase operators',
      'Businesses with significant startup capital requirements',
    ],
    deliverables: [
      'Everything included in the Digital Incubator Plan',
      'Funding-readiness checklist (gap analysis against lender and grant criteria)',
      'Grant & funding opportunity scan (federal, provincial, and municipal programs relevant to your business)',
      'Draft funding narrative (executive summary written for an external audience)',
      'Use-of-funds summary (breakdown of how capital will be deployed)',
    ],
    notIncluded: [
      'Legal or financial advice (we provide planning documents, not regulated advice)',
      'Introductions to specific investors or lenders',
      'Grant application writing (we identify opportunities; applications are your responsibility or a specialist grant writer)',
    ],
    turnaround: '20–30 business days',
    priceLabel: 'Contact for pricing',
    ctaLabel: 'Book a planning call',
    faq: [
      {
        question: 'Does the funding scan guarantee I will find grants?',
        answer:
          'No. We identify programs you may be eligible for based on your business type, location, founder profile, and sector. Eligibility is ultimately determined by the granting body. Application success depends on many factors beyond plan quality.',
      },
      {
        question: 'Is the funding narrative investor-ready?',
        answer:
          'It is a strong draft — it covers your business summary, opportunity, competitive position, use of funds, and financial projections. Most founders refine it with feedback from their lender or advisor before submitting.',
      },
    ],
  },
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const pkg = await getConsultingPackageBySlug(slug).catch(() => null)
  const fallback = STATIC_PACKAGES[slug]

  const name = pkg?.name ?? fallback?.name ?? 'Planning Package'
  const desc = pkg?.shortDescription ?? fallback?.shortDescription ?? ''

  return {
    title: `${name} | The Business Barn`,
    description: desc,
  }
}

export default async function ConsultingPackagePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const pkg = await getConsultingPackageBySlug(slug).catch(() => null)
  const fallback = STATIC_PACKAGES[slug]

  if (!pkg && !fallback) notFound()

  const data = pkg
    ? {
        name: pkg.name,
        tagline: pkg.tagline ?? '',
        shortDescription: pkg.shortDescription,
        bestFor: Array.isArray(pkg.bestFor) ? pkg.bestFor.map((b: { item: string }) => b.item) : [],
        deliverables: Array.isArray(pkg.deliverables) ? pkg.deliverables.map((d: { item: string }) => d.item) : [],
        notIncluded: Array.isArray(pkg.notIncluded) ? pkg.notIncluded.map((n: { item: string }) => n.item) : [],
        turnaround: pkg.turnaround ?? '',
        priceLabel: pkg.priceLabel ?? '',
        ctaLabel: pkg.ctaLabel ?? 'Book a planning call',
        faq: Array.isArray(pkg.faq) ? pkg.faq as { question: string; answer: string }[] : [],
      }
    : fallback!

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: data.name,
    description: data.shortDescription,
    provider: {
      '@type': 'LocalBusiness',
      name: 'The Business Barn',
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="bg-ink-900 text-white py-12 lg:py-16">
        <div className="site-container">
          <Breadcrumbs crumbs={[{ label: 'Consulting', href: '/consulting' }, { label: data.name }]} />
          <p className="text-xs font-semibold uppercase tracking-widest text-harvest-400 mb-3">
            Planning Package
          </p>
          <h1 className="font-serif text-4xl font-bold mb-3">{data.name}</h1>
          <p className="text-lg text-ink-300 max-w-xl">{data.tagline}</p>
        </div>
      </section>

      <section className="bg-cream py-14 lg:py-20">
        <div className="site-container">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-10">
              {/* Overview */}
              <div>
                <h2 className="font-serif text-xl font-bold text-ink-900 mb-4">About this package</h2>
                <p className="text-ink-600 leading-relaxed">{data.shortDescription}</p>
              </div>

              {/* Best for */}
              {data.bestFor.length > 0 && (
                <div>
                  <h2 className="font-serif text-xl font-bold text-ink-900 mb-4">Best for</h2>
                  <ul className="space-y-2">
                    {data.bestFor.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-ink-600">
                        <span className="text-harvest-600 font-bold mt-0.5">→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Deliverables */}
              {data.deliverables.length > 0 && (
                <div>
                  <h2 className="font-serif text-xl font-bold text-ink-900 mb-4">
                    What&apos;s included
                  </h2>
                  <ul className="space-y-2">
                    {data.deliverables.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-ink-600">
                        <span className="text-field-600 font-bold mt-0.5">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Not included */}
              {data.notIncluded.length > 0 && (
                <div>
                  <h2 className="font-serif text-xl font-bold text-ink-900 mb-4">
                    Not included in this package
                  </h2>
                  <ul className="space-y-2">
                    {data.notIncluded.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-ink-500">
                        <span className="text-ink-300 font-bold mt-0.5">✕</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-ink-400 mt-3">
                    Need these?{' '}
                    <Link href="/consulting" className="underline hover:text-ink-700" data-ga-cta={`consulting_detail_compare_${slug}`}>
                      Compare all packages →
                    </Link>
                  </p>
                </div>
              )}

              {/* FAQ */}
              {data.faq.length > 0 && (
                <div>
                  <h2 className="font-serif text-xl font-bold text-ink-900 mb-4">
                    Questions about this package
                  </h2>
                  <FAQAccordion items={data.faq} />
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div>
              <div className="sticky top-24 card p-6 space-y-4">
                <h2 className="font-serif text-lg font-bold text-ink-900">{data.name}</h2>
                {data.turnaround && (
                  <div className="text-sm text-ink-600">
                    <span className="font-semibold">Turnaround: </span>
                    {data.turnaround}
                  </div>
                )}
                {data.priceLabel && (
                  <div className="text-sm font-semibold text-ink-700 border-t border-ink-100 pt-4">
                    {data.priceLabel}
                  </div>
                )}
                <Link
                  href="/book-a-call"
                  className="btn-primary w-full justify-center"
                  data-ga-cta={`consulting_detail_book_call_${slug}`}
                >
                  {data.ctaLabel}
                </Link>
                <p className="text-xs text-ink-400 text-center">
                  Free 20-min fit call. No obligation.
                </p>
                <div className="border-t border-ink-100 pt-4">
                  <Link href="/consulting" className="btn-ghost text-ink-500 text-xs" data-ga-cta="consulting_detail_packages_back">
                    ← Compare all packages
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
