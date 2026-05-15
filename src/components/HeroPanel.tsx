import Link from 'next/link'

type CTA = {
  label: string
  href: string
  variant?: 'primary' | 'secondary' | 'outline-white'
  /** `data-ga-cta` for CtaClickListener */
  gaCta?: string
}

type Props = {
  eyebrow?: string
  heading: string
  body?: string
  ctas?: CTA[]
  dark?: boolean
  children?: React.ReactNode
}

export default function HeroPanel({ eyebrow, heading, body, ctas = [], dark = true, children }: Props) {
  return (
    <section className={dark ? 'bg-ink-900 text-white py-14 lg:py-20' : 'bg-cream py-14 lg:py-20'}>
      <div className="site-container">
        <div className="max-w-3xl">
          {eyebrow && (
            <p className={`text-xs font-semibold uppercase tracking-widest mb-3 ${dark ? 'text-harvest-400' : 'text-barn-600'}`}>
              {eyebrow}
            </p>
          )}
          <h1 className={`font-serif text-4xl lg:text-5xl font-bold leading-tight mb-4 ${dark ? 'text-white' : 'text-ink-900'}`}>
            {heading}
          </h1>
          {body && (
            <p className={`text-lg leading-relaxed mb-8 max-w-xl ${dark ? 'text-ink-300' : 'text-ink-600'}`}>
              {body}
            </p>
          )}
          {ctas.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {ctas.map((cta) => (
                <Link
                  key={cta.href + cta.label}
                  href={cta.href}
                  className={
                    cta.variant === 'outline-white'
                      ? 'inline-flex items-center px-6 py-3 border border-white/30 text-white hover:bg-white/10 font-semibold text-sm rounded transition-colors duration-150'
                      : cta.variant === 'secondary'
                      ? 'btn-secondary'
                      : 'btn-primary'
                  }
                  {...(cta.gaCta ? { 'data-ga-cta': cta.gaCta } : {})}
                >
                  {cta.label}
                </Link>
              ))}
            </div>
          )}
          {children}
        </div>
      </div>
    </section>
  )
}
