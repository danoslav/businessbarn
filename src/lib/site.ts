import { headers } from 'next/headers'

/** Canonical public site URL (no trailing slash). Used by metadata, JSON-LD, and fallbacks. */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || 'https://thebusinessbarn.ca'
  const trimmed = raw.trim().replace(/\/$/, '')
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed
  return `https://${trimmed}`
}

/**
 * Origin for the current HTTP request (scheme + host, no trailing slash).
 * Prefer this in sitemap.xml and robots.txt so `<loc>` URLs match the hostname
 * Google (or users) fetched from — e.g. https://bizbarn.dev even when
 * NEXT_PUBLIC_SITE_URL still points at a *.vercel.app preview URL.
 *
 * Vercel sets `x-forwarded-host` / `x-forwarded-proto` correctly for custom domains.
 * Server-only (uses `headers()`).
 */
export async function getPublicOriginForRequest(): Promise<string> {
  try {
    const h = await headers()
    const rawHost = (h.get('x-forwarded-host') || h.get('host') || '').trim()
    const host = rawHost.split(',')[0].trim()
    if (!host) return getSiteUrl()

    const rawProto = (h.get('x-forwarded-proto') || 'https').trim()
    const proto = rawProto.split(',')[0].trim()
    const scheme = proto === 'http' || proto === 'https' ? proto : 'https'

    return `${scheme}://${host}`
  } catch {
    return getSiteUrl()
  }
}
