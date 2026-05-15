'use server'

import { getPayloadClient } from './payload'
import { z } from 'zod'

const leadSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  packageInterest: z.enum(['side-one', 'side-two', 'sell', 'both', 'general']),
  conceptSlug: z.string().optional(),
  listingSlug: z.string().optional(),
  territory: z.string().optional(),
  message: z.string().optional(),
  sourceURL: z.string().optional(),
})

export type LeadFormState = {
  success: boolean
  error?: string
  fieldErrors?: Record<string, string[]>
}

export async function submitLead(
  prevState: LeadFormState,
  formData: FormData,
): Promise<LeadFormState> {
  const raw = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone') || undefined,
    packageInterest: formData.get('packageInterest'),
    conceptSlug: formData.get('conceptSlug') || undefined,
    listingSlug: formData.get('listingSlug') || undefined,
    territory: formData.get('territory') || undefined,
    message: formData.get('message') || undefined,
    sourceURL: formData.get('sourceURL') || undefined,
  }

  const parsed = leadSchema.safeParse(raw)
  if (!parsed.success) {
    return {
      success: false,
      error: 'Please fix the errors below.',
      fieldErrors: parsed.error.flatten().fieldErrors,
    }
  }

  const data = parsed.data

  try {
    const payload = await getPayloadClient()

    // Resolve concept and listing relationships by slug
    let conceptId: string | undefined
    let listingId: string | undefined

    if (data.conceptSlug) {
      const res = await payload.find({
        collection: 'concepts',
        where: { slug: { equals: data.conceptSlug } },
        limit: 1,
      })
      if (res.docs[0]) conceptId = String(res.docs[0].id)
    }

    if (data.listingSlug) {
      const res = await payload.find({
        collection: 'listings',
        where: { slug: { equals: data.listingSlug } },
        limit: 1,
      })
      if (res.docs[0]) listingId = String(res.docs[0].id)
    }

    await payload.create({
      collection: 'leads',
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        packageInterest: data.packageInterest,
        conceptInterest: conceptId,
        listingInterest: listingId,
        territory: data.territory,
        message: data.message,
        sourceURL: data.sourceURL,
        stage: 'new',
        source: 'organic',
      },
    })

    return { success: true }
  } catch (err) {
    console.error('Lead submission error:', err)
    return { success: false, error: 'Something went wrong. Please try again or email us directly.' }
  }
}
