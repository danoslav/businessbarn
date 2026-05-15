import type { Metadata } from 'next'
import FAQAccordion from '@/components/FAQAccordion'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | The Business Barn',
  description:
    'Answers to the most common questions about our business planning packages, process, and business concept marketplace.',
}

const GENERAL = [
  {
    question: 'Who is The Business Barn for?',
    answer:
      'We work with founders at the decision stage — people who have a business idea they are taking seriously and want to understand whether it can actually work before they commit time, money, or a lease. We are not a startup incubator, an investor, or a coaching service. We are a business planning and analysis practice.',
  },
  {
    question: 'What does The Business Barn actually do?',
    answer:
      'Two things. First, we offer structured business planning packages — you bring an idea, we run it through an eight-question framework and give you a researched, honest plan document. Second, we offer a marketplace of pre-vetted business concepts with startup cost ranges, revenue models, and operator fit guidance already built in.',
  },
  {
    question: 'Can you help me if I do not have an idea yet?',
    answer:
      'Yes. Our Business Concepts marketplace is designed for exactly this situation — founders who want to build something but have not settled on a specific concept. Each concept has been researched and modelled so you can evaluate fit before you commit.',
  },
  {
    question: 'Are you based in Canada?',
    answer:
      'Yes. We work primarily with Canadian founders, and our location research is focused on Canadian markets. Most of our work is currently in British Columbia, but we can research trade areas across Canada.',
  },
]

const PACKAGES = [
  {
    question: 'What is the difference between your planning packages?',
    answer:
      'The four packages differ in depth, not in quality. The Basic Plan validates the concept. The Accelerator adds financial projections and location research. The Digital Incubator adds a full digital go-to-market layer. The Superscaler adds funding-readiness documentation. You choose the depth that matches your decision.',
  },
  {
    question: 'How long does a planning engagement take?',
    answer:
      'The Basic Plan takes 7–10 business days. The Accelerator takes 12–15 days. The Digital Incubator takes 15–20 days. The Superscaler takes 20–30 days. All timelines assume reasonable responsiveness from you if we need clarifications.',
  },
  {
    question: 'Do you guarantee the plan will work?',
    answer:
      'No planning service can guarantee business success. What we guarantee is honest, independent analysis based on real research — not templates filled with your words. We will tell you clearly when the numbers do not support the concept.',
  },
  {
    question: 'What if my idea is not viable?',
    answer:
      'That is one of the most valuable things a planning process can surface. If demand evidence is weak, competition is too strong, or the cost structure does not support the model, we will say so clearly with specific reasoning. You can decide how to respond.',
  },
  {
    question: 'Can I upgrade between tiers after starting?',
    answer:
      'Yes. If you start with the Basic Plan and want to extend the scope, you pay the difference and we apply the work already completed.',
  },
]

const CONCEPTS = [
  {
    question: 'What is a Business Concept?',
    answer:
      'A Business Concept is a researched, modelled business idea that has been run through our eight-question framework before you see it. Each concept includes a business type description, startup cost range, illustrative revenue model, operator fit guidance, territory availability, and honest risk assessment.',
  },
  {
    question: 'Are the revenue figures guaranteed?',
    answer:
      'No. All revenue, margin, and startup cost figures shown for Business Concepts are illustrative estimates based on modelled assumptions and industry benchmarks. They are not a prediction or guarantee of your results. Individual outcomes vary significantly based on location, operator skill, market conditions, and execution.',
  },
  {
    question: 'What does "territory available" mean?',
    answer:
      'Territory availability indicates whether the concept is currently being pursued by other operators through The Business Barn in a given region. "Available" means no active operator has claimed the concept in your area. It does not guarantee exclusivity or any legal protection of territory.',
  },
  {
    question: 'Is purchasing a Business Concept the same as buying a franchise?',
    answer:
      'No. We provide business planning and analysis services — we do not sell franchise rights, require royalties, or mandate operating standards. Business Concepts are independently operated ventures. You own and run your business according to your own judgment.',
  },
  {
    question: 'Can I request a concept that is not in the marketplace?',
    answer:
      'Yes. If you have a specific business type or category in mind, book a planning call and we will discuss whether a custom concept development engagement makes sense.',
  },
]

const SECTIONS = [
  { heading: 'General', items: GENERAL },
  { heading: 'Planning packages', items: PACKAGES },
  { heading: 'Business concepts', items: CONCEPTS },
]

export default function FAQPage() {
  return (
    <>
      <section className="bg-ink-900 text-white py-12 lg:py-16">
        <div className="site-container">
          <Breadcrumbs crumbs={[{ label: 'FAQ' }]} />
          <h1 className="font-serif text-4xl font-bold mb-3">Frequently asked questions</h1>
          <p className="text-base text-ink-300 max-w-xl">
            Everything you need to know about how we work and what to expect.
          </p>
        </div>
      </section>

      <section className="bg-cream py-14 lg:py-20">
        <div className="site-container max-w-3xl space-y-14">
          {SECTIONS.map(({ heading, items }) => (
            <div key={heading}>
              <h2 className="font-serif text-xl font-bold text-ink-900 mb-6 pb-3 border-b border-ink-200">
                {heading}
              </h2>
              <FAQAccordion items={items} />
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
