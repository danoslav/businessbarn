'use client'

import { useState } from 'react'

type FAQItem = { question: string; answer: string }

type Props = {
  items: FAQItem[]
  schema?: boolean
}

export default function FAQAccordion({ items, schema = true }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const jsonLd = schema
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map(({ question, answer }) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: { '@type': 'Answer', text: answer },
        })),
      }
    : null

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <div className="divide-y divide-ink-200">
        {items.map(({ question, answer }, i) => (
          <div key={i}>
            <button
              className="w-full text-left py-4 flex items-center justify-between gap-4 hover:text-ink-900 transition-colors"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <span className="font-semibold text-ink-900 text-sm">{question}</span>
              <svg
                className={`w-4 h-4 shrink-0 text-ink-400 transition-transform duration-200 ${
                  openIndex === i ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openIndex === i && (
              <div className="pb-4 text-sm text-ink-600 leading-relaxed">{answer}</div>
            )}
          </div>
        ))}
      </div>
    </>
  )
}
