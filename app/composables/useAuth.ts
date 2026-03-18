import type { ApiResult, User, UserProfile } from '#shared/types'

interface AuthResponse {
  user: User
  token: string
}

interface MeResponse {
  user: User
  profile: UserProfile | null
}

export function useAuth() {
  const authStore = useAuthStore()
  const router = useRouter()

  async function register(email: string, password: string): Promise<void> {
    authStore.status = 'loading'

    try {
      const response = await $fetch<ApiResult<AuthResponse>>('/api/auth/register', {
        method: 'POST',
        body: { email, password },
      })

      if (!response.success) {
        authStore.status = 'error'
        throw new Error(response.error)
      }

      authStore.setAuth(response.data.user, response.data.token, null)
      authStore.status = 'success'
      await router.push('/onboarding')
    } catch (error) {
      authStore.status = 'error'
      throw error
    }
  }

  async function login(email: string, password: string): Promise<void> {
    authStore.status = 'loading'

    try {
      const response = await $fetch<ApiResult<AuthResponse>>('/api/auth/login', {
        method: 'POST',
        body: { email, password },
      })

      if (!response.success) {
        authStore.status = 'error'
        throw new Error(response.error)
      }

      authStore.setAuth(response.data.user, response.data.token, null)
      authStore.status = 'success'
      await fetchMe()

      if (!authStore.hasProfile) {
        await router.push('/onboarding')
      } else {
        await router.push('/')
      }
    } catch (error) {
      authStore.status = 'error'
      throw error
    }
  }

  async function fetchMe(): Promise<void> {
    if (!authStore.token) return

    try {
      const response = await $fetch<ApiResult<MeResponse>>('/api/auth/me', {
        headers: { Authorization: `Bearer ${authStore.token}` },
      })

      if (response.success) {
        authStore.setAuth(response.data.user, authStore.token!, response.data.profile)
      }
    } catch {
      authStore.logout()
    }
  }

  function logout(): void {
    authStore.logout()
    router.push('/login')
  }

  return {
    register,
    login,
    logout,
    fetchMe,
  }
}
