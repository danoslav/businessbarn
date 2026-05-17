import type { CollectionConfig } from 'payload'

import { publicReadAdminWrite } from '../access/cms'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
    group: 'Concepts',
    defaultColumns: ['name', 'slug'],
  },
  access: publicReadAdminWrite,
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'URL-safe slug, e.g. home-services' },
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'seoTitle',
      type: 'text',
    },
    {
      name: 'metaDescription',
      type: 'textarea',
    },
    {
      name: 'ogImage',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
