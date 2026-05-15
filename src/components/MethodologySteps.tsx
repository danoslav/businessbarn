const STEPS = [
  {
    number: '01',
    title: 'Market reality',
    body: 'Who buys, how often, and why? We look at real local demand signals, not broad market estimates.',
  },
  {
    number: '02',
    title: 'Competitive pressure',
    body: 'Who else solves this problem and how strong are they? We map real competitors, not just generic industry data.',
  },
  {
    number: '03',
    title: 'Revenue pressure',
    body: 'How much does the business need to sell to survive? We build a realistic revenue pressure model before assuming the best case.',
  },
  {
    number: '04',
    title: 'Cost structure',
    body: 'What costs are fixed, variable, seasonal, or underestimated? We pressure-test the assumptions founders most often get wrong.',
  },
  {
    number: '05',
    title: 'Location fit',
    body: 'Does the trade area support the concept? Foot traffic, demographics, competition density, and lease terms all matter.',
  },
  {
    number: '06',
    title: 'Digital demand',
    body: 'Can customers find and choose the business online? We assess search intent, competitive SEO, and channel fit.',
  },
  {
    number: '07',
    title: 'Founder fit',
    body: 'Does the operator match the demands of the business? Skills, time, capital, risk tolerance, and operational complexity all factor in.',
  },
  {
    number: '08',
    title: 'Risk visibility',
    body: 'What could make the plan fail? We surface the assumptions that need to hold true and the conditions that would break the model.',
  },
]

export default function MethodologySteps() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {STEPS.map(({ number, title, body }) => (
        <div key={number}>
          <p className="font-serif text-3xl font-bold text-barn-600 mb-2">{number}</p>
          <h3 className="font-serif font-semibold text-ink-900 mb-2">{title}</h3>
          <p className="text-sm text-ink-500 leading-relaxed">{body}</p>
        </div>
      ))}
    </div>
  )
}
