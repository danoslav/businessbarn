/**
 * Apply the initial migration SQL directly via pg, bypassing Payload's runner.
 * Records the migration in payload_migrations on success.
 */
import path from 'node:path'
import fs from 'node:fs/promises'
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

const migrationPath = path.resolve(process.cwd(), `src/migrations/${MIGRATION_NAME}.ts`)
const fileText = await fs.readFile(migrationPath, 'utf8')

function extractSqlBlock(label) {
  const fnRe = new RegExp(`export async function ${label}\\([^)]*\\)[^{]*\\{([\\s\\S]*?)\\n\\}`)
  const fnMatch = fileText.match(fnRe)
  if (!fnMatch) throw new Error(`Could not find ${label}() in migration file`)
  const body = fnMatch[1]
  const blocks = []
  const re = /sql`([\s\S]*?)`/g
  let m
  while ((m = re.exec(body)) !== null) blocks.push(m[1])
  return blocks
}

const blocks = extractSqlBlock('up')
console.log(`Applying ${MIGRATION_NAME} (${blocks.length} SQL blocks)...`)
try {
  for (const sql of blocks) {
    await pool.query(sql)
  }

  await pool.query(`
    CREATE TABLE IF NOT EXISTS payload_migrations (
      id serial PRIMARY KEY,
      name varchar,
      batch numeric,
      updated_at timestamptz DEFAULT NOW(),
      created_at timestamptz DEFAULT NOW()
    )
  `)

  const existing = await pool.query(
    'SELECT id FROM payload_migrations WHERE name = $1 LIMIT 1',
    [MIGRATION_NAME],
  )
  if (existing.rows.length === 0) {
    const maxBatch = await pool.query(
      'SELECT COALESCE(MAX(batch), 0) AS max_batch FROM payload_migrations WHERE batch >= 0',
    )
    const batch = Number(maxBatch.rows[0]?.max_batch ?? 0) + 1
    await pool.query(
      'INSERT INTO payload_migrations (name, batch, created_at, updated_at) VALUES ($1, $2, NOW(), NOW())',
      [MIGRATION_NAME, batch],
    )
    console.log(`Recorded migration in payload_migrations (batch ${batch}).`)
  } else {
    console.log('Migration already recorded.')
  }

  console.log('Done.')
} catch (e) {
  console.error('Migration failed:', e.message)
  process.exit(1)
} finally {
  await pool.end()
}
