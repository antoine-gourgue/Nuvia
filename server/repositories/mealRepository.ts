import type { MealEntry } from '#shared/types'
import { useDatabase } from '../db'

interface MealRow {
  id: string
  user_id: string
  name: string
  meal_type: string
  calories: number
  protein: string
  carbs: string
  fat: string
  serving_grams: string
  entry_date: string
  created_at: string
  updated_at: string
}

function toMealEntry(row: MealRow): MealEntry {
  return {
    id: row.id,
    userId: row.user_id,
    name: row.name,
    mealType: row.meal_type as MealEntry['mealType'],
    calories: row.calories,
    protein: Number(row.protein),
    carbs: Number(row.carbs),
    fat: Number(row.fat),
    servingGrams: Number(row.serving_grams),
    entryDate: row.entry_date,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export const mealRepository = {
  async findByUserAndDate(userId: string, date: string): Promise<MealEntry[]> {
    const sql = useDatabase()
    const rows = await sql<MealRow[]>`
      SELECT * FROM meal_entries
      WHERE user_id = ${userId} AND entry_date = ${date}
      ORDER BY created_at ASC
    `
    return rows.map(toMealEntry)
  },

  async findById(id: string): Promise<MealEntry | null> {
    const sql = useDatabase()
    const rows = await sql<MealRow[]>`
      SELECT * FROM meal_entries WHERE id = ${id}
    `
    const row = rows[0]
    return row ? toMealEntry(row) : null
  },

  async create(
    userId: string,
    data: {
      name: string
      mealType: string
      calories: number
      protein: number
      carbs: number
      fat: number
      servingGrams: number
      entryDate: string
    },
  ): Promise<MealEntry> {
    const sql = useDatabase()
    const rows = await sql<MealRow[]>`
      INSERT INTO meal_entries (user_id, name, meal_type, calories, protein, carbs, fat, serving_grams, entry_date)
      VALUES (${userId}, ${data.name}, ${data.mealType}, ${data.calories}, ${data.protein}, ${data.carbs}, ${data.fat}, ${data.servingGrams}, ${data.entryDate})
      RETURNING *
    `
    const row = rows[0]
    if (!row) throw new Error('Failed to create meal entry')
    return toMealEntry(row)
  },

  async update(
    id: string,
    data: Partial<{
      name: string
      mealType: string
      calories: number
      protein: number
      carbs: number
      fat: number
      servingGrams: number
      entryDate: string
    }>,
  ): Promise<MealEntry | null> {
    const sql = useDatabase()
    const rows = await sql<MealRow[]>`
      UPDATE meal_entries SET
        name = COALESCE(${data.name ?? null}, name),
        meal_type = COALESCE(${data.mealType ?? null}, meal_type),
        calories = COALESCE(${data.calories ?? null}, calories),
        protein = COALESCE(${data.protein ?? null}, protein),
        carbs = COALESCE(${data.carbs ?? null}, carbs),
        fat = COALESCE(${data.fat ?? null}, fat),
        serving_grams = COALESCE(${data.servingGrams ?? null}, serving_grams),
        entry_date = COALESCE(${data.entryDate ?? null}, entry_date),
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `
    const row = rows[0]
    return row ? toMealEntry(row) : null
  },

  async delete(id: string): Promise<boolean> {
    const sql = useDatabase()
    const result = await sql`
      DELETE FROM meal_entries WHERE id = ${id}
    `
    return result.count > 0
  },
}
