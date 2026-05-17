'use server'

import { randomUUID } from 'crypto'
import { z } from 'zod'
import { getPayloadClient } from './payload'

function logLeadError(ref: string, err: unknown) {
  const detail = err instanceof Error ? err.message : String(err)
  const code =
    err && typeof err === 'object' && 'code' in err ? String((err as { code: unknown }).code) : ''
  if (detail.includes('does not exist') || code === '42P01') {
    console.error(
      `[The Business Barn] Lead submission error [${ref}]: database tables missing — run npm run db:migrate on this environment.`,
      detail,
    )
    return
  }
  if (detail.includes('connect') || code === 'ECONNREFUSED' || code === '28P01') {
    console.error(
      `[The Business Barn] Lead submission error [${ref}]: database connection failed. Check DATABASE_URL.`,
      detail,
    )
    return
  }
  console.error(`[The Business Barn] Lead submission error [${ref}]:`, detail, err)
}

const leadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  city: z.string().optional(),
  leadType: z.enum(['consulting', 'concept', 'general']).default('general'),
  packageSlug: z.string().optional(),
  conceptSlug: z.string().optional(),
  businessType: z.string().optional(),
  hasLocation: z.enum(['yes', 'no', 'considering']).optional(),
  startupBudget: z
    .enum(['under-10k', '10k-30k', '30k-75k', '75k-150k', '150k-plus', 'unsure'])
    .optional(),
  launchTimeline: z
    .enum(['asap', '1-3mo', '3-6mo', '6-12mo', 'exploring'])
    .optional(),
  message: z.string().optional(),
  consent: z.literal('on', {
    errorMap: () => ({ message: 'You must consent to be contacted' }),
  }),
  sourceURL: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  categoryParam: z.string().optional(),
  locationParam: z.string().optional(),
})

/** FormData encodes unset `<select>` as ""; Zod enums reject "". Strip for optional fields only. */
function stripEmptyOptionalFields(raw: Record<string, string>): Record<string, string> {
  const optionalKeys = [
    'phone',
    'city',
    'packageSlug',
    'conceptSlug',
    'businessType',
    'hasLocation',
    'startupBudget',
    'launchTimeline',
    'message',
    'sourceURL',
    'utmSource',
    'utmMedium',
    'utmCampaign',
    'categoryParam',
    'locationParam',
  ] as const
  const out: Record<string, string> = { ...raw }
  for (const k of optionalKeys) {
    if (out[k] === '') delete out[k]
  }
  return out
}

export type LeadState =
  | { status: 'idle' }
  | { status: 'success' }
  | { status: 'error'; errors: Record<string, string[]> }
  | { status: 'serverError'; message: string }

export async function submitLead(
  _prev: LeadState,
  formData: FormData,
): Promise<LeadState> {
  const raw = stripEmptyOptionalFields(Object.fromEntries(formData) as Record<string, string>)
  const parsed = leadSchema.safeParse(raw)

  if (!parsed.success) {
    return {
      status: 'error',
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    }
  }

  const data = parsed.data
  const ref = randomUUID().slice(0, 8)

  try {
    const payload = await getPayloadClient()

    // Resolve relationship IDs
    let packageId: string | undefined
    if (data.packageSlug) {
      const pkgResult = await payload.find({
        collection: 'consulting-packages',
        where: { slug: { equals: data.packageSlug } },
        limit: 1,
      })
      packageId = pkgResult.docs[0]?.id ? String(pkgResult.docs[0].id) : undefined
    }

    let conceptId: string | undefined
    if (data.conceptSlug) {
      const conceptResult = await payload.find({
        collection: 'concepts',
        where: { slug: { equals: data.conceptSlug } },
        limit: 1,
      })
      conceptId = conceptResult.docs[0]?.id ? String(conceptResult.docs[0].id) : undefined
    }

    await payload.create({
      collection: 'leads',
      data: {
        name: data.name,
        email: data.email,
        ...(data.phone ? { phone: data.phone } : {}),
        ...(data.city ? { city: data.city } : {}),
        leadType: data.leadType,
        ...(packageId ? { packageInterest: packageId } : {}),
        ...(conceptId ? { conceptInterest: conceptId } : {}),
        ...(data.businessType ? { businessType: data.businessType } : {}),
        ...(data.hasLocation ? { hasLocation: data.hasLocation } : {}),
        ...(data.startupBudget ? { startupBudget: data.startupBudget } : {}),
        ...(data.launchTimeline ? { launchTimeline: data.launchTimeline } : {}),
        ...(data.message ? { message: data.message } : {}),
        consentTimestamp: new Date(),
        stage: 'new',
        ...(data.sourceURL ? { sourceURL: data.sourceURL } : {}),
        ...(data.utmSource ? { utmSource: data.utmSource } : {}),
        ...(data.utmMedium ? { utmMedium: data.utmMedium } : {}),
        ...(data.utmCampaign ? { utmCampaign: data.utmCampaign } : {}),
        ...(data.categoryParam ? { categoryParam: data.categoryParam } : {}),
        ...(data.locationParam ? { locationParam: data.locationParam } : {}),
      },
    })

    return { status: 'success' }
  } catch (err) {
    logLeadError(ref, err)
    return {
      status: 'serverError',
      message: 'Something went wrong. Please try again or email us directly.',
    }
  }
}
