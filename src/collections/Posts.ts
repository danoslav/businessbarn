import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
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
        { label: 'Buying a Business', value: 'buying' },
        { label: 'Selling a Business', value: 'selling' },
        { label: 'Business Concepts', value: 'concepts' },
        { label: 'Market Insights', value: 'insights' },
        { label: 'Guides', value: 'guides' },
      ],
    },
    {
      name: 'excerpt',
      type: 'textarea',
      admin: { description: 'Used in post cards and meta description' },
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
      defaultValue: 'BusinessBARN Team',
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
  ],
}
