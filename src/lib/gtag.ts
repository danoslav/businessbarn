/**
 * Google Analytics 4 (gtag.js) helpers.
 *
 * CTA click labels: use `data-ga-cta` with snake_case `{area}_{intent}`, e.g.
 * `header_book_call`, `home_hero_consulting`, `package_card_view_accelerator`.
 */

import { getSiteUrl } from './site-url'

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? ''

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

function getGtag(): typeof window.gtag | undefined {
  if (typeof window === 'undefined') return undefined
  return window.gtag
}

export function gtag(...args: unknown[]): void {
  if (!GA_MEASUREMENT_ID) return
  const fn = getGtag()
  if (typeof fn !== 'function') return
  fn(...args)
}

/** GA4 recommended + custom events with optional params. */
export function gtagEvent(
  name: string,
  params?: Record<string, string | number | boolean | undefined>,
): void {
  if (!GA_MEASUREMENT_ID) return
  gtag('event', name, params ?? {})
}

/**
 * SPA / App Router page view: send config with page_path + page_location.
 * Initial tag load uses send_page_view: false; this drives all page_view hits.
 */
export function gtagConfigPageView(pathWithQuery: string, pageTitle?: string): void {
  if (!GA_MEASUREMENT_ID) return
  const path = pathWithQuery.startsWith('/') ? pathWithQuery : `/${pathWithQuery}`
  const origin =
    typeof window !== 'undefined' && window.location?.origin
      ? window.location.origin
      : getSiteUrl()
  const page_location = `${origin.replace(/\/$/, '')}${path}`

  gtag('config', GA_MEASUREMENT_ID, {
    page_path: path,
    page_location,
    ...(pageTitle ? { page_title: pageTitle } : {}),
  })
}
