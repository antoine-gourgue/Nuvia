import type { User, UserProfile } from '#shared/types'
import { useDatabase } from '../db'

interface UserRow {
  id: string
  email: string
  password_hash: string
  created_at: string
  updated_at: string
}

interface ProfileRow {
  id: string
  user_id: string
  biological_sex: string
  age: number
  height_cm: string
  weight_kg: string
  target_weight_kg: string | null
  goal_type: string
  activity_level: string
  daily_calorie_target: number
  created_at: string
  updated_at: string
}

function toUser(row: UserRow): User {
  return {
    id: row.id,
    email: row.email,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

function toUserProfile(row: ProfileRow): UserProfile {
  return {
    id: row.id,
    userId: row.user_id,
    biologicalSex: row.biological_sex as UserProfile['biologicalSex'],
    age: row.age,
    heightCm: Number(row.height_cm),
    weightKg: Number(row.weight_kg),
    targetWeightKg: row.target_weight_kg ? Number(row.target_weight_kg) : null,
    goalType: row.goal_type as UserProfile['goalType'],
    activityLevel: row.activity_level as UserProfile['activityLevel'],
    dailyCalorieTarget: row.daily_calorie_target,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export const userRepository = {
  async findByEmail(email: string): Promise<(User & { passwordHash: string }) | null> {
    const sql = useDatabase()
    const rows = await sql<UserRow[]>`
      SELECT * FROM users WHERE email = ${email}
    `
    const row = rows[0]
    if (!row) return null
    return { ...toUser(row), passwordHash: row.password_hash }
  },

  async findById(id: string): Promise<User | null> {
    const sql = useDatabase()
    const rows = await sql<UserRow[]>`
      SELECT * FROM users WHERE id = ${id}
    `
    const row = rows[0]
    return row ? toUser(row) : null
  },

  async create(email: string, passwordHash: string): Promise<User> {
    const sql = useDatabase()
    const rows = await sql<UserRow[]>`
      INSERT INTO users (email, password_hash)
      VALUES (${email}, ${passwordHash})
      RETURNING *
    `
    const row = rows[0]
    if (!row) throw new Error('Failed to create user')
    return toUser(row)
  },

  async findProfileByUserId(userId: string): Promise<UserProfile | null> {
    const sql = useDatabase()
    const rows = await sql<ProfileRow[]>`
      SELECT * FROM user_profiles WHERE user_id = ${userId}
    `
    const row = rows[0]
    return row ? toUserProfile(row) : null
  },

  async createProfile(
    userId: string,
    data: {
      biologicalSex: string
      age: number
      heightCm: number
      weightKg: number
      targetWeightKg: number | null
      goalType: string
      activityLevel: string
      dailyCalorieTarget: number
    },
  ): Promise<UserProfile> {
    const sql = useDatabase()
    const rows = await sql<ProfileRow[]>`
      INSERT INTO user_profiles (user_id, biological_sex, age, height_cm, weight_kg, target_weight_kg, goal_type, activity_level, daily_calorie_target)
      VALUES (${userId}, ${data.biologicalSex}, ${data.age}, ${data.heightCm}, ${data.weightKg}, ${data.targetWeightKg}, ${data.goalType}, ${data.activityLevel}, ${data.dailyCalorieTarget})
      RETURNING *
    `
    const row = rows[0]
    if (!row) throw new Error('Failed to create profile')
    return toUserProfile(row)
  },

  async updateProfile(
    userId: string,
    data: Partial<{
      biologicalSex: string
      age: number
      heightCm: number
      weightKg: number
      targetWeightKg: number | null
      goalType: string
      activityLevel: string
      dailyCalorieTarget: number
    }>,
  ): Promise<UserProfile | null> {
    const sql = useDatabase()
    const rows = await sql<ProfileRow[]>`
      UPDATE user_profiles SET
        biological_sex = COALESCE(${data.biologicalSex ?? null}, biological_sex),
        age = COALESCE(${data.age ?? null}, age),
        height_cm = COALESCE(${data.heightCm ?? null}, height_cm),
        weight_kg = COALESCE(${data.weightKg ?? null}, weight_kg),
        target_weight_kg = COALESCE(${data.targetWeightKg ?? null}, target_weight_kg),
        goal_type = COALESCE(${data.goalType ?? null}, goal_type),
        activity_level = COALESCE(${data.activityLevel ?? null}, activity_level),
        daily_calorie_target = COALESCE(${data.dailyCalorieTarget ?? null}, daily_calorie_target),
        updated_at = NOW()
      WHERE user_id = ${userId}
      RETURNING *
    `
    const row = rows[0]
    return row ? toUserProfile(row) : null
  },
}
