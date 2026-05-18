import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Fraunces, Inter, IBM_Plex_Mono } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import GoogleAnalyticsHead from '@/components/analytics/GoogleAnalyticsHead'
import GtagPageView from '@/components/analytics/GtagPageView'
import CtaClickListener from '@/components/analytics/CtaClickListener'
import { getSiteUrl } from '@/lib/site-url'
import '../globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  preload: true,
})

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  axes: ['opsz'],
  preload: true,
  adjustFontFallback: true,
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
  display: 'swap',
  preload: false,
})

export const metadata: Metadata = {
  metadataBase: new URL(`${getSiteUrl()}/`),
  title: {
    template: '%s | The Business Barn',
    default: 'The Business Barn | Better questions. Better business starts.',
  },
  description:
    'Practical business planning packages and pre-vetted business concepts for founders who want real numbers before they commit.',
  openGraph: {
    siteName: 'The Business Barn',
    type: 'website',
    locale: 'en_CA',
  },
  twitter: {
    card: 'summary_large_image',
  },
  icons: {
    icon: [{ url: '/icon.png', sizes: '48x48', type: 'image/png' }],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
}

const siteUrl = getSiteUrl()

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'The Business Barn',
  url: siteUrl,
  description:
    'Practical business planning packages and pre-vetted business concepts for founders who want real numbers before they commit.',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'CA',
    addressRegion: 'BC',
  },
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'The Business Barn',
  url: siteUrl,
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} ${ibmPlexMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <GoogleAnalyticsHead />
        <Suspense fallback={null}>
          <GtagPageView />
        </Suspense>
        <CtaClickListener />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
