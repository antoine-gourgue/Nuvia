export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack'

export interface Macros {
  calories: number
  protein: number
  carbs: number
  fat: number
}

export interface FoodItem {
  id: string
  name: string
  caloriesPer100g: number
  proteinPer100g: number
  carbsPer100g: number
  fatPer100g: number
}

export interface MealEntry {
  id: string
  userId: string
  name: string
  mealType: MealType
  calories: number
  protein: number
  carbs: number
  fat: number
  servingGrams: number
  entryDate: string
  createdAt: string
  updatedAt: string
}

export interface DailySummary {
  date: string
  targetCalories: number
  consumedCalories: number
  remainingCalories: number
  macros: Macros
}
