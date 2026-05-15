'use client'

import Link from 'next/link'
import { useState } from 'react'

const NAV = [
  {
    label: 'Consulting',
    href: '/consulting',
    children: [
      { label: 'All Packages', href: '/consulting' },
      { label: 'Basic Plan', href: '/consulting/basic' },
      { label: 'Accelerator Plan', href: '/consulting/accelerator' },
      { label: 'Digital Incubator', href: '/consulting/digital-incubator' },
      { label: 'Superscaler Plan', href: '/consulting/superscaler' },
    ],
  },
  {
    label: 'Business Concepts',
    href: '/concepts',
    children: [
      { label: 'Browse All Concepts', href: '/concepts' },
      { label: 'Retail', href: '/concepts?category=retail' },
      { label: 'Home Services', href: '/concepts?category=home-services' },
      { label: 'Food & Beverage', href: '/concepts?category=food-and-beverage' },
      { label: 'Professional Services', href: '/concepts?category=professional-services' },
    ],
  },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Resources', href: '/resources' },
  { label: 'About', href: '/about' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-ink-200">
      <div className="site-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-baseline gap-1 shrink-0">
            <span className="font-serif text-lg font-bold text-ink-900">The Business</span>
            <span className="font-serif text-lg font-bold text-barn-600">Barn</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-ink-700 hover:text-ink-900 hover:bg-ink-50 rounded transition-colors duration-150"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Link href="/book-a-call" className="btn-primary py-2 text-xs">
              Book a Planning Call
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
                className="px-3 py-2 text-sm font-medium text-ink-800 rounded hover:bg-ink-50"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 pt-3 border-t border-ink-100">
              <Link href="/book-a-call" className="btn-primary w-full justify-center">
                Book a Planning Call
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
