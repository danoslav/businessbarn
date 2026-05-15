import type { Metadata } from 'next'
import { Lora, Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import '../globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

function toAbsoluteUrl(raw: string): string {
  if (raw.startsWith('http://') || raw.startsWith('https://')) return raw
  return `https://${raw}`
}

export const metadata: Metadata = {
  metadataBase: new URL(toAbsoluteUrl(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://businessbarn.ca')),
  title: {
    template: '%s | BusinessBARN',
    default: 'BusinessBARN — Buy, Sell & Start Businesses in B.C.',
  },
  description:
    'B.C.\'s marketplace for buying, selling, and starting businesses. Browse listings, explore proven business concepts, and get a free valuation.',
  openGraph: {
    siteName: 'BusinessBARN',
    type: 'website',
    locale: 'en_CA',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
