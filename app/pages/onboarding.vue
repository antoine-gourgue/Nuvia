<template>
  <div class="flex min-h-screen flex-col bg-surface-50">
    <div v-if="onboardingStore.currentStep !== 'welcome'" class="px-4 pt-6">
      <div class="mx-auto w-full max-w-md">
        <UiUProgress
          :value="onboardingStore.progress"
          :max="100"
          color="primary"
          height="0.375rem"
        />
      </div>
    </div>

    <div class="flex flex-1 items-center justify-center px-4 py-8">
      <div class="w-full max-w-md">
        <OnboardingStepWelcome v-if="onboardingStore.currentStep === 'welcome'" />
        <OnboardingStepGoal v-else-if="onboardingStore.currentStep === 'goal'" />
        <OnboardingStepBody v-else-if="onboardingStore.currentStep === 'body'" />
        <OnboardingStepActivity v-else-if="onboardingStore.currentStep === 'activity'" />
        <OnboardingStepTarget v-else-if="onboardingStore.currentStep === 'target'" />
      </div>
    </div>

    <div v-if="showNavigation" class="border-t border-surface-100 bg-white px-4 py-4">
      <div class="mx-auto flex w-full max-w-md items-center justify-between">
        <UiUButton variant="ghost" @click="onboardingStore.previousStep()"> Back </UiUButton>
        <UiUButton :disabled="!onboardingStore.canGoNext" @click="onboardingStore.nextStep()">
          Continue
        </UiUButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

const onboardingStore = useOnboardingStore()

const showNavigation = computed(() => {
  const step = onboardingStore.currentStep
  return step !== 'welcome' && step !== 'target' && step !== 'done'
})
</script>
