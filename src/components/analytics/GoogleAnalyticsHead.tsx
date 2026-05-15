/**
 * Server-rendered GA4 loader so the Google tag appears in the initial HTML
 * (Tag Assistant / setup verification often does not wait for client hydration).
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
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`} />
      <script dangerouslySetInnerHTML={{ __html: init }} />
    </>
  )
}
