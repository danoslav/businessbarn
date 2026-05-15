import type { CollectionConfig } from 'payload'

export const Resources: CollectionConfig = {
  slug: 'resources',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'category', 'publishedAt', 'status'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Business Planning', value: 'planning' },
        { label: 'Revenue & Financials', value: 'financials' },
        { label: 'Location Research', value: 'location' },
        { label: 'Digital & Marketing', value: 'digital' },
        { label: 'Funding & Grants', value: 'funding' },
        { label: 'Founder Mindset', value: 'mindset' },
        { label: 'Business Concepts', value: 'concepts' },
      ],
    },
    {
      name: 'excerpt',
      type: 'textarea',
      admin: { description: 'Used in resource cards and meta description' },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'author',
      type: 'text',
      defaultValue: 'The Business Barn',
    },
    {
      name: 'publishedAt',
      type: 'date',
    },
    {
      name: 'readingTime',
      type: 'number',
      admin: { description: 'Estimated reading time in minutes' },
    },
    {
      name: 'relatedPackage',
      type: 'relationship',
      relationTo: 'consulting-packages',
    },
    {
      name: 'relatedCategory',
      type: 'relationship',
      relationTo: 'categories',
    },
  ],
}
