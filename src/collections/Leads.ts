import type { CollectionConfig } from 'payload'

export const Leads: CollectionConfig = {
  slug: 'leads',
  admin: {
    useAsTitle: 'name',
    group: 'CRM',
    defaultColumns: ['name', 'email', 'leadType', 'stage', 'followUpDate', 'createdAt'],
  },
  access: {
    create: () => true,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation !== 'create') return
        console.log(
          `[The Business Barn] New lead: ${doc.name} <${doc.email}> — ${doc.leadType}`,
        )
        const notifyTo = process.env.LEADS_NOTIFY_EMAIL
        if (!notifyTo || !req.payload.email) return
        try {
          await req.payload.sendEmail({
            to: notifyTo,
            subject: `New lead: ${doc.name} (${doc.leadType})`,
            html: `
              <p><strong>${doc.name}</strong> &lt;${doc.email}&gt;</p>
              <p>Type: ${doc.leadType}</p>
              ${doc.phone ? `<p>Phone: ${doc.phone}</p>` : ''}
              ${doc.city ? `<p>City: ${doc.city}</p>` : ''}
              ${doc.message ? `<p>Message: ${doc.message}</p>` : ''}
              <p><a href="${process.env.NEXT_PUBLIC_SITE_URL || ''}/admin/collections/leads">View in admin</a></p>
            `,
          })
        } catch (err) {
          console.error('[The Business Barn] Lead notification email failed:', err)
        }
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'city',
      type: 'text',
      admin: { description: 'City or region they noted' },
    },
    {
      name: 'leadType',
      type: 'select',
      required: true,
      options: [
        { label: 'Consulting Package', value: 'consulting' },
        { label: 'Business Concept', value: 'concept' },
        { label: 'General Enquiry', value: 'general' },
      ],
    },
    {
      name: 'packageInterest',
      type: 'relationship',
      relationTo: 'consulting-packages',
      admin: { description: 'Which consulting package they enquired about' },
    },
    {
      name: 'conceptInterest',
      type: 'relationship',
      relationTo: 'concepts',
      admin: { description: 'Which business concept they enquired about' },
    },
    {
      name: 'categoryParam',
      type: 'text',
      admin: { description: 'Category slug from URL when they submitted (for unmet demand tracking)' },
    },
    {
      name: 'locationParam',
      type: 'text',
      admin: { description: 'Location slug from URL when they submitted' },
    },
    {
      name: 'businessType',
      type: 'text',
      admin: { description: 'Type of business they are considering' },
    },
    {
      name: 'hasLocation',
      type: 'select',
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' },
        { label: 'Considering options', value: 'considering' },
      ],
    },
    {
      name: 'startupBudget',
      type: 'select',
      options: [
        { label: 'Under $10,000', value: 'under-10k' },
        { label: '$10,000–$30,000', value: '10k-30k' },
        { label: '$30,000–$75,000', value: '30k-75k' },
        { label: '$75,000–$150,000', value: '75k-150k' },
        { label: '$150,000+', value: '150k-plus' },
        { label: 'Not sure yet', value: 'unsure' },
      ],
    },
    {
      name: 'launchTimeline',
      type: 'select',
      options: [
        { label: 'As soon as possible', value: 'asap' },
        { label: '1–3 months', value: '1-3mo' },
        { label: '3–6 months', value: '3-6mo' },
        { label: '6–12 months', value: '6-12mo' },
        { label: 'Just exploring', value: 'exploring' },
      ],
    },
    {
      name: 'message',
      type: 'textarea',
      admin: { description: 'What decision they are trying to make next' },
    },
    {
      name: 'consentTimestamp',
      type: 'date',
      admin: { description: 'When they gave consent to be contacted' },
    },
    // CRM
    {
      name: 'stage',
      type: 'select',
      defaultValue: 'new',
      required: true,
      options: [
        { label: 'New', value: 'new' },
        { label: 'Reviewed', value: 'reviewed' },
        { label: 'Fit Call Booked', value: 'fit-call-booked' },
        { label: 'Proposal Sent', value: 'proposal-sent' },
        { label: 'Won', value: 'won' },
        { label: 'Lost', value: 'lost' },
        { label: 'Nurture', value: 'nurture' },
      ],
    },
    {
      name: 'followUpDate',
      type: 'date',
      admin: { date: { pickerAppearance: 'dayOnly' } },
    },
    {
      name: 'notes',
      type: 'richText',
      admin: { description: 'Internal notes — not visible to the lead' },
    },
    {
      name: 'lostReason',
      type: 'textarea',
      admin: {
        condition: (data) => data.stage === 'lost',
      },
    },
    // Attribution
    {
      name: 'sourceURL',
      type: 'text',
    },
    {
      name: 'utmSource',
      type: 'text',
    },
    {
      name: 'utmMedium',
      type: 'text',
    },
    {
      name: 'utmCampaign',
      type: 'text',
    },
  ],
}
