type Props = {
  variant?: 'sidebar' | 'page'
}

const STEPS = [
  { step: '1', text: 'We review your submission within one business day.' },
  {
    step: '2',
    text: 'We send you a few follow-up questions to understand your idea and decision context.',
  },
  {
    step: '3',
    text: 'We book a free 20-minute fit call: no pitch, just honest questions to make sure we are the right fit for what you need.',
  },
  {
    step: '4',
    text: 'If we are a good match, we scope the engagement and get started.',
  },
]

export default function WhatHappensNext({ variant = 'sidebar' }: Props) {
  const isPage = variant === 'page'

  return (
    <div className={isPage ? 'space-y-10' : 'space-y-8'}>
      <div>
        <h2
          className={
            isPage
              ? 'font-serif text-2xl font-bold text-ink-900 mb-6'
              : 'font-serif text-xl font-bold text-ink-900 mb-4'
          }
        >
          What happens next
        </h2>
        <ul className="space-y-4">
          {STEPS.map(({ step, text }) => (
            <li key={step} className="flex items-start gap-4">
              <span className="font-serif text-2xl font-bold text-barn-600/40 shrink-0">
                {step}
              </span>
              <p className="text-sm text-ink-600 leading-relaxed pt-1">{text}</p>
            </li>
          ))}
        </ul>
      </div>

      <div
        className={
          isPage
            ? 'bg-white border border-ink-200 rounded-xl p-8 shadow-sm'
            : 'bg-white border border-ink-200 rounded-lg p-6'
        }
      >
        <h3 className="font-semibold text-ink-900 mb-2 text-sm">
          You do not need a polished idea
        </h3>
        <p className="text-sm text-ink-500 leading-relaxed">
          A rough concept, a question you cannot answer, or a decision you are stuck on. All good
          starting points. We will help you figure out what you actually need.
        </p>
      </div>
    </div>
  )
}
