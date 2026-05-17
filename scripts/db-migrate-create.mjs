/**
 * Create a new Payload DB migration.
 * Usage: node --experimental-strip-types scripts/db-migrate-create.mjs [migrationName]
 */
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import payload from '../node_modules/payload/dist/index.js'

const migrationName = process.argv[2] ?? `initial_${Date.now()}`

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

process.env.PAYLOAD_MIGRATING = 'true'

const configPath = path.resolve(process.cwd(), 'src/payload.config.ts')
const { default: config } = await import(pathToFileURL(configPath).href)

await payload.init({
  config,
  disableDBConnect: true,
  disableOnInit: true,
})

const adapter = payload.db
if (!adapter?.createMigration) {
  await payload.destroy()
  throw new Error('Database adapter does not support createMigration')
}

await adapter.createMigration({
  migrationName,
  payload,
  forceAcceptWarning: false,
  skipEmpty: false,
})

await payload.destroy()
console.log(`Created migration: ${migrationName}`)
