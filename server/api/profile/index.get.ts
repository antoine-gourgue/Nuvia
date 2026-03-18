import { userService } from '../../services/userService'

export default defineEventHandler(async (event) => {
  const userId = requireUserId(event)
  const profile = await userService.getProfile(userId)

  if (!profile) throw createError({ statusCode: 404, statusMessage: 'Profile not found' })

  return { success: true, data: profile }
})
