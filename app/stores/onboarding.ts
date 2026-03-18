import { defineStore } from 'pinia'
import type { GoalType, ActivityLevel, BiologicalSex } from '../../shared/types'

export type OnboardingStep = 'welcome' | 'goal' | 'body' | 'activity' | 'target' | 'done'

const STEPS: OnboardingStep[] = ['welcome', 'goal', 'body', 'activity', 'target', 'done']

interface OnboardingState {
  currentStep: OnboardingStep
  goalType: GoalType | null
  biologicalSex: BiologicalSex | null
  age: number | null
  heightCm: number | null
  weightKg: number | null
  targetWeightKg: number | null
  activityLevel: ActivityLevel | null
}

export const useOnboardingStore = defineStore('onboarding', {
  state: (): OnboardingState => ({
    currentStep: 'welcome',
    goalType: null,
    biologicalSex: null,
    age: null,
    heightCm: null,
    weightKg: null,
    targetWeightKg: null,
    activityLevel: null,
  }),

  getters: {
    currentStepIndex: (state): number => STEPS.indexOf(state.currentStep),
    totalSteps: (): number => STEPS.length,
    progress: (state): number => {
      const index = STEPS.indexOf(state.currentStep)
      return Math.round((index / (STEPS.length - 1)) * 100)
    },
    canGoNext: (state): boolean => {
      switch (state.currentStep) {
        case 'welcome':
          return true
        case 'goal':
          return !!state.goalType
        case 'body':
          return !!state.biologicalSex && !!state.age && !!state.heightCm && !!state.weightKg
        case 'activity':
          return !!state.activityLevel
        case 'target':
          return true
        default:
          return false
      }
    },
  },

  actions: {
    nextStep() {
      const index = STEPS.indexOf(this.currentStep)
      if (index < STEPS.length - 1) {
        this.currentStep = STEPS[index + 1]
      }
    },

    previousStep() {
      const index = STEPS.indexOf(this.currentStep)
      if (index > 0) {
        this.currentStep = STEPS[index - 1]
      }
    },

    reset() {
      this.$reset()
    },
  },
})
