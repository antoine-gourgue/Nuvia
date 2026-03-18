import { z } from 'zod'

export const createMealSchema = z.object({
  name: z.string().min(1, 'Name is required').max(120),
  mealType: z.enum(['breakfast', 'lunch', 'dinner', 'snack']),
  calories: z.number().min(0),
  protein: z.number().min(0),
  carbs: z.number().min(0),
  fat: z.number().min(0),
  servingGrams: z.number().min(1),
  entryDate: z.string().date(),
})

export type CreateMealPayload = z.infer<typeof createMealSchema>

export const updateMealSchema = createMealSchema.partial()

export type UpdateMealPayload = z.infer<typeof updateMealSchema>
