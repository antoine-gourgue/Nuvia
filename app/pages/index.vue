<template>
  <div class="mx-auto w-full max-w-2xl px-4 py-8">
    <DashboardDashboardSkeleton v-if="dashboardStore.status === 'loading'" />

    <template v-else-if="dashboardStore.summary">
      <UiUPageHeader :title="greeting" :subtitle="motivationalMessage" />

      <div class="space-y-5">
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
      </div>
    </template>

    <UiUEmptyState
      v-else-if="dashboardStore.status === 'error'"
      title="Something went wrong"
      :description="dashboardStore.errorMessage ?? 'We couldn\'t load your dashboard.'"
      icon="⚠️"
    >
      <template #action>
        <UiUButton variant="soft" @click="dashboardStore.fetchSummary()"> Try again </UiUButton>
      </template>
    </UiUEmptyState>
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
