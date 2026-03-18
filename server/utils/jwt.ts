import { SignJWT, jwtVerify } from 'jose'
import type { AuthTokenPayload } from '#shared/types'

function getSecret(): Uint8Array {
  const config = useRuntimeConfig()
  return new TextEncoder().encode(config.jwtSecret)
}

export async function createToken(payload: AuthTokenPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(getSecret())
}

export async function verifyToken(token: string): Promise<AuthTokenPayload> {
  const { payload } = await jwtVerify(token, getSecret())
  return {
    userId: payload.userId as string,
    email: payload.email as string,
  }
}
