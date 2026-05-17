/**
 * Create a new Payload DB migration.
 * Usage: node --experimental-strip-types scripts/db-migrate-create.mjs [migrationName]
 */
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import payload from '../node_modules/payload/dist/index.js'
import { loadEnvFiles } from './load-env-file.mjs'

const migrationName = process.argv[2] ?? `initial_${Date.now()}`

loadEnvFiles()

process.env.PAYLOAD_MIGRATING = 'true'

const configPath = path.resolve(process.cwd(), 'src/payload-cli.config.ts')
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
