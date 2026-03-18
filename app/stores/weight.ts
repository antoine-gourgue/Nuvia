import { defineStore } from 'pinia'
import type { WeightEntry, RequestStatus } from '../../shared/types'

interface WeightState {
  entries: WeightEntry[]
  status: RequestStatus
  errorMessage: string | null
}

export const useWeightStore = defineStore('weight', {
  state: (): WeightState => ({
    entries: [],
    status: 'idle',
    errorMessage: null,
  }),

  getters: {
    sortedEntries: (state): WeightEntry[] => {
      return [...state.entries].sort(
        (a, b) => new Date(a.entryDate).getTime() - new Date(b.entryDate).getTime(),
      )
    },

    latestWeight: (state): number | null => {
      if (state.entries.length === 0) return null
      const sorted = [...state.entries].sort(
        (a, b) => new Date(b.entryDate).getTime() - new Date(a.entryDate).getTime(),
      )
      return sorted[0].weightKg
    },

    weightChange(): number | null {
      const sorted = this.sortedEntries
      if (sorted.length < 2) return null
      return sorted[sorted.length - 1].weightKg - sorted[0].weightKg
    },
  },

  actions: {
    async fetchEntries() {
      this.status = 'loading'
      this.errorMessage = null

      try {
        const { get } = useApiClient()
        this.entries = await get<WeightEntry[]>('/api/weight')
        this.status = 'success'
      } catch (error) {
        this.status = 'error'
        this.errorMessage = error instanceof Error ? error.message : 'Failed to load weight data'
      }
    },

    async logWeight(weightKg: number, entryDate: string, note?: string) {
      const { post } = useApiClient()
      const entry = await post<WeightEntry>('/api/weight', {
        weightKg,
        entryDate,
        note: note || null,
      })

      const existingIndex = this.entries.findIndex((e) => e.entryDate === entryDate)
      if (existingIndex >= 0) {
        this.entries[existingIndex] = entry
      } else {
        this.entries.push(entry)
      }

      return entry
    },

    async removeEntry(id: string) {
      const { del } = useApiClient()
      await del(`/api/weight/${id}`)
      this.entries = this.entries.filter((e) => e.id !== id)
    },
  },
})
