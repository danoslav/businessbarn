/**
 * Apply Payload DB migrations (avoids payload/bin loadEnv — broken on Node 24 + tsx).
 * Usage: npm run db:migrate
 */
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

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

const { migrate } = await import('../node_modules/payload/dist/bin/migrate.js')

await migrate({
  config,
  parsedArgs: { _: ['migrate'] },
})

console.log('Migrations applied successfully.')
