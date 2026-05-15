import type { CollectionConfig } from 'payload'

export const Territories: CollectionConfig = {
  slug: 'territories',
  admin: {
    useAsTitle: 'name',
    group: 'Side Two',
    defaultColumns: ['name', 'region', 'status'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'region',
      type: 'select',
      required: true,
      options: [
        { label: 'Metro Vancouver', value: 'metro-vancouver' },
        { label: 'Fraser Valley', value: 'fraser-valley' },
        { label: 'Vancouver Island', value: 'vancouver-island' },
        { label: 'Okanagan', value: 'okanagan' },
        { label: 'Northern B.C.', value: 'northern-bc' },
        { label: 'Interior B.C.', value: 'interior-bc' },
        { label: 'Kootenays', value: 'kootenays' },
        { label: 'Peace Region', value: 'peace-region' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'available',
      options: [
        { label: 'Available', value: 'available' },
        { label: 'Limited', value: 'limited' },
        { label: 'Sold', value: 'sold' },
      ],
      required: true,
    },
    {
      name: 'population',
      type: 'number',
      admin: { description: 'Approximate population in the territory' },
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: { description: 'Internal notes on the territory' },
    },
  ],
}
