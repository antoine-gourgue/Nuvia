import type { UserProfile } from '#shared/types'
import type { CreateUserProfilePayload, UpdateUserProfilePayload } from '#shared/schemas'
import { userRepository } from '../repositories/userRepository'
import { calculateBMR, calculateTDEE } from '#shared/utils/nutrition'

function computeDailyTarget(data: CreateUserProfilePayload): number {
  const bmr = calculateBMR(data.weightKg, data.heightCm, data.age, data.biologicalSex)
  const tdee = calculateTDEE(bmr, data.activityLevel)

  switch (data.goalType) {
    case 'lose':
      return Math.max(tdee - 500, 1200)
    case 'gain':
      return tdee + 300
    case 'maintain':
    default:
      return tdee
  }
}

export const userService = {
  async getProfile(userId: string): Promise<UserProfile | null> {
    return userRepository.findProfileByUserId(userId)
  },

  async createProfile(userId: string, data: CreateUserProfilePayload): Promise<UserProfile> {
    const dailyCalorieTarget = computeDailyTarget(data)

    return userRepository.createProfile(userId, {
      ...data,
      targetWeightKg: data.targetWeightKg ?? null,
      dailyCalorieTarget,
    })
  },

  async updateProfile(userId: string, data: UpdateUserProfilePayload): Promise<UserProfile | null> {
    const existing = await userRepository.findProfileByUserId(userId)
    if (!existing) return null

    const merged = {
      biologicalSex: data.biologicalSex ?? existing.biologicalSex,
      age: data.age ?? existing.age,
      heightCm: data.heightCm ?? existing.heightCm,
      weightKg: data.weightKg ?? existing.weightKg,
      targetWeightKg: data.targetWeightKg ?? existing.targetWeightKg,
      goalType: data.goalType ?? existing.goalType,
      activityLevel: data.activityLevel ?? existing.activityLevel,
    }

    const dailyCalorieTarget = computeDailyTarget(merged)

    return userRepository.updateProfile(userId, {
      ...data,
      dailyCalorieTarget,
    })
  },
}
