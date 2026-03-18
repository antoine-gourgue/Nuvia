import { updateUserProfileSchema } from '#shared/schemas'
import { userService } from '../../services/userService'

export default defineEventHandler(async (event) => {
  const userId = await requireUserId(event)
  const body = await readValidatedBody(event, updateUserProfileSchema.parse)

  const profile = await userService.updateProfile(userId, body)

  if (!profile) throw createError({ statusCode: 404, statusMessage: 'Profile not found' })

  return { success: true, data: profile }
})
