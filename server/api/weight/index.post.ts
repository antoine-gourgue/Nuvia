import { createWeightSchema } from '#shared/schemas'
import { weightService } from '../../services/weightService'

export default defineEventHandler(async (event) => {
  const userId = await requireUserId(event)
  const body = await readValidatedBody(event, createWeightSchema.parse)

  const entry = await weightService.logWeight(userId, body)

  setResponseStatus(event, 201)
  return { success: true, data: entry }
})
