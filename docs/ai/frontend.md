# Frontend Standards

This project uses Nuxt 4, Vue 3, Composition API, Tailwind CSS and Pinia.

## 1. Core Principles
- Use Composition API only
- Use `<script setup lang="ts">`
- Keep pages thin
- Keep components focused
- Put reusable logic in composables
- Put shared cross-page state in Pinia
- Always design for loading / empty / error states
- Prioritize mobile experience

## 2. Page Responsibilities
A page should:
- orchestrate a screen
- call composables or stores
- pass data to components
- react to route-level concerns

Good:
```vue
<script setup lang="ts">
const journalStore = useJournalStore()

onMounted(() => {
  void journalStore.fetchTodayEntries()
})
</script>

<template>
  <JournalScreen
    :entries="journalStore.entries"
    :status="journalStore.status"
    :error-message="journalStore.errorMessage"
  />
</template>
```

Bad:
```vue
<script setup lang="ts">
const entries = ref([])

onMounted(async () => {
  const response = await $fetch('/api/journal/today')
  entries.value = response as any
})
</script>
```

## 3. Component Responsibilities
- render data
- expose typed props
- emit typed events
- stay focused on one concern

## 4. Composables
Good:
```ts
export function useRemainingCalories(targetCalories: Ref<number>, consumedCalories: Ref<number>) {
  const remainingCalories = computed(() => Math.max(targetCalories.value - consumedCalories.value, 0))

  return {
    remainingCalories,
  }
}
```

## 5. Pinia Stores
Good:
```ts
export const useJournalStore = defineStore('journal', {
  state: () => ({
    entries: [] as MealEntry[],
    status: 'idle' as RequestStatus,
    errorMessage: null as string | null,
  }),
})
```
