#!/usr/bin/env bash
set -euo pipefail

# Payload prodMigrations run automatically when Payload connects in production
# (see @payloadcms/db-postgres connect.js). Pages that call getPayload during
# `next build` trigger that path — no separate tsx migrate step needed here.
# A standalone migrate script hits Payload loadEnv + @next/env issues on Node 24.

echo "Building Next.js..."
npm run build:next
