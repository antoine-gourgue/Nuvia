import type { ApiResult, UserProfile } from '../../shared/types'
import { calculateBMR, calculateTDEE } from '../../shared/utils/nutrition'

export function useOnboarding() {
  const onboardingStore = useOnboardingStore()
  const authStore = useAuthStore()
  const router = useRouter()

  const computedTarget = computed(() => {
    const { biologicalSex, age, heightCm, weightKg, activityLevel, goalType } = onboardingStore

    if (!biologicalSex || !age || !heightCm || !weightKg || !activityLevel || !goalType) {
      return null
    }

    const bmr = calculateBMR(weightKg, heightCm, age, biologicalSex)
    const tdee = calculateTDEE(bmr, activityLevel)

    switch (goalType) {
      case 'lose':
        return Math.max(tdee - 500, 1200)
      case 'gain':
        return tdee + 300
      case 'maintain':
      default:
        return tdee
    }
  })

  async function submitProfile(): Promise<void> {
    const { biologicalSex, age, heightCm, weightKg, targetWeightKg, goalType, activityLevel } =
      onboardingStore

    if (!biologicalSex || !age || !heightCm || !weightKg || !goalType || !activityLevel) {
      throw new Error('Incomplete onboarding data')
    }

    const response = await $fetch<ApiResult<UserProfile>>('/api/profile', {
      method: 'POST',
      headers: { Authorization: `Bearer ${authStore.token}` },
      body: {
        biologicalSex,
        age,
        heightCm,
        weightKg,
        targetWeightKg: targetWeightKg ?? null,
        goalType,
        activityLevel,
      },
    })

    if (!response.success) {
      throw new Error(response.error)
    }

    authStore.setProfile(response.data)
    onboardingStore.reset()
    await router.push('/')
  }

  return {
    computedTarget,
    submitProfile,
  }
}
