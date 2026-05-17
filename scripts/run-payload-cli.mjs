/**
 * Run a Payload CLI .mjs script with tsx (patch-package fixes loadEnv for @next/env).
 * Usage: node scripts/run-payload-cli.mjs scripts/seed.mjs
 */
import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const targetArg = process.argv[2]

if (!targetArg) {
  console.error('Usage: node scripts/run-payload-cli.mjs <script-path>')
  process.exit(1)
}

const target = path.isAbsolute(targetArg) ? targetArg : path.join(root, targetArg)
if (!fs.existsSync(target)) {
  console.error(`Script not found: ${target}`)
  process.exit(1)
}

const tsxCli = path.join(root, 'node_modules/tsx/dist/cli.mjs')
if (!fs.existsSync(tsxCli)) {
  console.error('tsx not found. Run npm install.')
  process.exit(1)
}

const result = spawnSync(process.execPath, [tsxCli, target], {
  stdio: 'inherit',
  env: process.env,
  cwd: root,
})

process.exit(result.status === null ? 1 : result.status)
