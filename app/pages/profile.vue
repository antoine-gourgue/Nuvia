<template>
  <div class="mx-auto w-full max-w-2xl space-y-4 px-4 py-8">
    <div>
      <h1 class="text-2xl font-bold tracking-tight text-surface-900">Profile</h1>
      <p class="mt-1 text-sm text-surface-500">Your account and settings.</p>
    </div>

    <!-- No profile -->
    <UiUCard v-if="!profile">
      <div class="py-6 text-center">
        <p class="text-sm text-surface-400">No profile found.</p>
        <UiUButton class="mt-3" @click="navigateTo('/onboarding')"> Complete onboarding </UiUButton>
      </div>
    </UiUCard>

    <template v-else>
      <!-- Account -->
      <UiUCard>
        <div class="space-y-3">
          <h2 class="text-sm font-semibold text-surface-700">Account</h2>
          <div class="flex items-center gap-3">
            <UiUAvatar :name="user?.email ?? ''" size="lg" />
            <div>
              <p class="text-sm font-medium text-surface-900">{{ user?.email }}</p>
              <p class="text-xs text-surface-400">Member since {{ memberSince }}</p>
            </div>
          </div>
        </div>
      </UiUCard>

      <!-- Body stats -->
      <UiUCard>
        <div class="space-y-3">
          <h2 class="text-sm font-semibold text-surface-700">Body stats</h2>
          <div class="grid grid-cols-2 gap-3">
            <ProfileInfoItem label="Sex" :value="formatSex(profile.biologicalSex)" />
            <ProfileInfoItem label="Age" :value="`${profile.age} years`" />
            <ProfileInfoItem label="Height" :value="`${profile.heightCm} cm`" />
            <ProfileInfoItem label="Weight" :value="`${profile.weightKg} kg`" />
          </div>
        </div>
      </UiUCard>

      <!-- Goals -->
      <UiUCard>
        <div class="space-y-3">
          <h2 class="text-sm font-semibold text-surface-700">Goals</h2>
          <div class="grid grid-cols-2 gap-3">
            <ProfileInfoItem label="Goal" :value="formatGoal(profile.goalType)" />
            <ProfileInfoItem label="Activity" :value="formatActivity(profile.activityLevel)" />
            <ProfileInfoItem label="Daily target" :value="`${profile.dailyCalorieTarget} kcal`" />
            <ProfileInfoItem
              v-if="profile.targetWeightKg"
              label="Target weight"
              :value="`${profile.targetWeightKg} kg`"
            />
          </div>
        </div>
      </UiUCard>

      <!-- Logout -->
      <UiUButton variant="destructive" class="w-full" @click="handleLogout"> Log out </UiUButton>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { GoalType, ActivityLevel, BiologicalSex } from '#shared/types'

definePageMeta({
  layout: 'app',
  middleware: 'auth',
})

const authStore = useAuthStore()
const { logout } = useAuth()

const user = computed(() => authStore.user)
const profile = computed(() => authStore.profile)

const memberSince = computed(() => {
  if (!user.value?.createdAt) return ''
  const date = new Date(user.value.createdAt)
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
})

function formatSex(sex: BiologicalSex): string {
  return sex === 'male' ? 'Male' : 'Female'
}

function formatGoal(goal: GoalType): string {
  const labels: Record<GoalType, string> = {
    lose: 'Lose weight',
    maintain: 'Maintain weight',
    gain: 'Gain weight',
  }
  return labels[goal]
}

function formatActivity(level: ActivityLevel): string {
  const labels: Record<ActivityLevel, string> = {
    sedentary: 'Sedentary',
    light: 'Lightly active',
    moderate: 'Moderately active',
    active: 'Active',
    very_active: 'Very active',
  }
  return labels[level]
}

function handleLogout(): void {
  logout()
}
</script>
