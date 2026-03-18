import { describe, it, expect } from 'vitest'
import { createMealSchema, updateMealSchema } from '#shared/schemas/meal'

const validMeal = {
  name: 'Chicken breast',
  mealType: 'lunch' as const,
  calories: 250,
  protein: 40,
  carbs: 0,
  fat: 8,
  servingGrams: 200,
  entryDate: '2026-03-18',
}

describe('createMealSchema', () => {
  it('accepts a valid meal', () => {
    const result = createMealSchema.safeParse(validMeal)
    expect(result.success).toBe(true)
  })

  it('rejects empty name', () => {
    const result = createMealSchema.safeParse({ ...validMeal, name: '' })
    expect(result.success).toBe(false)
  })

  it('rejects name longer than 120 characters', () => {
    const result = createMealSchema.safeParse({ ...validMeal, name: 'a'.repeat(121) })
    expect(result.success).toBe(false)
  })

  it('rejects invalid meal type', () => {
    const result = createMealSchema.safeParse({ ...validMeal, mealType: 'brunch' })
    expect(result.success).toBe(false)
  })

  it('accepts all valid meal types', () => {
    for (const mealType of ['breakfast', 'lunch', 'dinner', 'snack']) {
      const result = createMealSchema.safeParse({ ...validMeal, mealType })
      expect(result.success).toBe(true)
    }
  })

  it('rejects negative calories', () => {
    const result = createMealSchema.safeParse({ ...validMeal, calories: -1 })
    expect(result.success).toBe(false)
  })

  it('rejects negative macros', () => {
    expect(createMealSchema.safeParse({ ...validMeal, protein: -1 }).success).toBe(false)
    expect(createMealSchema.safeParse({ ...validMeal, carbs: -1 }).success).toBe(false)
    expect(createMealSchema.safeParse({ ...validMeal, fat: -1 }).success).toBe(false)
  })

  it('rejects zero serving grams', () => {
    const result = createMealSchema.safeParse({ ...validMeal, servingGrams: 0 })
    expect(result.success).toBe(false)
  })

  it('rejects invalid date format', () => {
    const result = createMealSchema.safeParse({ ...validMeal, entryDate: '18-03-2026' })
    expect(result.success).toBe(false)
  })

  it('accepts zero calories and macros', () => {
    const result = createMealSchema.safeParse({
      ...validMeal,
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
    })
    expect(result.success).toBe(true)
  })
})

describe('updateMealSchema', () => {
  it('accepts partial update with only name', () => {
    const result = updateMealSchema.safeParse({ name: 'Updated name' })
    expect(result.success).toBe(true)
  })

  it('accepts empty object', () => {
    const result = updateMealSchema.safeParse({})
    expect(result.success).toBe(true)
  })

  it('still validates constraints on provided fields', () => {
    const result = updateMealSchema.safeParse({ calories: -5 })
    expect(result.success).toBe(false)
  })
})
