import configPromise from '@payload-config'
import { getPayload, type Where } from 'payload'

export const getPayloadClient = async () => getPayload({ config: configPromise })

// ── Listings ──────────────────────────────────────────────────────────────────

export async function getListings(opts?: {
  category?: string
  limit?: number
  page?: number
}) {
  const payload = await getPayloadClient()
  const where: Where = { status: { equals: 'active' } }
  if (opts?.category) where['category'] = { equals: opts.category }
  return payload.find({
    collection: 'listings',
    where,
    limit: opts?.limit ?? 12,
    page: opts?.page ?? 1,
    sort: '-createdAt',
  })
}

export async function getListingBySlug(slug: string) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'listings',
    where: { and: [{ slug: { equals: slug } }, { status: { not_equals: 'draft' } }] },
    limit: 1,
  })
  return result.docs[0] ?? null
}

// ── Concepts ──────────────────────────────────────────────────────────────────

export async function getConcepts(opts?: {
  category?: string
  territoryStatus?: string
  featured?: boolean
  limit?: number
  page?: number
}) {
  const payload = await getPayloadClient()
  const where: Where = { status: { equals: 'published' } }
  if (opts?.category) where['category'] = { equals: opts.category }
  if (opts?.territoryStatus) where['territoryStatus'] = { equals: opts.territoryStatus }
  if (opts?.featured) where['featured'] = { equals: true }
  return payload.find({
    collection: 'concepts',
    where,
    limit: opts?.limit ?? 12,
    page: opts?.page ?? 1,
    sort: '-createdAt',
  })
}

export async function getConceptBySlug(slug: string) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'concepts',
    where: { and: [{ slug: { equals: slug } }, { status: { equals: 'published' } }] },
    limit: 1,
  })
  return result.docs[0] ?? null
}

// ── Posts ─────────────────────────────────────────────────────────────────────

export async function getPosts(opts?: { limit?: number; page?: number; category?: string }) {
  const payload = await getPayloadClient()
  const where: Where = { status: { equals: 'published' } }
  if (opts?.category) where['category'] = { equals: opts.category }
  return payload.find({
    collection: 'posts',
    where,
    limit: opts?.limit ?? 9,
    page: opts?.page ?? 1,
    sort: '-publishedAt',
  })
}

export async function getPostBySlug(slug: string) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug }, status: { equals: 'published' } },
    limit: 1,
  })
  return result.docs[0] ?? null
}

// ── Helpers ───────────────────────────────────────────────────────────────────

export function formatPrice(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}k`
  return `$${value}`
}

export function formatPriceRange(min: number, max: number): string {
  return `${formatPrice(min)}–${formatPrice(max)}`
}
