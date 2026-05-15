'use client'

import { useActionState } from 'react'
import { submitLead, type LeadState } from '@/lib/actions'

type Props = {
  leadType?: 'consulting' | 'concept' | 'general'
  packageSlug?: string
  conceptSlug?: string
  categoryParam?: string
  locationParam?: string
  heading?: string
  subheading?: string
}

const INITIAL: LeadState = { status: 'idle' }

export default function LeadForm({
  leadType = 'general',
  packageSlug,
  conceptSlug,
  categoryParam,
  locationParam,
  heading = 'Book a planning call',
  subheading = "Tell us what you're working on and we'll get back to you within one business day.",
}: Props) {
  const [state, action, pending] = useActionState(submitLead, INITIAL)

  if (state.status === 'success') {
    return (
      <div className="bg-field-50 border border-field-200 rounded-lg p-8 text-center">
        <p className="font-serif text-xl font-semibold text-field-700 mb-2">Got it — thanks!</p>
        <p className="text-sm text-ink-600">
          We review every submission and will be in touch within one business day.
        </p>
      </div>
    )
  }

  const fieldError = (key: string): string | undefined =>
    state.status === 'error' ? state.errors[key]?.[0] : undefined

  return (
    <div>
      {heading && (
        <h2 className="font-serif text-2xl font-bold text-ink-900 mb-1">{heading}</h2>
      )}
      {subheading && <p className="text-sm text-ink-500 mb-6">{subheading}</p>}

      {state.status === 'serverError' && (
        <div className="notice-warning mb-4">
          <p className="font-semibold">Submission failed</p>
          <p>{state.message}</p>
        </div>
      )}

      <form action={action} className="space-y-4">
        {/* Hidden context */}
        <input type="hidden" name="leadType" value={leadType} />
        {packageSlug && <input type="hidden" name="packageSlug" value={packageSlug} />}
        {conceptSlug && <input type="hidden" name="conceptSlug" value={conceptSlug} />}
        {categoryParam && <input type="hidden" name="categoryParam" value={categoryParam} />}
        {locationParam && <input type="hidden" name="locationParam" value={locationParam} />}

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Full name *" error={fieldError('name')}>
            <input name="name" type="text" required className="input" placeholder="Jane Smith" />
          </Field>
          <Field label="Email *" error={fieldError('email')}>
            <input name="email" type="email" required className="input" placeholder="jane@example.com" />
          </Field>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Phone (optional)">
            <input name="phone" type="tel" className="input" placeholder="+1 250 000 0000" />
          </Field>
          <Field label="City or region">
            <input name="city" type="text" className="input" placeholder="e.g. Victoria, BC" />
          </Field>
        </div>

        {leadType === 'general' && (
          <Field label="What type of business are you considering?">
            <input name="businessType" type="text" className="input" placeholder="e.g. mobile coffee cart, bookkeeping firm" />
          </Field>
        )}

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Startup budget">
            <select name="startupBudget" className="input">
              <option value="">— Select range —</option>
              <option value="under-10k">Under $10,000</option>
              <option value="10k-30k">$10,000–$30,000</option>
              <option value="30k-75k">$30,000–$75,000</option>
              <option value="75k-150k">$75,000–$150,000</option>
              <option value="150k-plus">$150,000+</option>
              <option value="unsure">Not sure yet</option>
            </select>
          </Field>
          <Field label="Launch timeline">
            <select name="launchTimeline" className="input">
              <option value="">— Select timeline —</option>
              <option value="asap">As soon as possible</option>
              <option value="1-3mo">1–3 months</option>
              <option value="3-6mo">3–6 months</option>
              <option value="6-12mo">6–12 months</option>
              <option value="exploring">Just exploring</option>
            </select>
          </Field>
        </div>

        <Field label="What decision are you trying to make next?">
          <textarea
            name="message"
            rows={4}
            className="input resize-none"
            placeholder="Tell us what you're weighing up — the more context, the better we can help."
          />
        </Field>

        <Field error={fieldError('consent')}>
          <label className="flex items-start gap-3 cursor-pointer">
            <input name="consent" type="checkbox" className="mt-0.5 h-4 w-4 rounded border-ink-300 text-barn-600" />
            <span className="text-xs text-ink-500 leading-relaxed">
              I consent to The Business Barn contacting me about my enquiry. I understand my data
              will be handled in accordance with the{' '}
              <a href="/legal/privacy" className="underline hover:text-ink-900">Privacy Policy</a>.
            </span>
          </label>
        </Field>

        <button type="submit" disabled={pending} className="btn-primary w-full justify-center">
          {pending ? 'Sending…' : 'Send my enquiry'}
        </button>
      </form>
    </div>
  )
}

function Field({
  label,
  error,
  children,
}: {
  label?: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      {label && (
        <label className="block text-xs font-semibold text-ink-700 mb-1">{label}</label>
      )}
      {children}
      {error && <p className="text-xs text-barn-600 mt-1">{error}</p>}
    </div>
  )
}
