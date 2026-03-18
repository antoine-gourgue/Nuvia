import type { ApiResult } from '#shared/types'

export function useApiClient() {
  const authStore = useAuthStore()

  function authHeaders(): Record<string, string> {
    if (!authStore.token) return {}
    return { Authorization: `Bearer ${authStore.token}` }
  }

  async function get<T>(url: string, params?: Record<string, string>): Promise<T> {
    const response = await $fetch<ApiResult<T>>(url, {
      headers: authHeaders(),
      params,
    })
    if (!response.success) throw new Error(response.error)
    return response.data
  }

  async function post<T>(url: string, body: Record<string, unknown>): Promise<T> {
    const response = await $fetch<ApiResult<T>>(url, {
      method: 'POST',
      headers: authHeaders(),
      body,
    })
    if (!response.success) throw new Error(response.error)
    return response.data
  }

  async function patch<T>(url: string, body: Record<string, unknown>): Promise<T> {
    const response = await $fetch<ApiResult<T>>(url, {
      method: 'PATCH',
      headers: authHeaders(),
      body,
    })
    if (!response.success) throw new Error(response.error)
    return response.data
  }

  async function del<T>(url: string): Promise<T> {
    const response = await $fetch<ApiResult<T>>(url, {
      method: 'DELETE',
      headers: authHeaders(),
    })
    if (!response.success) throw new Error(response.error)
    return response.data
  }

  return { get, post, patch, del }
}
