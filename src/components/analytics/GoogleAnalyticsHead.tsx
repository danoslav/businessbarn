import Script from 'next/script'

/**
 * GA4 via next/script so the tag loads after the page is interactive (better LCP).
 * send_page_view is disabled; GtagPageView sends route changes.
 */
function isValidGa4MeasurementId(id: string): boolean {
  return /^G-[A-Z0-9]+$/i.test(id.trim())
}

export default function GoogleAnalyticsHead() {
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ?? ''
  if (!id || !isValidGa4MeasurementId(id)) return null

  const init = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', ${JSON.stringify(id)}, { send_page_view: false });
`.trim()

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {init}
      </Script>
    </>
  )
}
