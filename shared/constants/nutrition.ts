export const MEAL_TYPES = ['breakfast', 'lunch', 'dinner', 'snack'] as const

export const MACRO_LABELS = {
  calories: 'Calories',
  protein: 'Protein',
  carbs: 'Carbs',
  fat: 'Fat',
} as const

export const DEFAULT_CALORIE_TARGET = 2000

export const CALORIES_PER_GRAM = {
  protein: 4,
  carbs: 4,
  fat: 9,
} as const
