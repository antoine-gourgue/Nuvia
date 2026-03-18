import { loginSchema } from '../../../shared/schemas'
import { authService } from '../../services/authService'

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, loginSchema.parse)
  const result = await authService.login(body.email, body.password)

  return { success: true, data: result }
})
