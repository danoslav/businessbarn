import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'BusinessBARN privacy policy — how we collect, use, and protect your information.',
}

export default function PrivacyPage() {
  return (
    <section className="section bg-cream">
      <div className="site-container max-w-2xl">
        <h1 className="font-serif text-3xl font-bold text-ink-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-ink-400 mb-10">Last updated: May 2026</p>
        <div className="prose prose-sm max-w-none text-ink-700 space-y-6 leading-relaxed">
          <p>
            BusinessBARN (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates this
            website. This policy describes how we collect and use personal information when you visit
            our site or submit an enquiry form.
          </p>
          <h2 className="font-serif text-xl font-semibold text-ink-900 mt-8 mb-2">
            Information We Collect
          </h2>
          <p>
            When you submit an enquiry form, we collect your name, email address, phone number
            (optional), and any additional information you provide (territory, message). We also
            record the page from which the form was submitted.
          </p>
          <h2 className="font-serif text-xl font-semibold text-ink-900 mt-8 mb-2">
            How We Use Your Information
          </h2>
          <p>
            We use your information solely to respond to your enquiry and to keep records of our
            interactions. We do not sell, rent, or share your personal information with third
            parties except as required by law.
          </p>
          <h2 className="font-serif text-xl font-semibold text-ink-900 mt-8 mb-2">
            Data Retention
          </h2>
          <p>
            We retain enquiry records for up to three years, or until you request deletion.
            To request deletion of your data, email us at{' '}
            <a href="mailto:privacy@businessbarn.ca" className="underline text-forest-800">
              privacy@businessbarn.ca
            </a>
            .
          </p>
          <h2 className="font-serif text-xl font-semibold text-ink-900 mt-8 mb-2">
            Cookies &amp; Analytics
          </h2>
          <p>
            We may use minimal analytics (Vercel Analytics or Google Analytics) to understand how
            visitors use this site. These tools may set cookies. You can disable cookies in your
            browser settings.
          </p>
          <h2 className="font-serif text-xl font-semibold text-ink-900 mt-8 mb-2">Contact</h2>
          <p>
            Questions about this policy?{' '}
            <a href="mailto:privacy@businessbarn.ca" className="underline text-forest-800">
              privacy@businessbarn.ca
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
