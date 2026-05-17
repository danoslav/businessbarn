/**
 * Apply Payload DB migrations.
 * Usage: node --experimental-strip-types scripts/db-migrate.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { getPayload } from '../node_modules/payload/dist/index.js'

for (const file of ['.env.local', '.env']) {
  const envPath = path.resolve(process.cwd(), file)
  if (!fs.existsSync(envPath)) continue
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^([^#=]+)=(.*)$/)
    if (!m) continue
    const key = m[1].trim()
    if (!process.env[key]) process.env[key] = m[2].trim().replace(/^["']|["']$/g, '')
  }
  break
}

if (!process.env.DATABASE_URL) {
  console.warn('DATABASE_URL not set — skipping migrations.')
  process.exit(0)
}

process.env.PAYLOAD_MIGRATING = 'true'

const configPath = path.resolve(process.cwd(), 'src/payload.config.ts')
const { default: config } = await import(pathToFileURL(configPath).href)

const payload = await getPayload({ config })

if (!payload.db?.migrate) {
  await payload.destroy()
  throw new Error('Database adapter does not support migrate')
}

await payload.db.migrate()
await payload.destroy()
console.log('Migrations applied successfully.')
