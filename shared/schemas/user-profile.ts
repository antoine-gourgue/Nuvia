import { z } from 'zod'

export const createUserProfileSchema = z.object({
  biologicalSex: z.enum(['male', 'female']),
  age: z.number().int().min(1).max(150),
  heightCm: z.number().min(50).max(300),
  weightKg: z.number().min(20).max(500),
  targetWeightKg: z.number().min(20).max(500).nullable().optional(),
  goalType: z.enum(['lose', 'maintain', 'gain']),
  activityLevel: z.enum(['sedentary', 'light', 'moderate', 'active', 'very_active']),
})

export type CreateUserProfilePayload = z.infer<typeof createUserProfileSchema>

export const updateUserProfileSchema = createUserProfileSchema.partial()

export type UpdateUserProfilePayload = z.infer<typeof updateUserProfileSchema>
