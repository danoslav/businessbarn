'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { GA_MEASUREMENT_ID, gtagConfigPageView } from '@/lib/gtag'

export default function GtagPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return
    const path = pathname || '/'
    const q = searchParams?.toString()
    const pathWithQuery = q ? `${path}?${q}` : path
    gtagConfigPageView(pathWithQuery)
  }, [pathname, searchParams])

  return null
}
