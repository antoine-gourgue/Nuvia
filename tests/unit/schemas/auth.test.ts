import { describe, it, expect } from 'vitest'
import { registerSchema, loginSchema } from '#shared/schemas/auth'

describe('registerSchema', () => {
  it('accepts valid email and password', () => {
    const result = registerSchema.safeParse({ email: 'user@example.com', password: 'password123' })
    expect(result.success).toBe(true)
  })

  it('rejects invalid email', () => {
    const result = registerSchema.safeParse({ email: 'not-an-email', password: 'password123' })
    expect(result.success).toBe(false)
  })

  it('rejects empty email', () => {
    const result = registerSchema.safeParse({ email: '', password: 'password123' })
    expect(result.success).toBe(false)
  })

  it('rejects password shorter than 8 characters', () => {
    const result = registerSchema.safeParse({ email: 'user@example.com', password: '1234567' })
    expect(result.success).toBe(false)
  })

  it('accepts password exactly 8 characters', () => {
    const result = registerSchema.safeParse({ email: 'user@example.com', password: '12345678' })
    expect(result.success).toBe(true)
  })

  it('rejects missing fields', () => {
    expect(registerSchema.safeParse({}).success).toBe(false)
    expect(registerSchema.safeParse({ email: 'user@example.com' }).success).toBe(false)
    expect(registerSchema.safeParse({ password: 'password123' }).success).toBe(false)
  })
})

describe('loginSchema', () => {
  it('accepts valid email and password', () => {
    const result = loginSchema.safeParse({ email: 'user@example.com', password: 'x' })
    expect(result.success).toBe(true)
  })

  it('rejects invalid email', () => {
    const result = loginSchema.safeParse({ email: 'bad', password: 'x' })
    expect(result.success).toBe(false)
  })

  it('rejects empty password', () => {
    const result = loginSchema.safeParse({ email: 'user@example.com', password: '' })
    expect(result.success).toBe(false)
  })

  it('accepts short password (no min length on login)', () => {
    const result = loginSchema.safeParse({ email: 'user@example.com', password: 'a' })
    expect(result.success).toBe(true)
  })
})
