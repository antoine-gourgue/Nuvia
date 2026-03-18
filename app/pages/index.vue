<template>
  <div class="mx-auto w-full max-w-2xl space-y-6 px-4 py-8">
    <DashboardDashboardSkeleton v-if="dashboardStore.status === 'loading'" />

    <template v-else-if="dashboardStore.summary">
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-surface-900">{{ greeting }}</h1>
        <p class="mt-1 text-surface-500">{{ motivationalMessage }}</p>
      </div>

      <DashboardCalorieSummary
        :target="dashboardStore.summary.targetCalories"
        :consumed="dashboardStore.summary.consumedCalories"
      />

      <DashboardMacrosSummary
        :protein="dashboardStore.summary.macros.protein"
        :carbs="dashboardStore.summary.macros.carbs"
        :fat="dashboardStore.summary.macros.fat"
        :protein-target="macroTargets.protein"
        :carbs-target="macroTargets.carbs"
        :fat-target="macroTargets.fat"
      />

      <DashboardQuickActions />
    </template>

    <div v-else-if="dashboardStore.status === 'error'" class="py-12 text-center">
      <p class="text-surface-500">{{ dashboardStore.errorMessage }}</p>
      <UiUButton variant="secondary" class="mt-4" @click="dashboardStore.fetchSummary()">
        Try again
      </UiUButton>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'app',
  middleware: 'auth',
})

const dashboardStore = useDashboardStore()
const authStore = useAuthStore()

onMounted(() => {
  void dashboardStore.fetchSummary()
})

const greeting = computed(() => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
})

const motivationalMessage = computed(() => {
  if (!dashboardStore.summary) return ''
  const pct = dashboardStore.summary.consumedCalories / dashboardStore.summary.targetCalories
  if (pct === 0) return 'Start logging to see your progress.'
  if (pct < 0.5) return "Keep going — you're building momentum."
  if (pct < 0.9) return "You're doing great today!"
  if (pct <= 1) return 'Almost at your target — well done!'
  return "You've exceeded your target today."
})

const macroTargets = computed(() => {
  const target = authStore.profile?.dailyCalorieTarget ?? 2000
  return {
    protein: Math.round((target * 0.3) / 4),
    carbs: Math.round((target * 0.45) / 4),
    fat: Math.round((target * 0.25) / 9),
  }
})
</script>
