import type { Metadata } from 'next'
import Link from 'next/link'
import MethodologySteps from '@/components/MethodologySteps'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Our Methodology | The Business Barn',
  description:
    'The eight-question framework we use to pressure-test every business concept and planning engagement. Real analysis, not templates.',
}

export default function MethodologyPage() {
  return (
    <>
      <section className="bg-ink-900 text-white py-12 lg:py-16">
        <div className="site-container">
          <Breadcrumbs crumbs={[{ label: 'Our Methodology' }]} />
          <p className="text-xs font-semibold uppercase tracking-widest text-harvest-400 mb-3">
            Our approach
          </p>
          <h1 className="font-serif text-4xl font-bold mb-3">
            Eight questions every serious founder needs answered
          </h1>
          <p className="text-base text-ink-300 max-w-xl">
            Most business planning focuses on the pitch. We focus on the conditions most likely
            to make a real business succeed or fail. Every engagement and every concept runs
            through the same framework.
          </p>
        </div>
      </section>

      <section className="bg-cream py-14 lg:py-20">
        <div className="site-container">
          <div className="max-w-2xl mb-12">
            <h2 className="font-serif text-2xl font-bold text-ink-900 mb-4">
              Why we built this framework
            </h2>
            <p className="text-sm text-ink-600 leading-relaxed mb-4">
              Most small business failures are not bad ideas. They are good ideas with unanswered
              questions. Demand that was assumed rather than researched. Costs that were
              underestimated because no one pressure-tested them. Competition that was ignored
              because the founder was in love with the concept.
            </p>
            <p className="text-sm text-ink-600 leading-relaxed">
              We designed our methodology to surface those unanswered questions before you commit
              capital, time, and energy. The eight layers below are the areas most likely to
              determine whether a small business survives its first two years.
            </p>
          </div>

          <MethodologySteps />

          <div className="mt-14 grid md:grid-cols-2 gap-8">
            <div className="bg-white border border-ink-200 rounded-lg p-7">
              <h3 className="font-serif text-lg font-bold text-ink-900 mb-3">
                For your own idea
              </h3>
              <p className="text-sm text-ink-600 leading-relaxed mb-4">
                Bring us your concept and we run it through all eight layers. The depth of each
                layer scales with the planning package you choose.
              </p>
              <Link href="/consulting" className="btn-primary text-sm py-2" data-ga-cta="methodology_consulting">
                See planning packages →
              </Link>
            </div>
            <div className="bg-white border border-ink-200 rounded-lg p-7">
              <h3 className="font-serif text-lg font-bold text-ink-900 mb-3">
                For a pre-vetted concept
              </h3>
              <p className="text-sm text-ink-600 leading-relaxed mb-4">
                Every business concept in our marketplace has already been run through this
                framework. You see the results, including the risks, before you enquire.
              </p>
              <Link href="/concepts" className="btn-secondary text-sm py-2" data-ga-cta="methodology_concepts">
                Browse concepts →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
