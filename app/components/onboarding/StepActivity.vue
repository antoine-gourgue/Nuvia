<template>
  <div class="space-y-6">
    <div class="text-center">
      <h2 class="text-2xl font-bold text-surface-900">Activity level</h2>
      <p class="mt-1 text-surface-500">How active are you on a typical week?</p>
    </div>

    <div class="space-y-3">
      <button
        v-for="option in activityOptions"
        :key="option.value"
        :class="[
          'flex w-full items-start gap-3 rounded-2xl border-2 p-4 text-left transition-all duration-200',
          onboardingStore.activityLevel === option.value
            ? 'border-primary-500 bg-primary-50'
            : 'border-surface-200 bg-white hover:border-surface-300',
        ]"
        @click="onboardingStore.activityLevel = option.value"
      >
        <div>
          <p class="font-semibold text-surface-900">{{ option.label }}</p>
          <p class="text-sm text-surface-500">{{ option.description }}</p>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ActivityLevel } from '../../../shared/types'

const onboardingStore = useOnboardingStore()

const activityOptions: { value: ActivityLevel; label: string; description: string }[] = [
  { value: 'sedentary', label: 'Sedentary', description: 'Little or no exercise' },
  { value: 'light', label: 'Lightly active', description: '1-3 days of exercise per week' },
  { value: 'moderate', label: 'Moderately active', description: '3-5 days of exercise per week' },
  { value: 'active', label: 'Very active', description: '6-7 days of exercise per week' },
  {
    value: 'very_active',
    label: 'Extra active',
    description: 'Very intense exercise or physical job',
  },
]
</script>
