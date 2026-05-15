import type { CollectionConfig } from 'payload'

export const Leads: CollectionConfig = {
  slug: 'leads',
  admin: {
    useAsTitle: 'name',
    group: 'CRM',
    defaultColumns: ['name', 'email', 'packageInterest', 'stage', 'followUpDate', 'createdAt'],
  },
  // Leads are write-only for public; read/update restricted to admins
  access: {
    create: () => true,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  hooks: {
    afterChange: [
      async ({ doc, operation }) => {
        if (operation !== 'create') return
        // Log to console — wire up a transactional email service (Resend, Postmark, etc.) here
        console.log(
          `[BusinessBARN] New lead: ${doc.name} <${doc.email}> — ${doc.packageInterest}`,
        )
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
      name: 'packageInterest',
      type: 'select',
      required: true,
      options: [
        { label: 'Side One — Buy a Business', value: 'side-one' },
        { label: 'Side Two — Business Concept', value: 'side-two' },
        { label: 'Side One — Sell My Business', value: 'sell' },
        { label: 'Both', value: 'both' },
        { label: 'General Enquiry', value: 'general' },
      ],
    },
    {
      name: 'conceptInterest',
      type: 'relationship',
      relationTo: 'concepts',
      admin: { description: 'Which concept did they enquire about?' },
    },
    {
      name: 'listingInterest',
      type: 'relationship',
      relationTo: 'listings',
      admin: { description: 'Which listing did they enquire about?' },
    },
    {
      name: 'territory',
      type: 'text',
      admin: { description: 'City or region they noted' },
    },
    {
      name: 'message',
      type: 'textarea',
      admin: { description: 'Their message from the form' },
    },
    {
      name: 'stage',
      type: 'select',
      defaultValue: 'new',
      required: true,
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Qualified', value: 'qualified' },
        { label: 'Proposal', value: 'proposal' },
        { label: 'Closed', value: 'closed' },
        { label: 'Lost', value: 'lost' },
      ],
    },
    {
      name: 'source',
      type: 'select',
      options: [
        { label: 'Organic', value: 'organic' },
        { label: 'Paid', value: 'paid' },
        { label: 'Referral', value: 'referral' },
        { label: 'Direct', value: 'direct' },
        { label: 'Unknown', value: 'unknown' },
      ],
    },
    {
      name: 'sourceURL',
      type: 'text',
      admin: { description: 'Page the form was submitted from (auto-filled)' },
    },
    {
      name: 'followUpDate',
      type: 'date',
      admin: {
        date: { pickerAppearance: 'dayOnly' },
        description: 'Next scheduled follow-up',
      },
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
        description: 'Why did this lead not proceed?',
      },
    },
  ],
}
