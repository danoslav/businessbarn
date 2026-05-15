import type { CollectionConfig } from 'payload'

export const CRMActivities: CollectionConfig = {
  slug: 'crm-activities',
  admin: {
    useAsTitle: 'activityType',
    group: 'CRM',
    defaultColumns: ['lead', 'activityType', 'date', 'owner'],
  },
  access: {
    create: ({ req }) => Boolean(req.user),
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'lead',
      type: 'relationship',
      relationTo: 'leads',
      required: true,
    },
    {
      name: 'activityType',
      type: 'select',
      required: true,
      options: [
        { label: 'Call', value: 'call' },
        { label: 'Email', value: 'email' },
        { label: 'Meeting', value: 'meeting' },
        { label: 'Proposal sent', value: 'proposal' },
        { label: 'Note', value: 'note' },
        { label: 'Stage change', value: 'stage-change' },
      ],
    },
    {
      name: 'date',
      type: 'date',
      required: true,
    },
    {
      name: 'notes',
      type: 'textarea',
    },
    {
      name: 'nextActionDate',
      type: 'date',
    },
    {
      name: 'owner',
      type: 'relationship',
      relationTo: 'users',
    },
  ],
}
