import { registerSchema } from '#shared/schemas'
import { authService } from '../../services/authService'

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, registerSchema.parse)
  const result = await authService.register(body.email, body.password)

  setResponseStatus(event, 201)
  return { success: true, data: result }
})
