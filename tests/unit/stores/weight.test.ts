import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useWeightStore } from '~/stores/weight'
import type { WeightEntry } from '#shared/types'

const entries: WeightEntry[] = [
  {
    id: 'w1',
    userId: 'u1',
    weightKg: 82,
    entryDate: '2026-03-01',
    note: null,
    createdAt: '2026-03-01T08:00:00Z',
    updatedAt: '2026-03-01T08:00:00Z',
  },
  {
    id: 'w2',
    userId: 'u1',
    weightKg: 80,
    entryDate: '2026-03-10',
    note: 'Morning',
    createdAt: '2026-03-10T08:00:00Z',
    updatedAt: '2026-03-10T08:00:00Z',
  },
  {
    id: 'w3',
    userId: 'u1',
    weightKg: 79,
    entryDate: '2026-03-18',
    note: null,
    createdAt: '2026-03-18T08:00:00Z',
    updatedAt: '2026-03-18T08:00:00Z',
  },
]

describe('useWeightStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('initial state', () => {
    it('starts with empty entries', () => {
      const store = useWeightStore()
      expect(store.entries).toEqual([])
      expect(store.status).toBe('idle')
      expect(store.errorMessage).toBeNull()
    })
  })

  describe('getters', () => {
    it('sortedEntries returns entries sorted by date ascending', () => {
      const store = useWeightStore()
      store.entries = [entries[2], entries[0], entries[1]]

      expect(store.sortedEntries.map((e) => e.id)).toEqual(['w1', 'w2', 'w3'])
    })

    it('latestWeight returns most recent weight', () => {
      const store = useWeightStore()
      store.entries = [entries[0], entries[2], entries[1]]

      expect(store.latestWeight).toBe(79)
    })

    it('latestWeight returns null when empty', () => {
      const store = useWeightStore()
      expect(store.latestWeight).toBeNull()
    })

    it('weightChange returns difference between first and last', () => {
      const store = useWeightStore()
      store.entries = [...entries]

      expect(store.weightChange).toBe(-3) // 79 - 82
    })

    it('weightChange returns null with fewer than 2 entries', () => {
      const store = useWeightStore()
      store.entries = [entries[0]]
      expect(store.weightChange).toBeNull()
    })

    it('weightChange returns null when empty', () => {
      const store = useWeightStore()
      expect(store.weightChange).toBeNull()
    })
  })
})
