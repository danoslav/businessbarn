'use client'

import Link from 'next/link'
import { useState } from 'react'

const NAV = [
  {
    label: 'Buy a Business',
    href: '/buy',
    children: [
      { label: 'Browse Listings', href: '/buy' },
      { label: 'How It Works', href: '/buy#how-it-works' },
    ],
  },
  { label: 'Sell Your Business', href: '/sell' },
  {
    label: 'Business Concepts',
    href: '/concepts',
    highlight: true,
    children: [
      { label: 'All Concepts', href: '/concepts' },
      { label: 'Request a Briefing', href: '/request-briefing' },
    ],
  },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-ink-200">
      <div className="site-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="font-serif text-xl font-bold text-forest-950">Business</span>
            <span className="font-serif text-xl font-bold text-amber-600">BARN</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 text-sm font-medium rounded transition-colors duration-150 ${
                  item.highlight
                    ? 'text-terra-700 hover:bg-terra-50'
                    : 'text-ink-700 hover:text-ink-900 hover:bg-ink-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/valuation" className="btn-secondary py-2 text-xs">
              Free Valuation
            </Link>
            <Link href="/contact" className="btn-primary py-2 text-xs">
              Contact Us
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded text-ink-700 hover:bg-ink-100"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="lg:hidden border-t border-ink-100 bg-white">
          <div className="site-container py-4 flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`px-3 py-2 text-sm font-medium rounded ${
                  item.highlight ? 'text-terra-700' : 'text-ink-800'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex gap-3 mt-3 pt-3 border-t border-ink-100">
              <Link href="/valuation" className="btn-secondary py-2 text-xs flex-1 text-center">
                Free Valuation
              </Link>
              <Link href="/contact" className="btn-primary py-2 text-xs flex-1 text-center">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
