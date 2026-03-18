import type { MealEntry, DailySummary } from '#shared/types'
import type { CreateMealPayload, UpdateMealPayload } from '#shared/schemas'
import { mealRepository } from '../repositories/mealRepository'
import { calculateTotalMacros, calculateRemainingCalories } from '#shared/utils/nutrition'

export const mealService = {
  async getMealsByDate(userId: string, date: string): Promise<MealEntry[]> {
    return mealRepository.findByUserAndDate(userId, date)
  },

  async getDailySummary(
    userId: string,
    date: string,
    targetCalories: number,
  ): Promise<DailySummary> {
    const meals = await mealRepository.findByUserAndDate(userId, date)
    const macros = calculateTotalMacros(meals)

    return {
      date,
      targetCalories,
      consumedCalories: macros.calories,
      remainingCalories: calculateRemainingCalories(targetCalories, macros.calories),
      macros,
    }
  },

  async createMeal(userId: string, data: CreateMealPayload): Promise<MealEntry> {
    return mealRepository.create(userId, data)
  },

  async updateMeal(id: string, data: UpdateMealPayload): Promise<MealEntry | null> {
    return mealRepository.update(id, data)
  },

  async deleteMeal(id: string): Promise<boolean> {
    return mealRepository.delete(id)
  },
}
