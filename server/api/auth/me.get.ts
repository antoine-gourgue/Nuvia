import { userRepository } from '../../repositories/userRepository'

export default defineEventHandler(async (event) => {
  const { userId } = await requireAuth(event)
  const user = await userRepository.findById(userId)

  if (!user) {
    throw createError({ statusCode: 404, statusMessage: 'User not found' })
  }

  const profile = await userRepository.findProfileByUserId(userId)

  return { success: true, data: { user, profile } }
})
