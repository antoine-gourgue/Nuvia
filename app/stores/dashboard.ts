import { defineStore } from 'pinia'
import type { DailySummary, RequestStatus } from '../../shared/types'

interface DashboardState {
  summary: DailySummary | null
  selectedDate: string
  status: RequestStatus
  errorMessage: string | null
}

function todayString(): string {
  return new Date().toISOString().slice(0, 10)
}

export const useDashboardStore = defineStore('dashboard', {
  state: (): DashboardState => ({
    summary: null,
    selectedDate: todayString(),
    status: 'idle',
    errorMessage: null,
  }),

  actions: {
    async fetchSummary() {
      this.status = 'loading'
      this.errorMessage = null

      try {
        const { get } = useApiClient()
        this.summary = await get<DailySummary>('/api/daily', { date: this.selectedDate })
        this.status = 'success'
      } catch (error) {
        this.status = 'error'
        this.errorMessage = error instanceof Error ? error.message : 'Failed to load summary'
      }
    },

    setDate(date: string) {
      this.selectedDate = date
      void this.fetchSummary()
    },
  },
})
