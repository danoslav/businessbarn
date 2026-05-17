import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import { getResources } from '@/lib/payload'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'Resources | The Business Barn',
  description:
    'Guides, articles, and practical tools for founders planning their first or next business.',
}

const CATEGORY_LABELS: Record<string, string> = {
  planning: 'Business Planning',
  financials: 'Revenue & Financials',
  location: 'Location Research',
  digital: 'Digital & Marketing',
  funding: 'Funding & Grants',
  mindset: 'Founder Mindset',
  concepts: 'Business Concepts',
}

export default async function ResourcesPage() {
  const resources = await getResources().catch(() => [])

  return (
    <>
      <section className="bg-ink-900 text-white py-12 lg:py-16">
        <div className="site-container">
          <Breadcrumbs crumbs={[{ label: 'Resources' }]} />
          <p className="text-xs font-semibold uppercase tracking-widest text-harvest-400 mb-3">
            Resources
          </p>
          <h1 className="font-serif text-4xl font-bold mb-3">
            Planning tools for real founders
          </h1>
          <p className="text-base text-ink-300 max-w-xl">
            Practical guides, templates, and articles to help you ask better questions and make
            better decisions.
          </p>
        </div>
      </section>

      <section className="bg-cream py-14 lg:py-20">
        <div className="site-container">
          {resources.length === 0 ? (
            <div className="text-center py-16">
              <p className="font-serif text-xl text-ink-700 mb-2">Resources coming soon.</p>
              <p className="text-sm text-ink-500 mb-6">
                We are building out our library of guides and planning tools. In the meantime,
                start with a planning call.
              </p>
              <Link href="/book-a-call" className="btn-primary" data-ga-cta="resources_empty_book_call">
                Book a planning call →
              </Link>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.map((r) => (
                <Link
                  key={r.id}
                  href={`/resources/${r.slug}`}
                  className="card p-6 hover:border-barn-400 transition-colors group"
                >
                  {r.category && (
                    <span className="label-pill bg-cream text-barn-700 border border-barn-200 text-[10px] mb-3 inline-block">
                      {CATEGORY_LABELS[r.category] ?? r.category}
                    </span>
                  )}
                  <h2 className="font-serif font-semibold text-ink-900 mb-2 group-hover:text-barn-700 transition-colors">
                    {r.title}
                  </h2>
                  {r.excerpt && (
                    <p className="text-sm text-ink-500 line-clamp-2">{r.excerpt}</p>
                  )}
                  {r.readingTime && (
                    <p className="text-[11px] text-ink-400 mt-3">{r.readingTime} min read</p>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
