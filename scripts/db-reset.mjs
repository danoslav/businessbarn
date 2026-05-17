/**
 * DROP ALL TABLES in public schema. Use with extreme care.
 * Requires DB_RESET_ALLOW=true and DATABASE_URL.
 */
import { requireDatabaseUrl } from './load-env-file.mjs'

requireDatabaseUrl()

if (process.env.DB_RESET_ALLOW !== 'true') {
  console.error('Refusing to drop schema. Set DB_RESET_ALLOW=true to proceed.')
  process.exit(1)
}

const { default: pkg } = await import('pg')
const { Pool } = pkg

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 1,
  connectionTimeoutMillis: 15000,
})

try {
  const tables = await pool.query(`
    SELECT tablename FROM pg_tables WHERE schemaname = 'public'
  `)
  console.log(`Dropping ${tables.rows.length} tables...`)

  await pool.query(`
    DO $$ DECLARE
      r RECORD;
    BEGIN
      FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
        EXECUTE 'DROP TABLE IF EXISTS public.' || quote_ident(r.tablename) || ' CASCADE';
      END LOOP;
    END $$;
  `)

  const types = await pool.query(`
    SELECT t.typname
    FROM pg_type t
    JOIN pg_namespace n ON n.oid = t.typnamespace
    WHERE t.typtype = 'e' AND n.nspname = 'public'
  `)
  console.log(`Dropping ${types.rows.length} enum types...`)
  for (const r of types.rows) {
    await pool.query(`DROP TYPE IF EXISTS public."${r.typname}" CASCADE`)
  }

  console.log('Schema dropped.')
} finally {
  await pool.end()
}
