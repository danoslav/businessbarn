#!/usr/bin/env bash
set -euo pipefail

if [ -n "${DATABASE_URL:-}" ]; then
  echo "Running Payload database migrations..."
  npx tsx scripts/db-migrate.mjs
else
  echo "DATABASE_URL not set — skipping migrations (set it in Vercel for production)."
fi

echo "Building Next.js..."
npm run build:next
