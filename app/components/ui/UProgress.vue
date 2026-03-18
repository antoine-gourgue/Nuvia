<template>
  <div class="flex flex-col gap-1">
    <div v-if="props.label || props.showValue" class="flex items-center justify-between text-sm">
      <span v-if="props.label" class="font-medium text-surface-700">
        {{ props.label }}
      </span>
      <span v-if="props.showValue" class="text-surface-500">
        {{ Math.round(clampedPercentage) }}%
      </span>
    </div>
    <div class="overflow-hidden rounded-full bg-surface-100" :style="{ height: props.height }">
      <div
        class="h-full rounded-full transition-all duration-500 ease-out"
        :class="barColorClass"
        :style="{ width: `${clampedPercentage}%` }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
type ProgressColor = 'primary' | 'red' | 'amber' | 'blue'

interface Props {
  value: number
  max?: number
  label?: string
  showValue?: boolean
  color?: ProgressColor
  height?: string
}

const props = withDefaults(defineProps<Props>(), {
  max: 100,
  label: undefined,
  showValue: false,
  color: 'primary',
  height: '0.5rem',
})

const clampedPercentage = computed(() => {
  if (props.max <= 0) return 0
  return Math.min((props.value / props.max) * 100, 100)
})

const colorClasses: Record<ProgressColor, string> = {
  primary: 'bg-primary-500',
  red: 'bg-red-500',
  amber: 'bg-amber-500',
  blue: 'bg-blue-500',
}

const barColorClass = computed(() => colorClasses[props.color])
</script>
