import type { H3Event } from 'h3'
import { verifyToken } from './jwt'
import type { AuthTokenPayload } from '../../shared/types'

export async function requireAuth(event: H3Event): Promise<AuthTokenPayload> {
  const authHeader = getHeader(event, 'authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    throw createError({ statusCode: 401, statusMessage: 'Missing or invalid authorization header' })
  }

  const token = authHeader.slice(7)

  try {
    return await verifyToken(token)
  } catch {
    throw createError({ statusCode: 401, statusMessage: 'Invalid or expired token' })
  }
}

export function requireUserId(event: H3Event): Promise<string> {
  return requireAuth(event).then((auth) => auth.userId)
}
