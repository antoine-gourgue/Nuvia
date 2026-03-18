import { weightService } from '../../services/weightService'

export default defineEventHandler(async (event) => {
  requireUserId(event)
  const id = getRouterParam(event, 'id')
  if (!id) throw createError({ statusCode: 400, statusMessage: 'Missing weight entry ID' })

  const deleted = await weightService.deleteWeight(id)
  if (!deleted) throw createError({ statusCode: 404, statusMessage: 'Weight entry not found' })

  return { success: true, data: null }
})
