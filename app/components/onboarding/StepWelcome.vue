<template>
  <div class="flex flex-col items-center space-y-6 text-center">
    <div
      class="flex h-20 w-20 items-center justify-center rounded-full bg-primary-100 text-primary-600"
    >
      <Sparkles :size="36" />
    </div>
    <h2 class="text-2xl font-bold text-surface-900">Welcome to Nuvia</h2>
    <p class="max-w-xs text-surface-500">
      Let's set up your profile so we can personalize your nutrition goals.
    </p>
    <UiUButton size="lg" class="w-full max-w-xs" @click="onboardingStore.nextStep()">
      Let's get started
    </UiUButton>
  </div>
</template>

<script setup lang="ts">
import { Sparkles } from 'lucide-vue-next'

const onboardingStore = useOnboardingStore()
</script>
