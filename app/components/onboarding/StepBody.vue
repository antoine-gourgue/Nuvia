<template>
  <div class="space-y-6">
    <div class="text-center">
      <h2 class="text-2xl font-bold text-surface-900">About you</h2>
      <p class="mt-1 text-surface-500">We need a few details to calculate your needs.</p>
    </div>

    <div class="space-y-4">
      <div>
        <p class="mb-2 text-sm font-medium text-surface-700">Biological sex</p>
        <div class="grid grid-cols-2 gap-3">
          <button
            v-for="option in sexOptions"
            :key="option.value"
            :class="[
              'rounded-xl border-2 py-3 text-sm font-medium transition-all duration-200',
              onboardingStore.biologicalSex === option.value
                ? 'border-primary-500 bg-primary-50 text-primary-700'
                : 'border-surface-200 bg-white text-surface-600 hover:border-surface-300',
            ]"
            @click="onboardingStore.biologicalSex = option.value"
          >
            {{ option.label }}
          </button>
        </div>
      </div>

      <UiUInput
        :model-value="onboardingStore.age ?? ''"
        label="Age"
        type="number"
        placeholder="25"
        @update:model-value="onboardingStore.age = Number($event) || null"
      />

      <UiUInput
        :model-value="onboardingStore.heightCm ?? ''"
        label="Height (cm)"
        type="number"
        placeholder="175"
        @update:model-value="onboardingStore.heightCm = Number($event) || null"
      />

      <UiUInput
        :model-value="onboardingStore.weightKg ?? ''"
        label="Weight (kg)"
        type="number"
        placeholder="70"
        @update:model-value="onboardingStore.weightKg = Number($event) || null"
      />

      <UiUInput
        :model-value="onboardingStore.targetWeightKg ?? ''"
        label="Target weight (kg, optional)"
        type="number"
        placeholder="65"
        @update:model-value="onboardingStore.targetWeightKg = Number($event) || null"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BiologicalSex } from '../../../shared/types'

const onboardingStore = useOnboardingStore()

const sexOptions: { value: BiologicalSex; label: string }[] = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
]
</script>
