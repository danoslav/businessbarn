import type { MetadataRoute } from 'next'
import { getSiteUrl } from '@/lib/site'
import { getPayloadClient } from '@/lib/payload'
import type { Where } from 'payload'

export const dynamic = 'force-dynamic'

type Freq = NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>

const STATIC: { path: string; changeFrequency: Freq; priority: number }[] = [
  { path: '/', changeFrequency: 'weekly', priority: 1 },
  { path: '/consulting', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/consulting/basic', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/consulting/accelerator', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/consulting/digital-incubator', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/consulting/superscaler', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/concepts', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/how-it-works', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/methodology', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/book-a-call', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/resources', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/contact', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/faq', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/legal/terms', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/legal/privacy', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/legal/earnings-disclaimer', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/llms.txt', changeFrequency: 'monthly', priority: 0.2 },
]

function urlForPath(base: string, path: string): string {
  if (path === '/') return `${base}/`
  return `${base}${path}`
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl()
  const now = new Date()

  const entries: MetadataRoute.Sitemap = STATIC.map(({ path, changeFrequency, priority }) => ({
    url: urlForPath(base, path),
    lastModified: now,
    changeFrequency,
    priority,
  }))

  try {
    const payload = await getPayloadClient()

    const conceptsWhere: Where = { status: { equals: 'published' } }
    const concepts = await payload.find({
      collection: 'concepts',
      where: conceptsWhere,
      limit: 500,
      depth: 0,
    })

    for (const doc of concepts.docs) {
      const slug = typeof doc.slug === 'string' ? doc.slug : null
      if (!slug) continue
      const lm =
        doc.updatedAt && typeof doc.updatedAt === 'string'
          ? new Date(doc.updatedAt)
          : doc.createdAt && typeof doc.createdAt === 'string'
            ? new Date(doc.createdAt)
            : now
      entries.push({
        url: `${base}/concepts/${slug}`,
        lastModified: lm,
        changeFrequency: 'weekly',
        priority: 0.75,
      })
    }

    const resourcesWhere: Where = { status: { equals: 'published' } }
    const resources = await payload.find({
      collection: 'resources',
      where: resourcesWhere,
      limit: 500,
      depth: 0,
    })

    for (const doc of resources.docs) {
      const slug = typeof doc.slug === 'string' ? doc.slug : null
      if (!slug) continue
      const lm =
        doc.updatedAt && typeof doc.updatedAt === 'string'
          ? new Date(doc.updatedAt)
          : doc.createdAt && typeof doc.createdAt === 'string'
            ? new Date(doc.createdAt)
            : now
      entries.push({
        url: `${base}/resources/${slug}`,
        lastModified: lm,
        changeFrequency: 'monthly',
        priority: 0.55,
      })
    }
  } catch (err) {
    console.error('[sitemap] Payload fetch failed; returning static URLs only.', err)
  }

  return entries
}
