import { describe, it, expect } from 'vitest'
import { createUserProfileSchema, updateUserProfileSchema } from '#shared/schemas/user-profile'

const validProfile = {
  biologicalSex: 'male' as const,
  age: 30,
  heightCm: 180,
  weightKg: 80,
  targetWeightKg: 75,
  goalType: 'lose' as const,
  activityLevel: 'moderate' as const,
}

describe('createUserProfileSchema', () => {
  it('accepts a valid profile', () => {
    const result = createUserProfileSchema.safeParse(validProfile)
    expect(result.success).toBe(true)
  })

  it('accepts null targetWeightKg', () => {
    const result = createUserProfileSchema.safeParse({ ...validProfile, targetWeightKg: null })
    expect(result.success).toBe(true)
  })

  it('accepts omitted targetWeightKg', () => {
    const { targetWeightKg: _, ...withoutTarget } = validProfile
    const result = createUserProfileSchema.safeParse(withoutTarget)
    expect(result.success).toBe(true)
  })

  it('rejects invalid biological sex', () => {
    const result = createUserProfileSchema.safeParse({ ...validProfile, biologicalSex: 'other' })
    expect(result.success).toBe(false)
  })

  it('rejects non-integer age', () => {
    const result = createUserProfileSchema.safeParse({ ...validProfile, age: 30.5 })
    expect(result.success).toBe(false)
  })

  it('rejects age below 1', () => {
    const result = createUserProfileSchema.safeParse({ ...validProfile, age: 0 })
    expect(result.success).toBe(false)
  })

  it('rejects age above 150', () => {
    const result = createUserProfileSchema.safeParse({ ...validProfile, age: 151 })
    expect(result.success).toBe(false)
  })

  it('rejects height below 50 cm', () => {
    const result = createUserProfileSchema.safeParse({ ...validProfile, heightCm: 49 })
    expect(result.success).toBe(false)
  })

  it('rejects height above 300 cm', () => {
    const result = createUserProfileSchema.safeParse({ ...validProfile, heightCm: 301 })
    expect(result.success).toBe(false)
  })

  it('rejects weight below 20 kg', () => {
    const result = createUserProfileSchema.safeParse({ ...validProfile, weightKg: 19 })
    expect(result.success).toBe(false)
  })

  it('rejects weight above 500 kg', () => {
    const result = createUserProfileSchema.safeParse({ ...validProfile, weightKg: 501 })
    expect(result.success).toBe(false)
  })

  it('rejects invalid goal type', () => {
    const result = createUserProfileSchema.safeParse({ ...validProfile, goalType: 'bulk' })
    expect(result.success).toBe(false)
  })

  it('accepts all valid goal types', () => {
    for (const goalType of ['lose', 'maintain', 'gain']) {
      expect(createUserProfileSchema.safeParse({ ...validProfile, goalType }).success).toBe(true)
    }
  })

  it('accepts all valid activity levels', () => {
    for (const activityLevel of ['sedentary', 'light', 'moderate', 'active', 'very_active']) {
      expect(createUserProfileSchema.safeParse({ ...validProfile, activityLevel }).success).toBe(
        true,
      )
    }
  })

  it('rejects invalid activity level', () => {
    const result = createUserProfileSchema.safeParse({ ...validProfile, activityLevel: 'extreme' })
    expect(result.success).toBe(false)
  })
})

describe('updateUserProfileSchema', () => {
  it('accepts partial update', () => {
    const result = updateUserProfileSchema.safeParse({ weightKg: 78 })
    expect(result.success).toBe(true)
  })

  it('accepts empty object', () => {
    const result = updateUserProfileSchema.safeParse({})
    expect(result.success).toBe(true)
  })

  it('still validates constraints on provided fields', () => {
    const result = updateUserProfileSchema.safeParse({ age: -1 })
    expect(result.success).toBe(false)
  })
})
