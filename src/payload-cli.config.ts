/**
 * Minimal Payload config for CLI scripts (migrate / seed).
 * Avoids nodemailer + blob imports that break under tsx on some Node versions.
 */
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
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
  },
  collections: [
    ConsultingPackages,
    Concepts,
    Categories,
    Locations,
    Territories,
    Leads,
    CRMActivities,
    Resources,
    Media,
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
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
