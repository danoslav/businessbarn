# The Business Barn — Website

Marketing site and headless CMS for **The Business Barn**: small-business planning packages and a marketplace of pre-vetted business concepts. Public pages are a Next.js App Router frontend; content and leads live in [Payload CMS](https://payloadcms.com/) backed by Postgres.

## Stack

| Layer | Technology |
|--------|------------|
| Framework | [Next.js](https://nextjs.org/) 15 (App Router) |
| CMS | [Payload 3](https://payloadcms.com/) |
| Database | PostgreSQL (e.g. [Neon](https://neon.tech/)) |
| Media | [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) (optional; gated by env) |
| Styling | Tailwind CSS |
| Analytics | Google Analytics 4 (`gtag.js`), env-driven |

## Requirements

- Node.js 20+ (LTS recommended)
- npm
- A Postgres `DATABASE_URL` Payload can use

## Local setup

1. **Clone and install**

   ```bash
   git clone https://github.com/danoslav/businessbarn.git
   cd businessbarn
   npm install
   ```

2. **Environment**

   ```bash
   cp .env.example .env.local
   ```

   Fill in at least:

   - `DATABASE_URL` — Neon (or other) connection string  
   - `PAYLOAD_SECRET` — long random secret (`openssl rand -base64 32`)  
   - `NEXT_PUBLIC_SITE_URL` — full site URL with protocol (e.g. `https://localhost:3000` for local)  
   - `NEXT_PUBLIC_GA_MEASUREMENT_ID` — optional; GA4 measurement ID for analytics  

   For uploads to Vercel Blob, set `BLOB_READ_WRITE_TOKEN` (otherwise configure Payload without Blob as needed).

3. **Run**

   ```bash
   npm run dev
   ```

   - Site: [http://localhost:3000](http://localhost:3000)  
   - Payload admin: [http://localhost:3000/admin](http://localhost:3000/admin) (create first user on first boot)

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Next.js dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server (after `build`) |
| `npm run lint` | ESLint |
| `npm run generate:types` | Regenerate Payload TypeScript types |
| `npm run generate:importmap` | Regenerate Payload admin import map |

## Project layout (high level)

- `src/app/(frontend)/` — Public marketing routes, shared layout, SEO (`sitemap.ts`, `robots.ts` at `src/app/`)
- `src/app/(payload)/` — Payload admin UI and REST/Graph API routes
- `src/collections/` — Payload collection configs (concepts, leads, consulting packages, resources, etc.)
- `src/components/` — React UI (including `analytics/` for GA4)
- `src/lib/` — Payload helpers, server actions (e.g. lead form), `site.ts` / `gtag.ts`
- `public/llms.txt` — Optional `llms.txt` for tooling discovery

## Deployment (Vercel)

1. Link the repo and set **all** variables from `.env.example` in the Vercel project (Production / Preview as needed).  
2. **`NEXT_PUBLIC_SITE_URL`** should match your **canonical** public URL (used for metadata and fallbacks). Sitemap and robots use the **request host** when present so custom domains (e.g. `www.…`) stay valid in Google Search Console.  
3. **`NEXT_PUBLIC_GA_MEASUREMENT_ID`** must be set for GA4; the tag is **server-rendered in `<head>`** so Google’s tag verification sees it without relying on client-only scripts.  
4. Run `npm run build` locally if you need to debug build failures before pushing.

## Lead form debugging

Submissions go through the Server Action in `src/lib/actions.ts` and create documents in the `leads` collection. If the UI shows a generic “Submission failed” message, check **Vercel → project → Logs** (or your host’s server logs) for `[The Business Barn] Lead submission error:` — typical causes are missing `DATABASE_URL`, schema drift vs. DB, or Payload validation errors on create.

## License

Private repository — all rights reserved unless otherwise stated by the owner.
