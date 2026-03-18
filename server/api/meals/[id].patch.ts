import { updateMealSchema } from '../../../shared/schemas'
import { mealService } from '../../services/mealService'

export default defineEventHandler(async (event) => {
  await requireUserId(event)
  const id = getRouterParam(event, 'id')
  if (!id) throw createError({ statusCode: 400, statusMessage: 'Missing meal ID' })

  const body = await readValidatedBody(event, updateMealSchema.parse)
  const meal = await mealService.updateMeal(id, body)

  if (!meal) throw createError({ statusCode: 404, statusMessage: 'Meal not found' })

  return { success: true, data: meal }
})
