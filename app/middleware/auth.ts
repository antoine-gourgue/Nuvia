export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()

  if (!authStore.isAuthenticated) {
    return navigateTo('/login')
  }

  if (!authStore.hasProfile && to.path !== '/onboarding') {
    return navigateTo('/onboarding')
  }
})
