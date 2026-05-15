/** Canonical public site URL (no trailing slash). Used by sitemap, robots, and metadata. */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || 'https://thebusinessbarn.ca'
  const trimmed = raw.trim().replace(/\/$/, '')
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed
  return `https://${trimmed}`
}
