/**
 * Record the production migration as applied when schema already exists (e.g. from dev push).
 * Does not run SQL — only inserts into payload_migrations if missing.
 */
import { requireDatabaseUrl } from './load-env-file.mjs'

const MIGRATION_NAME = '20260517_153526_20250517_initial'

requireDatabaseUrl()

const { default: pkg } = await import('pg')
const { Pool } = pkg

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 1,
  connectionTimeoutMillis: 15000,
})

try {
  const existing = await pool.query(
    'SELECT name FROM payload_migrations WHERE name = $1 LIMIT 1',
    [MIGRATION_NAME],
  )
  if (existing.rows.length > 0) {
    console.log(`Migration "${MIGRATION_NAME}" is already recorded.`)
  } else {
    const maxBatch = await pool.query(
      'SELECT COALESCE(MAX(batch), 0) AS max_batch FROM payload_migrations WHERE batch >= 0',
    )
    const batch = Number(maxBatch.rows[0]?.max_batch ?? 0) + 1

    await pool.query(
      'INSERT INTO payload_migrations (name, batch, created_at, updated_at) VALUES ($1, $2, NOW(), NOW())',
      [MIGRATION_NAME, batch],
    )

    console.log(`Recorded migration "${MIGRATION_NAME}" (batch ${batch}).`)
  }
} finally {
  await pool.end()
}
