import { mealService } from '../../services/mealService'
import { userService } from '../../services/userService'
import { DEFAULT_CALORIE_TARGET } from '../../../shared/constants'

export default defineEventHandler(async (event) => {
  const userId = await requireUserId(event)
  const query = getQuery(event)
  const date = typeof query.date === 'string' ? query.date : new Date().toISOString().slice(0, 10)

  const profile = await userService.getProfile(userId)
  const targetCalories = profile?.dailyCalorieTarget ?? DEFAULT_CALORIE_TARGET

  const summary = await mealService.getDailySummary(userId, date, targetCalories)

  return { success: true, data: summary }
})
