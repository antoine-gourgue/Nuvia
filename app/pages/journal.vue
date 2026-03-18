<template>
  <div class="mx-auto w-full max-w-2xl px-4 py-8">
    <JournalJournalSkeleton v-if="journalStore.status === 'loading'" />

    <UiUEmptyState
      v-else-if="journalStore.status === 'error'"
      title="Something went wrong"
      :description="journalStore.errorMessage || 'We couldn\'t load your journal.'"
      icon="⚠️"
    >
      <template #action>
        <UiUButton variant="soft" @click="journalStore.fetchEntries()"> Try again </UiUButton>
      </template>
    </UiUEmptyState>

    <template v-else>
      <div class="mb-6 flex items-start justify-between gap-4">
        <div class="flex flex-col gap-1">
          <h1 class="text-xl font-semibold tracking-tight text-text-strong">Journal</h1>
          <p class="text-sm text-text-muted">{{ formattedDate }}</p>
        </div>
        <input
          type="date"
          aria-label="Select date"
          :value="journalStore.selectedDate"
          class="rounded-xl border border-border-soft bg-surface-card px-3 py-2 text-sm text-text-default transition-colors focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/20"
          @input="onDateChange"
        />
      </div>

      <div class="space-y-5">
        <JournalMealSection
          v-for="mealType in mealTypes"
          :key="mealType"
          :meal-type="mealType"
          :meals="journalStore.entriesByMealType[mealType]"
          @delete="handleDelete"
        />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { MealType } from '#shared/types'
import { MEAL_TYPES } from '#shared/constants'

definePageMeta({
  layout: 'app',
  middleware: 'auth',
})

const journalStore = useJournalStore()
const dashboardStore = useDashboardStore()

const mealTypes = MEAL_TYPES as readonly MealType[]

onMounted(() => {
  void journalStore.fetchEntries()
})

const formattedDate = computed(() => {
  const date = new Date(journalStore.selectedDate + 'T00:00:00')
  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
})

function onDateChange(event: Event) {
  const target = event.target as HTMLInputElement
  journalStore.setDate(target.value)
}

async function handleDelete(id: string) {
  await journalStore.removeMeal(id)
  void dashboardStore.fetchSummary()
}
</script>
