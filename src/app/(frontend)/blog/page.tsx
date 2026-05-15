import type { Metadata } from 'next'
import Link from 'next/link'
import { getPosts } from '@/lib/payload'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Business Buying & Selling Advice | Blog',
  description:
    'Articles on buying, selling, and starting businesses in British Columbia. Practical guides from the BusinessBARN team.',
}

const CATEGORY_LABELS: Record<string, string> = {
  buying: 'Buying a Business',
  selling: 'Selling a Business',
  concepts: 'Business Concepts',
  insights: 'Market Insights',
  guides: 'Guides',
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string }>
}) {
  const { category, page: pageParam } = await searchParams
  const page = Math.max(1, Number(pageParam ?? 1))
  const result = await getPosts({ category, page, limit: 9 })
  const posts = result.docs

  return (
    <>
      <section className="bg-forest-950 text-white py-14">
        <div className="site-container">
          <h1 className="font-serif text-4xl font-bold mb-2">BusinessBARN Blog</h1>
          <p className="text-ink-300 max-w-xl">
            Practical advice on buying, selling, and starting businesses in B.C.
          </p>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="site-container">
          {posts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link
                  key={String(post.id)}
                  href={`/blog/${post.slug}`}
                  className="card block hover:border-forest-700 transition-colors group p-5"
                >
                  {post.category && (
                    <span className="label-pill bg-forest-50 text-forest-800 text-[10px] mb-3 inline-block">
                      {CATEGORY_LABELS[post.category] ?? post.category}
                    </span>
                  )}
                  <h2 className="font-serif font-semibold text-ink-900 mb-2 group-hover:text-forest-800 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-sm text-ink-500 line-clamp-3 mb-3">{post.excerpt}</p>
                  )}
                  <p className="text-xs text-ink-400">
                    {post.author} · {post.readingTime ? `${post.readingTime} min read` : ''}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-ink-500">Articles coming soon.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
