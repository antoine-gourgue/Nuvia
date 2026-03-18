export interface User {
  id: string
  email: string
  createdAt: string
  updatedAt: string
}

export type AuthTokenPayload = {
  userId: string
  email: string
}
