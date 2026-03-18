<template>
  <div class="flex min-h-screen items-center justify-center bg-surface-50 px-4">
    <div class="w-full max-w-sm space-y-8">
      <div class="text-center">
        <h1 class="text-3xl font-bold tracking-tight text-surface-900">Welcome back</h1>
        <p class="mt-2 text-surface-500">Sign in to continue your journey.</p>
      </div>

      <form class="space-y-4" @submit.prevent="handleLogin">
        <UiUInput
          v-model="email"
          label="Email"
          type="email"
          placeholder="you@example.com"
          :error="errors.email"
          :disabled="isLoading"
        />
        <UiUInput
          v-model="password"
          label="Password"
          type="password"
          placeholder="Your password"
          :error="errors.password"
          :disabled="isLoading"
        />

        <p v-if="errorMessage" class="text-sm text-red-600">
          {{ errorMessage }}
        </p>

        <UiUButton
          type="submit"
          class="w-full"
          size="lg"
          :loading="isLoading"
          :disabled="isLoading"
        >
          Sign in
        </UiUButton>
      </form>

      <p class="text-center text-sm text-surface-500">
        Don't have an account?
        <NuxtLink to="/register" class="font-medium text-primary-600 hover:text-primary-700">
          Sign up
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
  middleware: 'guest',
})

const { login } = useAuth()

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const isLoading = ref(false)
const errors = reactive({ email: '', password: '' })

async function handleLogin() {
  errors.email = ''
  errors.password = ''
  errorMessage.value = ''

  if (!email.value) {
    errors.email = 'Email is required'
    return
  }
  if (!password.value) {
    errors.password = 'Password is required'
    return
  }

  isLoading.value = true
  try {
    await login(email.value, password.value)
  } catch {
    errorMessage.value = 'Invalid email or password.'
  } finally {
    isLoading.value = false
  }
}
</script>
