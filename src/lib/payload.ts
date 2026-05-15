import { getPayload } from 'payload'
import config from '@payload-config'
import type { Where } from 'payload'

let cached: ReturnType<typeof getPayload> | null = null

export async function getPayloadClient() {
  if (!cached) {
    cached = getPayload({ config })
  }
  return cached
}

// ─── Formatting helpers ───────────────────────────────────────────────────────

export function formatCurrency(amount: number, opts?: { showCents?: boolean }): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: opts?.showCents ? 2 : 0,
    maximumFractionDigits: opts?.showCents ? 2 : 0,
  }).format(amount)
}

export function formatPriceRange(min: number, max: number): string {
  if (min === max) return formatCurrency(min)
  return `${formatCurrency(min)}–${formatCurrency(max)}`
}

// ─── Consulting Packages ──────────────────────────────────────────────────────

export async function getConsultingPackages() {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'consulting-packages',
    sort: 'tier',
    limit: 10,
  })
  return result.docs
}

export async function getConsultingPackageBySlug(slug: string) {
  const payload = await getPayloadClient()
  const where: Where = { and: [{ slug: { equals: slug } }] }
  const result = await payload.find({
    collection: 'consulting-packages',
    where,
    limit: 1,
  })
  return result.docs[0] ?? null
}

// ─── Concepts ─────────────────────────────────────────────────────────────────

export async function getConcepts(opts?: {
  category?: string
  location?: string
  limit?: number
  featuredOnly?: boolean
}) {
  const payload = await getPayloadClient()

  const conditions: Where[] = [{ status: { equals: 'published' } }]
  if (opts?.featuredOnly) conditions.push({ featured: { equals: true } })

  const where: Where = { and: conditions }

  const result = await payload.find({
    collection: 'concepts',
    where,
    limit: opts?.limit ?? 30,
    depth: 2,
  })

  return result.docs
}

export async function getConceptBySlug(slug: string) {
  const payload = await getPayloadClient()
  const where: Where = {
    and: [
      { slug: { equals: slug } },
      { status: { equals: 'published' } },
    ],
  }
  const result = await payload.find({
    collection: 'concepts',
    where,
    limit: 1,
    depth: 2,
  })
  return result.docs[0] ?? null
}

// ─── Resources ────────────────────────────────────────────────────────────────

export async function getResources(opts?: { limit?: number; category?: string }) {
  const payload = await getPayloadClient()

  const conditions: Where[] = [{ status: { equals: 'published' } }]
  if (opts?.category) conditions.push({ category: { equals: opts.category } })

  const where: Where = { and: conditions }

  const result = await payload.find({
    collection: 'resources',
    where,
    sort: '-publishedAt',
    limit: opts?.limit ?? 20,
    depth: 1,
  })

  return result.docs
}

export async function getResourceBySlug(slug: string) {
  const payload = await getPayloadClient()
  const where: Where = {
    and: [
      { slug: { equals: slug } },
      { status: { equals: 'published' } },
    ],
  }
  const result = await payload.find({
    collection: 'resources',
    where,
    limit: 1,
    depth: 1,
  })
  return result.docs[0] ?? null
}

// ─── Categories + Locations ───────────────────────────────────────────────────

export async function getCategories() {
  const payload = await getPayloadClient()
  const result = await payload.find({ collection: 'categories', limit: 50, sort: 'name' })
  return result.docs
}

export async function getLocations() {
  const payload = await getPayloadClient()
  const result = await payload.find({ collection: 'locations', limit: 100, sort: 'name' })
  return result.docs
}
