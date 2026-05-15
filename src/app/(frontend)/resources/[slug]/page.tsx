import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import { getResourceBySlug } from '@/lib/payload'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const r = await getResourceBySlug(slug).catch(() => null)
  if (!r) return {}
  return {
    title: `${r.title} | The Business Barn`,
    description: r.excerpt ?? undefined,
  }
}

export default async function ResourceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const r = await getResourceBySlug(slug).catch(() => null)
  if (!r) notFound()

  return (
    <>
      <section className="bg-ink-900 text-white py-12">
        <div className="site-container">
          <Breadcrumbs crumbs={[{ label: 'Resources', href: '/resources' }, { label: r.title }]} />
          <h1 className="font-serif text-3xl lg:text-4xl font-bold mt-4">{r.title}</h1>
          {r.excerpt && <p className="text-base text-ink-300 mt-3 max-w-xl">{r.excerpt}</p>}
          <div className="flex gap-4 mt-4 text-xs text-ink-400">
            {r.author && <span>By {r.author}</span>}
            {r.readingTime && <span>{r.readingTime} min read</span>}
          </div>
        </div>
      </section>

      <section className="bg-cream py-12">
        <div className="site-container max-w-3xl">
          {r.content ? (
            <div className="prose prose-sm max-w-none text-ink-700">
              {/* Rich text rendering — simplified string fallback */}
              <p className="text-ink-500 italic text-sm">
                [Content rendered from CMS — requires rich text renderer]
              </p>
            </div>
          ) : null}

          <div className="mt-12 pt-8 border-t border-ink-200 flex flex-wrap gap-4">
            <Link href="/resources" className="btn-ghost text-ink-500">
              ← Back to Resources
            </Link>
            <Link href="/book-a-call" className="btn-primary">
              Book a planning call →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
