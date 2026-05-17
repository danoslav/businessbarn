/**
 * Idempotent demo content seed.
 * Usage: node --experimental-strip-types scripts/seed.mjs
 * Production: set SEED_ALLOW_PRODUCTION=true
 */
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import payload from '../node_modules/payload/dist/index.js'
import {
  categories,
  concepts,
  consultingPackages,
  lexicalFromText,
  locations,
  resources,
} from './seed-data.mjs'

for (const file of ['.env.local', '.env']) {
  const envPath = path.resolve(process.cwd(), file)
  if (!fs.existsSync(envPath)) continue
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^([^#=]+)=(.*)$/)
    if (!m) continue
    const key = m[1].trim()
    if (!process.env[key]) process.env[key] = m[2].trim().replace(/^["']|["']$/g, '')
  }
  break
}

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is required to seed.')
  process.exit(1)
}

if (process.env.NODE_ENV === 'production' && process.env.SEED_ALLOW_PRODUCTION !== 'true') {
  console.error('Refusing to seed production without SEED_ALLOW_PRODUCTION=true')
  process.exit(1)
}

const configPath = path.resolve(process.cwd(), 'src/payload.config.ts')
const { default: config } = await import(pathToFileURL(configPath).href)
await payload.init({ config, disableOnInit: true })

async function findIdBySlug(collection, slug) {
  const result = await payload.find({
    collection,
    where: { slug: { equals: slug } },
    limit: 1,
  })
  return result.docs[0]?.id
}

const categoryIds = {}
for (const cat of categories) {
  const existing = await findIdBySlug('categories', cat.slug)
  if (existing) {
    categoryIds[cat.slug] = existing
    console.log(`  skip category ${cat.slug}`)
    continue
  }
  const doc = await payload.create({
    collection: 'categories',
    data: cat,
  })
  categoryIds[cat.slug] = doc.id
  console.log(`  + category ${cat.slug}`)
}

const locationIds = {}
for (const loc of locations) {
  const existing = await findIdBySlug('locations', loc.slug)
  if (existing) {
    locationIds[loc.slug] = existing
    console.log(`  skip location ${loc.slug}`)
    continue
  }
  const doc = await payload.create({
    collection: 'locations',
    data: loc,
  })
  locationIds[loc.slug] = doc.id
  console.log(`  + location ${loc.slug}`)
}

for (const pkg of consultingPackages) {
  const existing = await findIdBySlug('consulting-packages', pkg.slug)
  if (existing) {
    console.log(`  skip package ${pkg.slug}`)
    continue
  }
  await payload.create({ collection: 'consulting-packages', data: pkg })
  console.log(`  + package ${pkg.slug}`)
}

const conceptBody = (name) =>
  lexicalFromText(
    `${name} is a sample concept in The Business Barn marketplace. Figures are illustrative planning ranges, not guarantees. Book a planning call to stress-test fit for your situation.`,
  )

for (const concept of concepts) {
  const existing = await findIdBySlug('concepts', concept.slug)
  if (existing) {
    console.log(`  skip concept ${concept.slug}`)
    continue
  }
  const categoryId = categoryIds[concept.categorySlug]
  if (!categoryId) {
    console.warn(`  ! skip concept ${concept.slug} — missing category`)
    continue
  }
  const { categorySlug, ...rest } = concept
  await payload.create({
    collection: 'concepts',
    data: {
      ...rest,
      status: 'published',
      category: categoryId,
      idealLocations:
        'Suburban and urban neighbourhoods with strong foot traffic, parking for pickup, and household incomes supporting the category.',
      grossMarginMin: 35,
      grossMarginMax: 55,
      customerProfile: 'Local households and commuters within a 15-minute drive.',
      revenueModel: 'Product and service sales with repeat purchase and seasonal peaks.',
      description: conceptBody(concept.name),
      startupRequirements: [
        { item: 'Initial inventory or equipment package' },
        { item: 'Lease deposit and buildout allowance' },
        { item: '3–6 months working capital' },
      ],
      includedMaterials: [
        { item: 'Concept overview deck' },
        { item: 'Illustrative P&L template' },
        { item: 'Launch checklist' },
      ],
      founderFit: [
        { trait: 'Comfortable with customer-facing work' },
        { trait: 'Organized with suppliers and schedules' },
      ],
      risks: [
        { risk: 'Seasonality may affect cash flow in slower months' },
        { risk: 'Lease terms and location drive much of the outcome' },
      ],
    },
  })
  console.log(`  + concept ${concept.slug}`)
}

const now = new Date().toISOString()
for (const res of resources) {
  const existing = await findIdBySlug('resources', res.slug)
  if (existing) {
    console.log(`  skip resource ${res.slug}`)
    continue
  }
  await payload.create({
    collection: 'resources',
    data: {
      ...res,
      status: 'published',
      publishedAt: now,
      content: lexicalFromText(
        `${res.title}. This is demo content seeded for The Business Barn. Replace with your own guides as you build out the resources library.`,
      ),
      author: 'The Business Barn',
    },
  })
  console.log(`  + resource ${res.slug}`)
}

await payload.destroy()
console.log('Seed complete.')
