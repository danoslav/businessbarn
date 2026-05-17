import type { CollectionConfig } from 'payload'

import { publicReadAdminWrite } from '../access/cms'

export const Concepts: CollectionConfig = {
  slug: 'concepts',
  admin: {
    useAsTitle: 'name',
    group: 'Concepts',
    defaultColumns: ['name', 'category', 'difficultyLevel', 'territoryStatus', 'status'],
  },
  access: publicReadAdminWrite,
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: { description: 'Public concept name, e.g. "Porchlight Pet Pantry"' },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'placeholderBrand',
      type: 'text',
      admin: { description: 'Working brand name used in concept materials' },
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
      type: 'relationship',
      relationTo: 'categories',
      required: true,
    },
    {
      name: 'businessType',
      type: 'text',
      required: true,
      admin: { description: 'e.g. "Neighbourhood premium pet food and essentials shop"' },
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
      name: 'locations',
      type: 'relationship',
      relationTo: 'locations',
      hasMany: true,
    },
    {
      name: 'idealLocations',
      type: 'textarea',
      required: true,
      admin: { description: 'Plain-language description of ideal trade areas and location types' },
    },
    // Financials (illustrative only — never a guarantee)
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
      name: 'estimatedMonthlyRevenueMin',
      type: 'number',
      admin: { description: 'Illustrative minimum monthly revenue after ramp-up — NOT a guarantee' },
    },
    {
      name: 'estimatedMonthlyRevenueMax',
      type: 'number',
      admin: { description: 'Illustrative maximum monthly revenue after ramp-up — NOT a guarantee' },
    },
    {
      name: 'grossMarginMin',
      type: 'number',
      admin: { description: 'Illustrative gross margin % (low end)' },
    },
    {
      name: 'grossMarginMax',
      type: 'number',
      admin: { description: 'Illustrative gross margin % (high end)' },
    },
    {
      name: 'launchTimeline',
      type: 'text',
      required: true,
      admin: { description: 'e.g. "8–14 weeks"' },
    },
    {
      name: 'royaltyTerms',
      type: 'text',
      admin: { description: 'e.g. "16% monthly royalty on defined revenue base, subject to final agreement"' },
    },
    {
      name: 'difficultyLevel',
      type: 'select',
      required: true,
      options: [
        { label: 'Low', value: 'low' },
        { label: 'Medium', value: 'medium' },
        { label: 'High', value: 'high' },
      ],
    },
    // Content
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
      admin: { description: 'Used in concept cards — keep under 160 characters' },
    },
    {
      name: 'customerProfile',
      type: 'textarea',
      admin: { description: 'Target customer description' },
    },
    {
      name: 'revenueModel',
      type: 'textarea',
      admin: { description: 'How the business makes money' },
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
      admin: { description: 'Full concept overview — "What is this concept?"' },
    },
    {
      name: 'startupRequirements',
      type: 'array',
      admin: { description: 'What the operator needs to get started' },
      fields: [{ name: 'item', type: 'text', required: true }],
    },
    {
      name: 'includedMaterials',
      type: 'array',
      label: 'Included Materials',
      fields: [{ name: 'item', type: 'text', required: true }],
    },
    {
      name: 'founderFit',
      type: 'array',
      label: 'Operator Fit',
      admin: { description: 'Skills and traits this concept suits' },
      fields: [{ name: 'trait', type: 'text', required: true }],
    },
    {
      name: 'risks',
      type: 'array',
      admin: { description: 'Honest risks and assumptions to watch' },
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
      admin: { description: 'Show in homepage featured concepts row' },
    },
  ],
}
