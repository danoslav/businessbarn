/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://thebusinessbarn.ca',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/api',
        ],
      },
    ],
  },
  exclude: [
    '/admin',
    '/admin/*',
    '/api/*',
  ],
  additionalPaths: async () => [
    { loc: '/consulting', changefreq: 'weekly', priority: 0.9 },
    { loc: '/consulting/basic', changefreq: 'monthly', priority: 0.8 },
    { loc: '/consulting/accelerator', changefreq: 'monthly', priority: 0.8 },
    { loc: '/consulting/digital-incubator', changefreq: 'monthly', priority: 0.8 },
    { loc: '/consulting/superscaler', changefreq: 'monthly', priority: 0.8 },
    { loc: '/concepts', changefreq: 'weekly', priority: 0.9 },
    { loc: '/how-it-works', changefreq: 'monthly', priority: 0.7 },
    { loc: '/methodology', changefreq: 'monthly', priority: 0.7 },
    { loc: '/book-a-call', changefreq: 'monthly', priority: 0.8 },
    { loc: '/resources', changefreq: 'weekly', priority: 0.7 },
    { loc: '/about', changefreq: 'monthly', priority: 0.6 },
    { loc: '/contact', changefreq: 'monthly', priority: 0.6 },
    { loc: '/faq', changefreq: 'monthly', priority: 0.7 },
    { loc: '/legal/terms', changefreq: 'yearly', priority: 0.3 },
    { loc: '/legal/privacy', changefreq: 'yearly', priority: 0.3 },
    { loc: '/legal/earnings-disclaimer', changefreq: 'yearly', priority: 0.3 },
  ],
}
