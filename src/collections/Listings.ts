import type { CollectionConfig } from 'payload'

export const Listings: CollectionConfig = {
  slug: 'listings',
  admin: {
    useAsTitle: 'title',
    group: 'Side One',
    defaultColumns: ['title', 'category', 'askingPrice', 'location', 'status'],
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
      admin: { description: 'URL-friendly identifier, e.g. "victoria-cafe-2024"' },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      required: true,
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Active', value: 'active' },
        { label: 'Under Offer', value: 'under-offer' },
        { label: 'Sold', value: 'sold' },
      ],
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Food & Beverage', value: 'food-beverage' },
        { label: 'Retail', value: 'retail' },
        { label: 'Services', value: 'services' },
        { label: 'Manufacturing', value: 'manufacturing' },
        { label: 'Construction & Trades', value: 'construction-trades' },
        { label: 'Health & Wellness', value: 'health-wellness' },
        { label: 'Automotive', value: 'automotive' },
        { label: 'Technology', value: 'technology' },
        { label: 'Hospitality', value: 'hospitality' },
        { label: 'Agriculture', value: 'agriculture' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'location',
      type: 'text',
      required: true,
      admin: { description: 'City or region, e.g. "Victoria, B.C."' },
    },
    {
      name: 'askingPrice',
      type: 'number',
      required: true,
      admin: { description: 'Asking price in CAD' },
    },
    {
      name: 'annualRevenue',
      type: 'number',
      admin: { description: 'Annual gross revenue in CAD' },
    },
    {
      name: 'cashFlow',
      type: 'number',
      admin: { description: 'Annual seller discretionary earnings in CAD' },
    },
    {
      name: 'established',
      type: 'number',
      admin: { description: 'Year the business was established' },
    },
    {
      name: 'employees',
      type: 'number',
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
      admin: { description: 'Used in listing cards — keep under 160 characters' },
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
    },
    {
      name: 'highlights',
      type: 'array',
      admin: { description: 'Key bullet points about the business' },
      fields: [{ name: 'point', type: 'text', required: true }],
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'images',
      type: 'array',
      fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }],
    },
    {
      name: 'leaseInfo',
      type: 'text',
      admin: { description: 'e.g. "Month-to-month, $4,200/mo + CAM"' },
    },
    {
      name: 'reasonForSelling',
      type: 'textarea',
    },
    {
      name: 'financingAvailable',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'confidential',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'Hides business name in public listings' },
    },
  ],
}
