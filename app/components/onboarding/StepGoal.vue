<template>
  <div class="space-y-6">
    <div class="text-center">
      <h2 class="text-2xl font-bold text-surface-900">What's your goal?</h2>
      <p class="mt-1 text-surface-500">This helps us calculate your daily target.</p>
    </div>

    <div class="space-y-3">
      <button
        v-for="option in goalOptions"
        :key="option.value"
        :class="[
          'flex w-full items-center gap-4 rounded-2xl border-2 p-4 text-left transition-all duration-200',
          onboardingStore.goalType === option.value
            ? 'border-primary-500 bg-primary-50'
            : 'border-surface-200 bg-white hover:border-surface-300',
        ]"
        @click="onboardingStore.goalType = option.value"
      >
        <div
          :class="[
            'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl',
            onboardingStore.goalType === option.value
              ? 'bg-primary-100 text-primary-600'
              : 'bg-surface-100 text-surface-500',
          ]"
        >
          <component :is="option.icon" :size="24" />
        </div>
        <div>
          <p class="font-semibold text-surface-900">{{ option.label }}</p>
          <p class="text-sm text-surface-500">{{ option.description }}</p>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TrendingDown, Minus, TrendingUp } from 'lucide-vue-next'
import type { GoalType } from '../../../shared/types'

const onboardingStore = useOnboardingStore()

const goalOptions: {
  value: GoalType
  label: string
  description: string
  icon: typeof TrendingDown
}[] = [
  {
    value: 'lose',
    label: 'Lose weight',
    description: 'Reduce body fat at a healthy pace',
    icon: TrendingDown,
  },
  {
    value: 'maintain',
    label: 'Maintain weight',
    description: 'Keep your current weight stable',
    icon: Minus,
  },
  {
    value: 'gain',
    label: 'Gain weight',
    description: 'Build muscle and increase mass',
    icon: TrendingUp,
  },
]
</script>
