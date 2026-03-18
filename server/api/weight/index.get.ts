import { weightService } from '../../services/weightService'

export default defineEventHandler(async (event) => {
  const userId = requireUserId(event)
  const query = getQuery(event)
  const limit = typeof query.limit === 'string' ? parseInt(query.limit, 10) : 30

  const entries = await weightService.getWeightHistory(userId, limit)

  return { success: true, data: entries }
})
