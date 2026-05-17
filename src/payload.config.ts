import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { CRMActivities } from './collections/CRMActivities'
import { Concepts } from './collections/Concepts'
import { ConsultingPackages } from './collections/ConsultingPackages'
import { Leads } from './collections/Leads'
import { Locations } from './collections/Locations'
import { Media } from './collections/Media'
import { Resources } from './collections/Resources'
import { Territories } from './collections/Territories'
import { Users } from './collections/Users'
import { migrations } from './migrations'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '— The Business Barn Admin',
    },
  },
  collections: [
    // Consulting
    ConsultingPackages,
    // Concepts marketplace
    Concepts,
    Categories,
    Locations,
    Territories,
    // CRM
    Leads,
    CRMActivities,
    // Content
    Resources,
    Media,
    // System
    Users,
  ],
  editor: lexicalEditor(),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    migrationDir: path.resolve(dirname, 'migrations'),
    prodMigrations: migrations,
  }),
  ...(process.env.SMTP_HOST
    ? {
        email: nodemailerAdapter({
          defaultFromAddress:
            process.env.SMTP_FROM || process.env.LEADS_NOTIFY_EMAIL || 'hello@thebusinessbarn.ca',
          defaultFromName: 'The Business Barn',
          transportOptions: {
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT || 587),
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS,
            },
          },
        }),
      }
    : {}),
  plugins: [
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
      collections: {
        media: true,
      },
    }),
  ],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  upload: {
    limits: {
      fileSize: 5_000_000,
    },
  },
})
