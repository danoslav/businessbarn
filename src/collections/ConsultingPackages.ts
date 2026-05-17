import type { CollectionConfig } from 'payload'

import { publicReadAdminWrite } from '../access/cms'

export const ConsultingPackages: CollectionConfig = {
  slug: 'consulting-packages',
  admin: {
    useAsTitle: 'name',
    group: 'Consulting',
    defaultColumns: ['name', 'tier', 'priceLabel'],
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
      admin: { description: 'URL slug: basic | accelerator | digital-incubator | superscaler' },
    },
    {
      name: 'tier',
      type: 'select',
      required: true,
      options: [
        { label: 'Tier 1 — Basic', value: '1' },
        { label: 'Tier 2 — Accelerator', value: '2' },
        { label: 'Tier 3 — Digital Incubator', value: '3' },
        { label: 'Tier 4 — Superscaler', value: '4' },
      ],
    },
    {
      name: 'tagline',
      type: 'text',
      admin: { description: 'One-line description shown in cards and comparison table' },
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
    },
    {
      name: 'bestFor',
      type: 'array',
      admin: { description: 'Who this package is ideal for' },
      fields: [{ name: 'item', type: 'text', required: true }],
    },
    {
      name: 'deliverables',
      type: 'array',
      required: true,
      fields: [{ name: 'item', type: 'text', required: true }],
    },
    {
      name: 'notIncluded',
      type: 'array',
      admin: { description: 'Explicit "not included" boundaries to reduce scope creep' },
      fields: [{ name: 'item', type: 'text', required: true }],
    },
    {
      name: 'priceLabel',
      type: 'text',
      admin: { description: 'e.g. "Starting at $X" or "Contact for pricing"' },
    },
    {
      name: 'turnaround',
      type: 'text',
      admin: { description: 'e.g. "7–10 business days"' },
    },
    {
      name: 'ctaLabel',
      type: 'text',
      required: true,
      defaultValue: 'Book a planning call',
    },
    {
      name: 'faq',
      type: 'array',
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
      ],
    },
  ],
}
