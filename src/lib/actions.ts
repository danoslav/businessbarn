'use server'

import { z } from 'zod'
import { getPayloadClient } from './payload'
import { headers } from 'next/headers'

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

export type LeadState =
  | { status: 'idle' }
  | { status: 'success' }
  | { status: 'error'; errors: Record<string, string[]> }
  | { status: 'serverError'; message: string }

export async function submitLead(
  _prev: LeadState,
  formData: FormData,
): Promise<LeadState> {
  const raw = Object.fromEntries(formData)
  const parsed = leadSchema.safeParse(raw)

  if (!parsed.success) {
    return {
      status: 'error',
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    }
  }

  const data = parsed.data

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
        phone: data.phone,
        city: data.city,
        leadType: data.leadType,
        packageInterest: packageId,
        conceptInterest: conceptId,
        businessType: data.businessType,
        hasLocation: data.hasLocation,
        startupBudget: data.startupBudget,
        launchTimeline: data.launchTimeline,
        message: data.message,
        consentTimestamp: new Date().toISOString(),
        stage: 'new',
        sourceURL: data.sourceURL,
        utmSource: data.utmSource,
        utmMedium: data.utmMedium,
        utmCampaign: data.utmCampaign,
        categoryParam: data.categoryParam,
        locationParam: data.locationParam,
      },
    })

    return { status: 'success' }
  } catch (err) {
    console.error('[The Business Barn] Lead submission error:', err)
    return {
      status: 'serverError',
      message: 'Something went wrong. Please try again or email us directly.',
    }
  }
}
