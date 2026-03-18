import type { WeightEntry } from '../../shared/types'
import { useDatabase } from '../db'

interface WeightRow {
  id: string
  user_id: string
  weight_kg: string
  entry_date: string
  note: string | null
  created_at: string
}

function toWeightEntry(row: WeightRow): WeightEntry {
  return {
    id: row.id,
    userId: row.user_id,
    weightKg: Number(row.weight_kg),
    entryDate: row.entry_date,
    note: row.note,
    createdAt: row.created_at,
  }
}

export const weightRepository = {
  async findByUser(userId: string, limit = 30): Promise<WeightEntry[]> {
    const sql = useDatabase()
    const rows = await sql<WeightRow[]>`
      SELECT * FROM weight_entries
      WHERE user_id = ${userId}
      ORDER BY entry_date DESC
      LIMIT ${limit}
    `
    return rows.map(toWeightEntry)
  },

  async findByUserAndDate(userId: string, date: string): Promise<WeightEntry | null> {
    const sql = useDatabase()
    const rows = await sql<WeightRow[]>`
      SELECT * FROM weight_entries
      WHERE user_id = ${userId} AND entry_date = ${date}
    `
    return rows.length > 0 ? toWeightEntry(rows[0]) : null
  },

  async create(
    userId: string,
    data: { weightKg: number; entryDate: string; note?: string | null },
  ): Promise<WeightEntry> {
    const sql = useDatabase()
    const rows = await sql<WeightRow[]>`
      INSERT INTO weight_entries (user_id, weight_kg, entry_date, note)
      VALUES (${userId}, ${data.weightKg}, ${data.entryDate}, ${data.note ?? null})
      ON CONFLICT (user_id, entry_date)
      DO UPDATE SET weight_kg = ${data.weightKg}, note = ${data.note ?? null}
      RETURNING *
    `
    return toWeightEntry(rows[0])
  },

  async delete(id: string): Promise<boolean> {
    const sql = useDatabase()
    const result = await sql`
      DELETE FROM weight_entries WHERE id = ${id}
    `
    return result.count > 0
  },
}
