export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore()
  authStore.loadTokenFromStorage()

  if (authStore.token) {
    const { fetchMe } = useAuth()
    await fetchMe()
  }
})
