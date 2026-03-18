import { z } from 'zod'

export const createWeightSchema = z.object({
  weightKg: z.number().min(20).max(500),
  entryDate: z.string().date(),
  note: z.string().max(255).nullable().optional(),
})

export type CreateWeightPayload = z.infer<typeof createWeightSchema>
