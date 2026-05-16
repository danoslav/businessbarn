/** Canonical public site URL (no trailing slash). Used by metadata, JSON-LD, GA helpers, and fallbacks. Safe for client bundles (no `next/headers`). */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || 'https://thebusinessbarn.ca'
  const trimmed = raw.trim().replace(/\/$/, '')
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed
  return `https://${trimmed}`
}
