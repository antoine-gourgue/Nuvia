<template>
  <div class="mx-auto w-full max-w-2xl space-y-4 px-4 py-8">
    <div>
      <h1 class="text-2xl font-bold tracking-tight text-surface-900">Progress</h1>
      <p class="mt-1 text-sm text-surface-500">Track your journey.</p>
    </div>

    <!-- Loading -->
    <div v-if="weightStore.status === 'loading'" class="space-y-4">
      <div class="grid grid-cols-3 gap-3">
        <UiUSkeleton v-for="i in 3" :key="i" height="72px" />
      </div>
      <UiUSkeleton height="220px" />
      <UiUSkeleton height="180px" />
      <UiUSkeleton height="200px" />
    </div>

    <!-- Error -->
    <UiUCard v-else-if="weightStore.status === 'error'">
      <div class="py-6 text-center">
        <p class="text-sm font-medium text-red-600">
          {{ weightStore.errorMessage || 'Failed to load weight data.' }}
        </p>
        <UiUButton variant="secondary" class="mt-3" @click="loadData"> Try again </UiUButton>
      </div>
    </UiUCard>

    <!-- Content -->
    <template v-else>
      <ProgressWeightStats
        :current-weight="weightStore.latestWeight"
        :target-weight="authStore.profile?.targetWeightKg ?? null"
        :change="weightStore.weightChange"
      />

      <ProgressMotivationalFeedback
        :change="weightStore.weightChange"
        :goal-type="authStore.profile?.goalType ?? null"
        :target-weight="authStore.profile?.targetWeightKg ?? null"
        :current-weight="weightStore.latestWeight"
      />

      <ProgressWeightChart :entries="weightStore.entries" />

      <ProgressWeightLogForm @saved="loadData" />

      <ProgressWeightHistory :entries="weightStore.entries" @delete="handleDelete" />
    </template>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'app',
  middleware: 'auth',
})

const weightStore = useWeightStore()
const authStore = useAuthStore()

async function loadData(): Promise<void> {
  await weightStore.fetchEntries()
}

async function handleDelete(id: string): Promise<void> {
  try {
    await weightStore.removeEntry(id)
  } catch {
    // silently fail — entry stays visible
  }
}

onMounted(() => {
  void loadData()
})
</script>
