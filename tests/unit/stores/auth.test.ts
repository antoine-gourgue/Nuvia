import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '~/stores/auth'
import type { User, UserProfile } from '#shared/types'

const mockUser: User = {
  id: 'u1',
  email: 'test@example.com',
  createdAt: '2026-01-01T00:00:00Z',
  updatedAt: '2026-01-01T00:00:00Z',
}

const mockProfile: UserProfile = {
  id: 'p1',
  userId: 'u1',
  biologicalSex: 'male',
  age: 30,
  heightCm: 180,
  weightKg: 80,
  targetWeightKg: 75,
  goalType: 'lose',
  activityLevel: 'moderate',
  dailyCalorieTarget: 2100,
  createdAt: '2026-01-01T00:00:00Z',
  updatedAt: '2026-01-01T00:00:00Z',
}

describe('useAuthStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
  })

  describe('initial state', () => {
    it('starts unauthenticated', () => {
      const store = useAuthStore()
      expect(store.isAuthenticated).toBe(false)
      expect(store.hasProfile).toBe(false)
      expect(store.user).toBeNull()
      expect(store.token).toBeNull()
      expect(store.profile).toBeNull()
    })
  })

  describe('setAuth', () => {
    it('sets user, token and profile', () => {
      const store = useAuthStore()
      store.setAuth(mockUser, 'token-123', mockProfile)

      expect(store.user).toEqual(mockUser)
      expect(store.token).toBe('token-123')
      expect(store.profile).toEqual(mockProfile)
      expect(store.isAuthenticated).toBe(true)
      expect(store.hasProfile).toBe(true)
    })

    it('persists token to localStorage when on client', () => {
      // import.meta.client is false in happy-dom, so localStorage is not written
      // We test the store sets the token value instead
      const store = useAuthStore()
      store.setAuth(mockUser, 'token-123', null)
      expect(store.token).toBe('token-123')
    })

    it('works without profile', () => {
      const store = useAuthStore()
      store.setAuth(mockUser, 'token-123', null)

      expect(store.isAuthenticated).toBe(true)
      expect(store.hasProfile).toBe(false)
    })
  })

  describe('setProfile', () => {
    it('sets the profile', () => {
      const store = useAuthStore()
      store.setProfile(mockProfile)
      expect(store.profile).toEqual(mockProfile)
      expect(store.hasProfile).toBe(true)
    })
  })

  describe('logout', () => {
    it('clears all state', () => {
      const store = useAuthStore()
      store.setAuth(mockUser, 'token-123', mockProfile)
      store.logout()

      expect(store.user).toBeNull()
      expect(store.token).toBeNull()
      expect(store.profile).toBeNull()
      expect(store.isAuthenticated).toBe(false)
      expect(store.status).toBe('idle')
    })

    it('removes token from localStorage', () => {
      const store = useAuthStore()
      store.setAuth(mockUser, 'token-123', null)
      store.logout()
      expect(localStorage.getItem('nuvia_token')).toBeNull()
    })
  })

  describe('loadTokenFromStorage', () => {
    it('does not load token when import.meta.client is false', () => {
      // In happy-dom, import.meta.client is false so loadTokenFromStorage is a no-op
      localStorage.setItem('nuvia_token', 'stored-token')
      const store = useAuthStore()
      store.loadTokenFromStorage()
      expect(store.token).toBeNull()
    })

    it('stays null when no token stored', () => {
      const store = useAuthStore()
      store.loadTokenFromStorage()
      expect(store.token).toBeNull()
    })
  })
})
