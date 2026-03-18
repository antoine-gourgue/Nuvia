import { createMealSchema } from '../../../shared/schemas'
import { mealService } from '../../services/mealService'

export default defineEventHandler(async (event) => {
  const userId = requireUserId(event)
  const body = await readValidatedBody(event, createMealSchema.parse)

  const meal = await mealService.createMeal(userId, body)

  setResponseStatus(event, 201)
  return { success: true, data: meal }
})
