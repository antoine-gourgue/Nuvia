import { mealService } from '../../services/mealService'

export default defineEventHandler(async (event) => {
  await requireUserId(event)
  const id = getRouterParam(event, 'id')
  if (!id) throw createError({ statusCode: 400, statusMessage: 'Missing meal ID' })

  const deleted = await mealService.deleteMeal(id)
  if (!deleted) throw createError({ statusCode: 404, statusMessage: 'Meal not found' })

  return { success: true, data: null }
})
