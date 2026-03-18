import { readdir, readFile } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import postgres from 'postgres'

const __dirname = dirname(fileURLToPath(import.meta.url))

const databaseUrl = process.env.DATABASE_URL
if (!databaseUrl) {
  console.error('DATABASE_URL environment variable is required')
  process.exit(1)
}

const sql = postgres(databaseUrl)

async function migrate() {
  // Create migrations tracking table
  await sql`
    CREATE TABLE IF NOT EXISTS _migrations (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL,
      applied_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `

  const migrationsDir = join(__dirname, 'migrations')
  const files = (await readdir(migrationsDir)).filter((f) => f.endsWith('.sql')).sort()

  const applied = await sql`SELECT name FROM _migrations ORDER BY name`
  const appliedNames = new Set(applied.map((r) => r.name))

  for (const file of files) {
    if (appliedNames.has(file)) {
      console.log(`  ✓ ${file} (already applied)`)
      continue
    }

    const content = await readFile(join(migrationsDir, file), 'utf-8')

    await sql.begin(async (tx) => {
      await tx.unsafe(content)
      await tx`INSERT INTO _migrations (name) VALUES (${file})`
    })

    console.log(`  ✔ ${file} applied`)
  }

  await sql.end()
  console.log('\nMigrations complete.')
}

migrate().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
