/** Static concept cards when CMS has no published concepts (thank-you page fallback). */
export type DemoConcept = {
  name: string
  slug: string
  categoryName?: string
  startupCostMin: number
  startupCostMax: number
  estimatedMonthlyRevenueMin?: number
  estimatedMonthlyRevenueMax?: number
  launchTimeline?: string
  difficultyLevel?: string
  territoryStatus: 'available' | 'limited' | 'sold'
  shortDescription: string
}

export const DEMO_CONCEPTS: DemoConcept[] = [
  {
    name: 'Porchlight Pet Pantry',
    slug: 'porchlight-pet-pantry',
    categoryName: 'Retail',
    startupCostMin: 85000,
    startupCostMax: 140000,
    estimatedMonthlyRevenueMin: 28000,
    estimatedMonthlyRevenueMax: 52000,
    launchTimeline: '10–16 weeks',
    difficultyLevel: 'medium',
    territoryStatus: 'available',
    shortDescription:
      'Small-format pet pantry with subscription refills and local delivery in walkable neighbourhoods.',
  },
  {
    name: 'Harbour Mobile Espresso',
    slug: 'harbour-mobile-espresso',
    categoryName: 'Food & Beverage',
    startupCostMin: 45000,
    startupCostMax: 75000,
    estimatedMonthlyRevenueMin: 12000,
    estimatedMonthlyRevenueMax: 28000,
    launchTimeline: '6–10 weeks',
    difficultyLevel: 'low',
    territoryStatus: 'available',
    shortDescription:
      'Low-footprint coffee cart focused on office parks, markets, and weekend events.',
  },
  {
    name: 'Greenline Lawn Care',
    slug: 'greenline-lawn-care',
    categoryName: 'Home Services',
    startupCostMin: 25000,
    startupCostMax: 55000,
    estimatedMonthlyRevenueMin: 15000,
    estimatedMonthlyRevenueMax: 35000,
    launchTimeline: '4–8 weeks',
    difficultyLevel: 'low',
    territoryStatus: 'limited',
    shortDescription:
      'Recurring residential lawn maintenance with upsells for aeration and fall cleanup.',
  },
  {
    name: 'Oak & Anvil Workshop',
    slug: 'oak-anvil-workshop',
    categoryName: 'Retail',
    startupCostMin: 60000,
    startupCostMax: 110000,
    estimatedMonthlyRevenueMin: 18000,
    estimatedMonthlyRevenueMax: 40000,
    launchTimeline: '8–14 weeks',
    difficultyLevel: 'medium',
    territoryStatus: 'available',
    shortDescription:
      'Hybrid retail workshop selling curated local makers plus custom engraving services.',
  },
  {
    name: 'Copper Kettle Meal Prep',
    slug: 'copper-kettle-meal-prep',
    categoryName: 'Food & Beverage',
    startupCostMin: 70000,
    startupCostMax: 130000,
    estimatedMonthlyRevenueMin: 25000,
    estimatedMonthlyRevenueMax: 48000,
    launchTimeline: '10–14 weeks',
    difficultyLevel: 'medium',
    territoryStatus: 'available',
    shortDescription:
      'Delivery-first meal prep with pickup hubs in suburban neighbourhoods.',
  },
  {
    name: 'Clearview Home Organizing',
    slug: 'clearview-home-organizing',
    categoryName: 'Home Services',
    startupCostMin: 8000,
    startupCostMax: 25000,
    estimatedMonthlyRevenueMin: 8000,
    estimatedMonthlyRevenueMax: 22000,
    launchTimeline: '2–4 weeks',
    difficultyLevel: 'low',
    territoryStatus: 'available',
    shortDescription:
      'Premium organizing for downsizers, relocations, and home office setups.',
  },
]
