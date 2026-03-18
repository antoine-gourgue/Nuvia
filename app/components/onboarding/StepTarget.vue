<template>
  <div class="flex flex-col items-center space-y-6 text-center">
    <div
      class="flex h-20 w-20 items-center justify-center rounded-full bg-primary-100 text-primary-600"
    >
      <Target :size="36" />
    </div>

    <div>
      <h2 class="text-2xl font-bold text-surface-900">Your daily target</h2>
      <p class="mt-1 text-surface-500">Based on your profile, we recommend:</p>
    </div>

    <div class="rounded-2xl border border-primary-200 bg-primary-50 px-8 py-6">
      <p class="text-5xl font-bold text-primary-700">
        {{ computedTarget ?? '—' }}
      </p>
      <p class="mt-1 text-sm font-medium text-primary-600">calories / day</p>
    </div>

    <p class="max-w-xs text-sm text-surface-400">
      You can always adjust this later in your profile settings.
    </p>

    <UiUButton
      size="lg"
      class="w-full max-w-xs"
      :loading="isSubmitting"
      :disabled="isSubmitting"
      @click="handleSubmit"
    >
      Start my journey
    </UiUButton>

    <p v-if="errorMessage" class="text-sm text-red-600">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { Target } from 'lucide-vue-next'

const { computedTarget, submitProfile } = useOnboarding()
const isSubmitting = ref(false)
const errorMessage = ref('')

async function handleSubmit() {
  isSubmitting.value = true
  errorMessage.value = ''

  try {
    await submitProfile()
  } catch {
    errorMessage.value = 'Something went wrong. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>
