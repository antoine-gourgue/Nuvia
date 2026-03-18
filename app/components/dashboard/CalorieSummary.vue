<template>
  <UiUCard>
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-sm font-semibold text-surface-700">Calories</h2>
        <UiUBadge v-if="isOverTarget" variant="warning">Over target</UiUBadge>
        <UiUBadge v-else variant="success">On track</UiUBadge>
      </div>

      <div class="flex items-center gap-6">
        <div class="relative flex h-28 w-28 shrink-0 items-center justify-center">
          <svg class="h-full w-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke-width="8"
              class="stroke-surface-100"
            />
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke-width="8"
              stroke-linecap="round"
              :stroke-dasharray="circumference"
              :stroke-dashoffset="dashOffset"
              :class="isOverTarget ? 'stroke-amber-500' : 'stroke-primary-500'"
              class="transition-all duration-700 ease-out"
            />
          </svg>
          <div class="absolute text-center">
            <p class="text-xl font-bold text-surface-900">{{ remaining }}</p>
            <p class="text-xs text-surface-500">left</p>
          </div>
        </div>

        <div class="flex flex-1 flex-col gap-2 text-sm">
          <div class="flex justify-between">
            <span class="text-surface-500">Target</span>
            <span class="font-medium text-surface-900">{{ props.target }} kcal</span>
          </div>
          <UiUDivider />
          <div class="flex justify-between">
            <span class="text-surface-500">Consumed</span>
            <span class="font-medium text-surface-900">{{ props.consumed }} kcal</span>
          </div>
          <UiUDivider />
          <div class="flex justify-between">
            <span class="text-surface-500">Remaining</span>
            <span
              class="font-semibold"
              :class="isOverTarget ? 'text-amber-600' : 'text-primary-600'"
            >
              {{ remaining }} kcal
            </span>
          </div>
        </div>
      </div>
    </div>
  </UiUCard>
</template>

<script setup lang="ts">
interface Props {
  target: number
  consumed: number
}

const props = defineProps<Props>()

const remaining = computed(() => Math.max(props.target - props.consumed, 0))
const isOverTarget = computed(() => props.consumed > props.target)

const circumference = 2 * Math.PI * 42
const dashOffset = computed(() => {
  const progress = Math.min(props.consumed / props.target, 1)
  return circumference * (1 - progress)
})
</script>
