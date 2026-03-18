import { defineStore } from 'pinia'
import type { User, UserProfile, RequestStatus } from '../../shared/types'

interface AuthState {
  user: User | null
  profile: UserProfile | null
  token: string | null
  status: RequestStatus
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    profile: null,
    token: null,
    status: 'idle',
  }),

  getters: {
    isAuthenticated: (state): boolean => !!state.token && !!state.user,
    hasProfile: (state): boolean => !!state.profile,
  },

  actions: {
    setAuth(user: User, token: string, profile: UserProfile | null) {
      this.user = user
      this.token = token
      this.profile = profile

      if (import.meta.client) {
        localStorage.setItem('nuvia_token', token)
      }
    },

    setProfile(profile: UserProfile) {
      this.profile = profile
    },

    logout() {
      this.user = null
      this.profile = null
      this.token = null
      this.status = 'idle'

      if (import.meta.client) {
        localStorage.removeItem('nuvia_token')
      }
    },

    loadTokenFromStorage() {
      if (import.meta.client) {
        this.token = localStorage.getItem('nuvia_token')
      }
    },
  },
})
