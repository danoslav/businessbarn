'use client'

import { useActionState } from 'react'
import { submitLead, type LeadFormState } from '@/lib/actions'

type Props = {
  packageInterest: 'side-one' | 'side-two' | 'sell' | 'both' | 'general'
  conceptSlug?: string
  listingSlug?: string
  sourceURL?: string
  showTerritory?: boolean
  showMessage?: boolean
  ctaLabel?: string
}

const initialState: LeadFormState = { success: false }

export default function LeadForm({
  packageInterest,
  conceptSlug,
  listingSlug,
  sourceURL,
  showTerritory = false,
  showMessage = true,
  ctaLabel = 'Submit',
}: Props) {
  const [state, action, pending] = useActionState(submitLead, initialState)

  if (state.success) {
    return (
      <div className="rounded-lg bg-forest-50 border border-forest-200 p-6 text-center">
        <p className="font-serif text-lg font-semibold text-forest-900 mb-1">Thank you!</p>
        <p className="text-sm text-ink-600">
          We&apos;ll be in touch within one business day.
        </p>
      </div>
    )
  }

  const fe = state.fieldErrors ?? {}

  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="packageInterest" value={packageInterest} />
      {conceptSlug && <input type="hidden" name="conceptSlug" value={conceptSlug} />}
      {listingSlug && <input type="hidden" name="listingSlug" value={listingSlug} />}
      {sourceURL && <input type="hidden" name="sourceURL" value={sourceURL} />}

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Full name" name="name" required error={fe.name?.[0]} />
        <Field label="Email" name="email" type="email" required error={fe.email?.[0]} />
      </div>

      <Field label="Phone (optional)" name="phone" type="tel" error={fe.phone?.[0]} />

      {showTerritory && (
        <Field
          label="Your city or region"
          name="territory"
          placeholder="e.g. Victoria, B.C."
          error={fe.territory?.[0]}
        />
      )}

      {showMessage && (
        <div>
          <label className="block text-sm font-medium text-ink-700 mb-1">
            Message <span className="text-ink-400 font-normal">(optional)</span>
          </label>
          <textarea
            name="message"
            rows={4}
            className="w-full rounded border border-ink-200 px-3 py-2 text-sm text-ink-900 placeholder-ink-400 focus:outline-none focus:ring-2 focus:ring-forest-700 focus:border-transparent"
            placeholder="Tell us about your goals or questions…"
          />
        </div>
      )}

      {state.error && (
        <p className="text-sm text-red-600">{state.error}</p>
      )}

      <button type="submit" disabled={pending} className="btn-primary w-full justify-center">
        {pending ? 'Submitting…' : ctaLabel}
      </button>

      <p className="text-xs text-ink-400 text-center">
        We respect your privacy and will never share your information.
      </p>
    </form>
  )
}

function Field({
  label,
  name,
  type = 'text',
  required,
  placeholder,
  error,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
  placeholder?: string
  error?: string
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-ink-700 mb-1">
        {label}
        {required && <span className="text-amber-600 ml-0.5">*</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className={`w-full rounded border px-3 py-2 text-sm text-ink-900 placeholder-ink-400 focus:outline-none focus:ring-2 focus:ring-forest-700 focus:border-transparent ${
          error ? 'border-red-400' : 'border-ink-200'
        }`}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  )
}
