import type { CollectionConfig } from 'payload'

import { publicReadAdminWrite } from '../access/cms'

export const Locations: CollectionConfig = {
  slug: 'locations',
  admin: {
    useAsTitle: 'name',
    group: 'Concepts',
    defaultColumns: ['name', 'slug', 'province'],
  },
  access: publicReadAdminWrite,
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: { description: 'e.g. Victoria, BC' },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'URL slug, e.g. victoria-bc' },
    },
    {
      name: 'province',
      type: 'select',
      options: [
        { label: 'British Columbia', value: 'BC' },
        { label: 'Alberta', value: 'AB' },
        { label: 'Ontario', value: 'ON' },
        { label: 'Quebec', value: 'QC' },
        { label: 'Manitoba', value: 'MB' },
        { label: 'Saskatchewan', value: 'SK' },
        { label: 'Nova Scotia', value: 'NS' },
        { label: 'New Brunswick', value: 'NB' },
        { label: 'Prince Edward Island', value: 'PE' },
        { label: 'Newfoundland', value: 'NL' },
      ],
    },
    {
      name: 'regionType',
      type: 'select',
      options: [
        { label: 'Urban', value: 'urban' },
        { label: 'Suburban', value: 'suburban' },
        { label: 'Small City', value: 'small-city' },
        { label: 'Rural', value: 'rural' },
      ],
    },
    {
      name: 'introCopy',
      type: 'textarea',
      admin: { description: 'Short intro shown on /concepts?location=[slug] pages' },
    },
    {
      name: 'seoTitle',
      type: 'text',
    },
    {
      name: 'metaDescription',
      type: 'textarea',
    },
  ],
}
