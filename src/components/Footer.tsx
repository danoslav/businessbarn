import Link from 'next/link'

const LINKS = {
  'Buy & Sell': [
    { label: 'Browse Listings', href: '/buy' },
    { label: 'Sell Your Business', href: '/sell' },
    { label: 'Free Valuation', href: '/valuation' },
  ],
  'Business Concepts': [
    { label: 'All Concepts', href: '/concepts' },
    { label: 'Request a Briefing', href: '/request-briefing' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-forest-950 text-ink-300">
      <div className="site-container py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-baseline gap-1 mb-4">
              <span className="font-serif text-lg font-bold text-white">Business</span>
              <span className="font-serif text-lg font-bold text-amber-400">BARN</span>
            </Link>
            <p className="text-sm text-ink-400 leading-relaxed">
              B.C.&apos;s marketplace for buying, selling, and starting businesses.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([heading, items]) => (
            <div key={heading}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-ink-500 mb-3">
                {heading}
              </h3>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-ink-400 hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-forest-900 flex flex-col sm:flex-row justify-between gap-4 text-xs text-ink-500">
          <p>&copy; {new Date().getFullYear()} BusinessBARN. All rights reserved.</p>
          <p className="max-w-xl">
            BusinessBARN is a business brokerage and marketplace. Nothing on this site constitutes
            an offer to sell a franchise or a guarantee of earnings. Seek independent legal and
            financial advice before any transaction.
          </p>
        </div>
      </div>
    </footer>
  )
}
