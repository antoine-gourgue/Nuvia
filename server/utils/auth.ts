import type { H3Event } from 'h3'

/**
 * Extracts the authenticated user ID from the request.
 * TODO: Replace with real auth (JWT/session) in Phase 4.
 */
export function requireUserId(event: H3Event): string {
  const userId = getHeader(event, 'x-user-id')
  if (!userId) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }
  return userId
}
