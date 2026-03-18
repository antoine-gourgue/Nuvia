<template>
  <UiUCard v-if="message">
    <div class="flex items-start gap-3">
      <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full" :class="iconBg">
        <component :is="icon" :size="20" :class="iconColor" />
      </div>
      <div>
        <p class="text-sm font-medium text-surface-900">{{ title }}</p>
        <p class="mt-0.5 text-sm text-surface-500">{{ message }}</p>
      </div>
    </div>
  </UiUCard>
</template>

<script setup lang="ts">
import { TrendingDown, TrendingUp, Minus, Trophy } from 'lucide-vue-next'
import type { GoalType } from '#shared/types'

interface Props {
  change: number | null
  goalType: GoalType | null
  targetWeight: number | null
  currentWeight: number | null
}

const props = defineProps<Props>()

const isOnTrack = computed(() => {
  if (props.change === null || !props.goalType) return null
  if (props.goalType === 'lose') return props.change < 0
  if (props.goalType === 'gain') return props.change > 0
  return Math.abs(props.change) < 0.5
})

const reachedTarget = computed(() => {
  if (!props.currentWeight || !props.targetWeight) return false
  return Math.abs(props.currentWeight - props.targetWeight) < 0.5
})

const title = computed(() => {
  if (reachedTarget.value) return 'Target reached!'
  if (isOnTrack.value === null) return ''
  return isOnTrack.value ? 'Great progress!' : 'Stay consistent'
})

const message = computed(() => {
  if (reachedTarget.value) return "You've reached your target weight. Amazing work!"
  if (props.change === null) return ''
  if (isOnTrack.value) return "You're moving in the right direction. Keep it up!"
  if (props.goalType === 'lose')
    return "Weight went up slightly — that's normal. Stay focused on your routine."
  if (props.goalType === 'gain')
    return "Weight dipped a bit. Make sure you're eating enough to fuel your goals."
  return "Small fluctuations are normal. You're doing well!"
})

const icon = computed(() => {
  if (reachedTarget.value) return Trophy
  if (props.change === null) return Minus
  return props.change < 0 ? TrendingDown : props.change > 0 ? TrendingUp : Minus
})

const iconBg = computed(() => {
  if (reachedTarget.value) return 'bg-primary-100'
  if (isOnTrack.value) return 'bg-primary-100'
  return 'bg-amber-100'
})

const iconColor = computed(() => {
  if (reachedTarget.value) return 'text-primary-600'
  if (isOnTrack.value) return 'text-primary-600'
  return 'text-amber-600'
})
</script>
