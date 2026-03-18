import { describe, it, expect } from 'vitest'
import { createWeightSchema } from '#shared/schemas/weight'

describe('createWeightSchema', () => {
  it('accepts a valid weight entry', () => {
    const result = createWeightSchema.safeParse({
      weightKg: 75.5,
      entryDate: '2026-03-18',
    })
    expect(result.success).toBe(true)
  })

  it('accepts with a note', () => {
    const result = createWeightSchema.safeParse({
      weightKg: 75.5,
      entryDate: '2026-03-18',
      note: 'After morning run',
    })
    expect(result.success).toBe(true)
  })

  it('accepts null note', () => {
    const result = createWeightSchema.safeParse({
      weightKg: 75.5,
      entryDate: '2026-03-18',
      note: null,
    })
    expect(result.success).toBe(true)
  })

  it('accepts omitted note', () => {
    const result = createWeightSchema.safeParse({
      weightKg: 75.5,
      entryDate: '2026-03-18',
    })
    expect(result.success).toBe(true)
  })

  it('rejects weight below 20 kg', () => {
    const result = createWeightSchema.safeParse({
      weightKg: 19.9,
      entryDate: '2026-03-18',
    })
    expect(result.success).toBe(false)
  })

  it('rejects weight above 500 kg', () => {
    const result = createWeightSchema.safeParse({
      weightKg: 500.1,
      entryDate: '2026-03-18',
    })
    expect(result.success).toBe(false)
  })

  it('rejects invalid date format', () => {
    const result = createWeightSchema.safeParse({
      weightKg: 75,
      entryDate: '03/18/2026',
    })
    expect(result.success).toBe(false)
  })

  it('rejects note longer than 255 characters', () => {
    const result = createWeightSchema.safeParse({
      weightKg: 75,
      entryDate: '2026-03-18',
      note: 'a'.repeat(256),
    })
    expect(result.success).toBe(false)
  })

  it('accepts boundary values', () => {
    expect(createWeightSchema.safeParse({ weightKg: 20, entryDate: '2026-01-01' }).success).toBe(
      true,
    )
    expect(createWeightSchema.safeParse({ weightKg: 500, entryDate: '2026-12-31' }).success).toBe(
      true,
    )
  })
})
