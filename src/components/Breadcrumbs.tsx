import Link from 'next/link'
import { getSiteUrl } from '@/lib/site'

type Crumb = { label: string; href?: string }

type Props = { crumbs: Crumb[] }

export default function Breadcrumbs({ crumbs }: Props) {
  const siteUrl = getSiteUrl()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      ...crumbs.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: c.label,
        ...(c.href ? { item: `${siteUrl}${c.href}` } : {}),
      })),
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-ink-400 mb-4">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        {crumbs.map((c, i) => (
          <span key={i} className="flex items-center gap-2">
            <span>/</span>
            {c.href ? (
              <Link href={c.href} className="hover:text-white transition-colors">{c.label}</Link>
            ) : (
              <span className="text-ink-300">{c.label}</span>
            )}
          </span>
        ))}
      </nav>
    </>
  )
}
