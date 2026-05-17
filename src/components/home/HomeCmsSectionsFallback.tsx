export function HomePackagesFallback() {
  return (
    <section className="bg-cream py-14 lg:py-20" aria-hidden>
      <div className="site-container">
        <div className="h-8 w-48 bg-ink-100 rounded animate-pulse mb-8" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-64 bg-ink-100 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    </section>
  )
}

export function HomeConceptsFallback() {
  return (
    <section className="bg-white py-14 lg:py-20 border-t border-ink-100" aria-hidden>
      <div className="site-container">
        <div className="h-8 w-56 bg-ink-100 rounded animate-pulse mb-8" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-72 bg-ink-100 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    </section>
  )
}
