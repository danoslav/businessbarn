import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPostBySlug } from '@/lib/payload'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return { title: 'Post Not Found' }
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      type: 'article',
      publishedTime: post.publishedAt
        ? new Date(post.publishedAt).toISOString()
        : undefined,
      authors: [post.author ?? 'BusinessBARN Team'],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    author: { '@type': 'Person', name: post.author ?? 'BusinessBARN Team' },
    publisher: {
      '@type': 'Organization',
      name: 'BusinessBARN',
      url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://businessbarn.ca',
    },
    datePublished: post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="bg-forest-950 text-white py-14">
        <div className="site-container max-w-2xl">
          <Link href="/blog" className="text-ink-400 hover:text-white text-sm mb-4 block">
            ← Blog
          </Link>
          <h1 className="font-serif text-3xl lg:text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex gap-3 text-sm text-ink-400">
            <span>{post.author ?? 'BusinessBARN Team'}</span>
            {post.publishedAt && (
              <>
                <span>·</span>
                <span>{new Date(post.publishedAt).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </>
            )}
            {post.readingTime && (
              <>
                <span>·</span>
                <span>{post.readingTime} min read</span>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="site-container max-w-2xl mx-auto">
          {post.excerpt && (
            <p className="text-lg text-ink-600 leading-relaxed mb-8 font-medium">{post.excerpt}</p>
          )}
          <div className="prose prose-ink prose-lg max-w-none">
            {/* Rich text rendered as plain text stub — integrate @payloadcms/richtext-lexical/react for full render */}
            <p className="text-ink-600 text-sm italic">
              [Full article content is rendered from Payload rich text. Connect the Lexical React
              renderer to display the full body.]
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
