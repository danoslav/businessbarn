/**
 * Apply Payload DB migrations (avoids payload/bin loadEnv — broken on Node 24 + tsx).
 * Usage: npm run db:migrate
 */
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { loadEnvFiles } from './load-env-file.mjs'

loadEnvFiles()
if (!process.env.DATABASE_URL) {
  console.warn('DATABASE_URL not set — skipping migrations.')
  process.exit(0)
}

process.env.PAYLOAD_MIGRATING = 'true'

const configPath = path.resolve(process.cwd(), 'src/payload-cli.config.ts')
const { default: config } = await import(pathToFileURL(configPath).href)

const { migrate } = await import('../node_modules/payload/dist/bin/migrate.js')

await migrate({
  config,
  parsedArgs: { _: ['migrate'] },
})

console.log('Migrations applied successfully.')
