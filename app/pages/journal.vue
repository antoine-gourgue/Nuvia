<template>
  <div class="mx-auto w-full max-w-2xl space-y-6 px-4 py-8">
    <JournalJournalSkeleton v-if="journalStore.status === 'loading'" />

    <template v-else>
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-surface-900">Journal</h1>
          <p class="mt-1 text-surface-500">{{ formattedDate }}</p>
        </div>
        <input
          type="date"
          :value="journalStore.selectedDate"
          class="rounded-lg border border-surface-200 bg-white px-3 py-2 text-sm text-surface-700"
          @input="onDateChange"
        />
      </div>

      <div class="space-y-6">
        <JournalMealSection
          v-for="mealType in mealTypes"
          :key="mealType"
          :meal-type="mealType"
          :meals="journalStore.entriesByMealType[mealType]"
          @delete="handleDelete"
        />
      </div>
    </template>

    <div v-if="journalStore.status === 'error'" class="py-12 text-center">
      <p class="text-surface-500">{{ journalStore.errorMessage }}</p>
      <UiUButton variant="secondary" class="mt-4" @click="journalStore.fetchEntries()">
        Try again
      </UiUButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MealType } from '../../shared/types'
import { MEAL_TYPES } from '../../shared/constants'

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
