import { mealService } from '../../services/mealService'

export default defineEventHandler(async (event) => {
  const userId = requireUserId(event)
  const query = getQuery(event)
  const date = typeof query.date === 'string' ? query.date : new Date().toISOString().slice(0, 10)

  const meals = await mealService.getMealsByDate(userId, date)

  return { success: true, data: meals }
})
