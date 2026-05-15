import Link from 'next/link'

const LINKS = {
  Consulting: [
    { label: 'All Packages', href: '/consulting' },
    { label: 'Basic Plan', href: '/consulting/basic' },
    { label: 'Accelerator Plan', href: '/consulting/accelerator' },
    { label: 'Digital Incubator', href: '/consulting/digital-incubator' },
    { label: 'Superscaler Plan', href: '/consulting/superscaler' },
  ],
  'Business Concepts': [
    { label: 'Browse All Concepts', href: '/concepts' },
    { label: 'Browse by Category', href: '/concepts' },
    { label: 'Submit Your Idea', href: '/book-a-call' },
  ],
  Company: [
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Our Methodology', href: '/methodology' },
    { label: 'Resources', href: '/resources' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'FAQ', href: '/faq' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/legal/privacy' },
    { label: 'Terms of Service', href: '/legal/terms' },
    { label: 'Earnings Disclaimer', href: '/legal/earnings-disclaimer' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-ink-900 text-ink-300">
      <div className="site-container py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-baseline gap-1 mb-4">
              <span className="font-serif text-base font-bold text-white">The Business</span>
              <span className="font-serif text-base font-bold text-barn-400">Barn</span>
            </Link>
            <p className="text-sm text-ink-400 leading-relaxed mb-4">
              Better questions. Better business starts.
            </p>
            <Link href="/book-a-call" className="btn-primary text-xs py-2">
              Book a Planning Call
            </Link>
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

        <div className="mt-12 pt-8 border-t border-ink-800 flex flex-col sm:flex-row justify-between gap-4 text-xs text-ink-500">
          <p>&copy; {new Date().getFullYear()} The Business Barn. All rights reserved.</p>
          <p className="max-w-xl">
            Business concept revenue figures are illustrative estimates only and are not a guarantee
            of performance. Consulting packages do not guarantee business success. Seek independent
            legal, financial, and professional advice before making any business commitment.
          </p>
        </div>
      </div>
    </footer>
  )
}
