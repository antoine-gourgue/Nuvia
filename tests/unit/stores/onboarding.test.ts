import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useOnboardingStore } from '~/stores/onboarding'

describe('useOnboardingStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('initial state', () => {
    it('starts at welcome step', () => {
      const store = useOnboardingStore()
      expect(store.currentStep).toBe('welcome')
    })

    it('has null values for all fields', () => {
      const store = useOnboardingStore()
      expect(store.goalType).toBeNull()
      expect(store.biologicalSex).toBeNull()
      expect(store.age).toBeNull()
      expect(store.heightCm).toBeNull()
      expect(store.weightKg).toBeNull()
      expect(store.targetWeightKg).toBeNull()
      expect(store.activityLevel).toBeNull()
    })
  })

  describe('getters', () => {
    it('returns correct step index', () => {
      const store = useOnboardingStore()
      expect(store.currentStepIndex).toBe(0)
      store.nextStep()
      expect(store.currentStepIndex).toBe(1)
    })

    it('returns total steps count', () => {
      const store = useOnboardingStore()
      expect(store.totalSteps).toBe(6)
    })

    it('calculates progress percentage', () => {
      const store = useOnboardingStore()
      expect(store.progress).toBe(0)
      store.nextStep() // goal
      expect(store.progress).toBe(20)
    })
  })

  describe('canGoNext', () => {
    it('allows next on welcome step', () => {
      const store = useOnboardingStore()
      expect(store.canGoNext).toBe(true)
    })

    it('blocks next on goal step without selection', () => {
      const store = useOnboardingStore()
      store.currentStep = 'goal'
      expect(store.canGoNext).toBe(false)
    })

    it('allows next on goal step with selection', () => {
      const store = useOnboardingStore()
      store.currentStep = 'goal'
      store.goalType = 'lose'
      expect(store.canGoNext).toBe(true)
    })

    it('blocks next on body step without all fields', () => {
      const store = useOnboardingStore()
      store.currentStep = 'body'
      expect(store.canGoNext).toBe(false)

      store.biologicalSex = 'male'
      expect(store.canGoNext).toBe(false)

      store.age = 30
      expect(store.canGoNext).toBe(false)

      store.heightCm = 180
      expect(store.canGoNext).toBe(false)

      store.weightKg = 80
      expect(store.canGoNext).toBe(true)
    })

    it('blocks next on activity step without selection', () => {
      const store = useOnboardingStore()
      store.currentStep = 'activity'
      expect(store.canGoNext).toBe(false)

      store.activityLevel = 'moderate'
      expect(store.canGoNext).toBe(true)
    })

    it('allows next on target step', () => {
      const store = useOnboardingStore()
      store.currentStep = 'target'
      expect(store.canGoNext).toBe(true)
    })

    it('blocks next on done step', () => {
      const store = useOnboardingStore()
      store.currentStep = 'done'
      expect(store.canGoNext).toBe(false)
    })
  })

  describe('actions', () => {
    it('advances to next step', () => {
      const store = useOnboardingStore()
      store.nextStep()
      expect(store.currentStep).toBe('goal')
    })

    it('goes back to previous step', () => {
      const store = useOnboardingStore()
      store.nextStep()
      store.previousStep()
      expect(store.currentStep).toBe('welcome')
    })

    it('does not go back before welcome', () => {
      const store = useOnboardingStore()
      store.previousStep()
      expect(store.currentStep).toBe('welcome')
    })

    it('does not go past done', () => {
      const store = useOnboardingStore()
      store.currentStep = 'done'
      store.nextStep()
      expect(store.currentStep).toBe('done')
    })

    it('resets to initial state', () => {
      const store = useOnboardingStore()
      store.goalType = 'gain'
      store.currentStep = 'activity'
      store.activityLevel = 'active'
      store.reset()
      expect(store.currentStep).toBe('welcome')
      expect(store.goalType).toBeNull()
      expect(store.activityLevel).toBeNull()
    })
  })
})
