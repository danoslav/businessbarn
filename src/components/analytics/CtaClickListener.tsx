'use client'

import { useEffect } from 'react'
import { GA_MEASUREMENT_ID, gtagEvent } from '@/lib/gtag'

function truncate(s: string, max: number): string {
  const t = s.trim().replace(/\s+/g, ' ')
  return t.length <= max ? t : `${t.slice(0, max - 1)}…`
}

export default function CtaClickListener() {
  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return

    const handler = (event: MouseEvent) => {
      if (event.defaultPrevented) return
      if (event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

      const target = event.target as HTMLElement | null
      if (!target) return

      const el = target.closest('[data-ga-cta]') as HTMLElement | null
      if (!el) return

      const cta_location = el.getAttribute('data-ga-cta')
      if (!cta_location) return

      const anchor = el.closest('a') as HTMLAnchorElement | null
      const link_url = anchor?.href ?? ''
      const link_text = truncate(anchor?.textContent ?? el.textContent ?? '', 100)
      const page_path =
        typeof window !== 'undefined' ? `${window.location.pathname}${window.location.search}` : ''

      gtagEvent('cta_click', {
        cta_location,
        link_url: link_url || undefined,
        link_text,
        page_path,
      })
    }

    document.addEventListener('click', handler, true)
    return () => document.removeEventListener('click', handler, true)
  }, [])

  return null
}
