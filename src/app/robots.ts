import type { MetadataRoute } from 'next'
import { getPublicOriginForRequest } from '@/lib/site'

export const dynamic = 'force-dynamic'

export default async function robots(): Promise<MetadataRoute.Robots> {
  const base = (await getPublicOriginForRequest()).replace(/\/$/, '')

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/', '/api/', '/api'],
      },
    ],
    host: base,
    sitemap: `${base}/sitemap.xml`,
  }
}
