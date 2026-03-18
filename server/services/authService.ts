import bcrypt from 'bcryptjs'
import type { User } from '../../shared/types'
import { userRepository } from '../repositories/userRepository'
import { createToken } from '../utils/jwt'

const SALT_ROUNDS = 12

export const authService = {
  async register(email: string, password: string): Promise<{ user: User; token: string }> {
    const existing = await userRepository.findByEmail(email)
    if (existing) {
      throw createError({ statusCode: 409, statusMessage: 'Email already registered' })
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS)
    const user = await userRepository.create(email, passwordHash)
    const token = await createToken({ userId: user.id, email: user.email })

    return { user, token }
  },

  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    const userWithPassword = await userRepository.findByEmail(email)
    if (!userWithPassword) {
      throw createError({ statusCode: 401, statusMessage: 'Invalid email or password' })
    }

    const valid = await bcrypt.compare(password, userWithPassword.passwordHash)
    if (!valid) {
      throw createError({ statusCode: 401, statusMessage: 'Invalid email or password' })
    }

    const { passwordHash: _, ...user } = userWithPassword
    const token = await createToken({ userId: user.id, email: user.email })

    return { user, token }
  },
}
