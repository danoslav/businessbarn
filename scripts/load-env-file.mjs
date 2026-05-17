/**
 * Load .env.local / .env into process.env (safe for URLs with & — do not `source` in bash).
 * Values from the file override existing env (fixes empty DATABASE_URL from broken `source`).
 */
import fs from 'node:fs'
import path from 'node:path'

export function loadEnvFiles(cwd = process.cwd()) {
  for (const file of ['.env.local', '.env']) {
    const envPath = path.resolve(cwd, file)
    if (!fs.existsSync(envPath)) continue
    for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eq = trimmed.indexOf('=')
      if (eq <= 0) continue
      const key = trimmed.slice(0, eq).trim()
      let value = trimmed.slice(eq + 1).trim()
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1)
      }
      process.env[key] = value
    }
    break
  }

  // Vercel + Neon often expose POSTGRES_URL but not DATABASE_URL
  if (!process.env.DATABASE_URL && process.env.POSTGRES_URL) {
    process.env.DATABASE_URL = process.env.POSTGRES_URL
  }
  if (!process.env.DATABASE_URL && process.env.POSTGRES_PRISMA_URL) {
    process.env.DATABASE_URL = process.env.POSTGRES_PRISMA_URL
  }
}

export function requireDatabaseUrl() {
  loadEnvFiles()
  if (!process.env.DATABASE_URL) {
    console.error(
      'DATABASE_URL is required. Add it to .env.local (or POSTGRES_URL from Vercel).',
    )
    process.exit(1)
  }
}
