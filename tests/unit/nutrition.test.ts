import { describe, expect, it } from 'vitest'
import {
  calculateBMR,
  calculateCaloriesFromMacros,
  calculateRemainingCalories,
  calculateTDEE,
  calculateTotalMacros,
} from '#shared/utils/nutrition'

describe('calculateRemainingCalories', () => {
  it('returns the remaining calories when target is higher than consumed', () => {
    expect(calculateRemainingCalories(2200, 1800)).toBe(400)
  })

  it('never returns a negative number', () => {
    expect(calculateRemainingCalories(1800, 2200)).toBe(0)
  })

  it('returns zero when target equals consumed', () => {
    expect(calculateRemainingCalories(2000, 2000)).toBe(0)
  })
})

describe('calculateTotalMacros', () => {
  it('sums macros from multiple entries', () => {
    const entries = [
      { calories: 300, protein: 20, carbs: 30, fat: 10 },
      { calories: 500, protein: 35, carbs: 50, fat: 15 },
    ]

    expect(calculateTotalMacros(entries)).toEqual({
      calories: 800,
      protein: 55,
      carbs: 80,
      fat: 25,
    })
  })

  it('returns zeroes for empty array', () => {
    expect(calculateTotalMacros([])).toEqual({
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
    })
  })
})

describe('calculateCaloriesFromMacros', () => {
  it('calculates calories from macronutrient grams', () => {
    // 30g protein (120) + 50g carbs (200) + 10g fat (90) = 410
    expect(calculateCaloriesFromMacros(30, 50, 10)).toBe(410)
  })
})

describe('calculateBMR', () => {
  it('calculates BMR for male using Mifflin-St Jeor', () => {
    // 10 * 80 + 6.25 * 180 - 5 * 30 + 5 = 800 + 1125 - 150 + 5 = 1780
    expect(calculateBMR(80, 180, 30, 'male')).toBe(1780)
  })

  it('calculates BMR for female using Mifflin-St Jeor', () => {
    // 10 * 65 + 6.25 * 165 - 5 * 28 - 161 = 650 + 1031.25 - 140 - 161 = 1380
    expect(calculateBMR(65, 165, 28, 'female')).toBe(1380)
  })
})

describe('calculateTDEE', () => {
  it('applies sedentary multiplier', () => {
    expect(calculateTDEE(1780, 'sedentary')).toBe(2136)
  })

  it('applies active multiplier', () => {
    expect(calculateTDEE(1780, 'active')).toBe(3071)
  })

  it('defaults to sedentary for unknown activity level', () => {
    expect(calculateTDEE(1780, 'unknown')).toBe(2136)
  })
})
