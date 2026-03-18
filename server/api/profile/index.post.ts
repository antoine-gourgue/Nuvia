import { createUserProfileSchema } from '../../../shared/schemas'
import { userService } from '../../services/userService'

export default defineEventHandler(async (event) => {
  const userId = requireUserId(event)
  const body = await readValidatedBody(event, createUserProfileSchema.parse)

  const profile = await userService.createProfile(userId, body)

  setResponseStatus(event, 201)
  return { success: true, data: profile }
})
