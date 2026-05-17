/**
 * Record the production migration as applied when schema already exists (e.g. from dev push).
 * Does not run SQL — only inserts into payload_migrations if missing.
 */
import { requireDatabaseUrl } from './load-env-file.mjs'

const MIGRATION_NAME = '20260517_153526_20250517_initial'

requireDatabaseUrl()

const { default: postgres } = await import('postgres')

const sql = postgres(process.env.DATABASE_URL, { max: 1 })

try {
  const existing = await sql`
    SELECT name FROM payload_migrations WHERE name = ${MIGRATION_NAME} LIMIT 1
  `
  if (existing.length > 0) {
    console.log(`Migration "${MIGRATION_NAME}" is already recorded.`)
    process.exit(0)
  }

  const maxBatch = await sql`
    SELECT COALESCE(MAX(batch), 0) AS max_batch FROM payload_migrations WHERE batch >= 0
  `
  const batch = Number(maxBatch[0]?.max_batch ?? 0) + 1

  await sql`
    INSERT INTO payload_migrations (name, batch, created_at, updated_at)
    VALUES (${MIGRATION_NAME}, ${batch}, NOW(), NOW())
  `

  console.log(`Recorded migration "${MIGRATION_NAME}" (batch ${batch}).`)
} finally {
  await sql.end()
}
