import type { CollectionConfig } from 'payload'

export const Concepts: CollectionConfig = {
  slug: 'concepts',
  admin: {
    useAsTitle: 'name',
    group: 'Side Two',
    defaultColumns: ['name', 'category', 'startupCostMin', 'territoryStatus', 'status'],
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
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      required: true,
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' },
      ],
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Automotive', value: 'automotive' },
        { label: 'Facility Services', value: 'facility-services' },
        { label: 'Home Services', value: 'home-services' },
        { label: 'Outdoor Services', value: 'outdoor-services' },
        { label: 'Pet Services', value: 'pet-services' },
        { label: 'Events', value: 'events' },
        { label: 'Professional Services', value: 'professional-services' },
        { label: 'Health & Wellness', value: 'health-wellness' },
        { label: 'Food & Beverage', value: 'food-beverage' },
        { label: 'Technology', value: 'technology' },
      ],
    },
    {
      name: 'territoryStatus',
      type: 'select',
      defaultValue: 'available',
      required: true,
      options: [
        { label: 'Available', value: 'available' },
        { label: 'Limited', value: 'limited' },
        { label: 'Sold Out', value: 'sold' },
      ],
    },
    {
      name: 'territories',
      type: 'relationship',
      relationTo: 'territories',
      hasMany: true,
    },
    // Cost & revenue (illustrative only)
    {
      name: 'startupCostMin',
      type: 'number',
      required: true,
      admin: { description: 'Minimum startup cost in CAD' },
    },
    {
      name: 'startupCostMax',
      type: 'number',
      required: true,
      admin: { description: 'Maximum startup cost in CAD' },
    },
    {
      name: 'revenueMin',
      type: 'number',
      admin: { description: 'Illustrative minimum annual revenue in CAD — NOT a guarantee' },
    },
    {
      name: 'revenueMax',
      type: 'number',
      admin: { description: 'Illustrative maximum annual revenue in CAD — NOT a guarantee' },
    },
    {
      name: 'complexity',
      type: 'select',
      required: true,
      options: [
        { label: 'Low', value: 'low' },
        { label: 'Low–Medium', value: 'low-medium' },
        { label: 'Medium', value: 'medium' },
        { label: 'Medium–High', value: 'medium-high' },
        { label: 'High', value: 'high' },
      ],
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
      admin: { description: 'Used in concept cards — keep under 160 characters' },
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
      admin: { description: 'Full concept description — "What is this?"' },
    },
    {
      name: 'whatsIncluded',
      type: 'array',
      label: "What's Included",
      fields: [{ name: 'item', type: 'text', required: true }],
    },
    {
      name: 'founderFit',
      type: 'array',
      label: 'Founder Fit',
      admin: { description: 'Who is this concept suited for?' },
      fields: [{ name: 'trait', type: 'text', required: true }],
    },
    {
      name: 'risks',
      type: 'array',
      admin: { description: 'Known risks and open questions — be honest' },
      fields: [{ name: 'risk', type: 'text', required: true }],
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Show on homepage featured row' },
    },
  ],
}
