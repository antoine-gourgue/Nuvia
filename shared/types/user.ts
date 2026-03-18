export type GoalType = 'lose' | 'maintain' | 'gain'

export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active'

export type BiologicalSex = 'male' | 'female'

export interface UserProfile {
  id: string
  userId: string
  biologicalSex: BiologicalSex
  age: number
  heightCm: number
  weightKg: number
  targetWeightKg: number | null
  goalType: GoalType
  activityLevel: ActivityLevel
  dailyCalorieTarget: number
  createdAt: string
  updatedAt: string
}
