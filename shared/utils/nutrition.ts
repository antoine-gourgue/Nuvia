import type { Macros } from '../types/nutrition'
import { CALORIES_PER_GRAM } from '../constants/nutrition'

export function calculateRemainingCalories(target: number, consumed: number): number {
  return Math.max(target - consumed, 0)
}

export function calculateTotalMacros(entries: ReadonlyArray<Macros>): Macros {
  return entries.reduce<Macros>(
    (total, entry) => ({
      calories: total.calories + entry.calories,
      protein: total.protein + entry.protein,
      carbs: total.carbs + entry.carbs,
      fat: total.fat + entry.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 },
  )
}

export function calculateCaloriesFromMacros(protein: number, carbs: number, fat: number): number {
  return Math.round(
    protein * CALORIES_PER_GRAM.protein
    + carbs * CALORIES_PER_GRAM.carbs
    + fat * CALORIES_PER_GRAM.fat,
  )
}

/**
 * Mifflin-St Jeor equation for Basal Metabolic Rate.
 */
export function calculateBMR(
  weightKg: number,
  heightCm: number,
  age: number,
  biologicalSex: 'male' | 'female',
): number {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age
  return Math.round(biologicalSex === 'male' ? base + 5 : base - 161)
}

const ACTIVITY_MULTIPLIERS: Record<string, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
}

export function calculateTDEE(bmr: number, activityLevel: string): number {
  const multiplier = ACTIVITY_MULTIPLIERS[activityLevel] ?? 1.2
  return Math.round(bmr * multiplier)
}
