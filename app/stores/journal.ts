import { defineStore } from 'pinia'
import type { MealEntry, MealType, RequestStatus } from '#shared/types'
import type { CreateMealPayload } from '#shared/schemas'

interface JournalState {
  entries: MealEntry[]
  selectedDate: string
  status: RequestStatus
  errorMessage: string | null
}

function todayString(): string {
  return new Date().toISOString().slice(0, 10)
}

export const useJournalStore = defineStore('journal', {
  state: (): JournalState => ({
    entries: [],
    selectedDate: todayString(),
    status: 'idle',
    errorMessage: null,
  }),

  getters: {
    entriesByMealType: (state): Record<MealType, MealEntry[]> => {
      const grouped: Record<MealType, MealEntry[]> = {
        breakfast: [],
        lunch: [],
        dinner: [],
        snack: [],
      }
      for (const entry of state.entries) {
        grouped[entry.mealType].push(entry)
      }
      return grouped
    },
  },

  actions: {
    async fetchEntries() {
      this.status = 'loading'
      this.errorMessage = null

      try {
        const { get } = useApiClient()
        this.entries = await get<MealEntry[]>('/api/meals', { date: this.selectedDate })
        this.status = 'success'
      } catch (error) {
        this.status = 'error'
        this.errorMessage = error instanceof Error ? error.message : 'Failed to load entries'
      }
    },

    async addMeal(data: CreateMealPayload) {
      const { post } = useApiClient()
      const meal = await post<MealEntry>('/api/meals', data)
      this.entries.push(meal)
      return meal
    },

    async removeMeal(id: string) {
      const { del } = useApiClient()
      await del(`/api/meals/${id}`)
      this.entries = this.entries.filter((e) => e.id !== id)
    },

    setDate(date: string) {
      this.selectedDate = date
      void this.fetchEntries()
    },
  },
})
