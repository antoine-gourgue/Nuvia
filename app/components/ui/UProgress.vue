<template>
  <div class="flex flex-col gap-1.5">
    <div v-if="props.label || props.showValue" class="flex items-center justify-between">
      <span v-if="props.label" class="text-xs font-medium text-text-secondary">
        {{ props.label }}
      </span>
      <span v-if="props.showValue" class="text-xs font-medium text-text-muted">
        {{ Math.round(clampedPercentage) }}%
      </span>
    </div>
    <div class="overflow-hidden rounded-full bg-surface-200" :style="{ height: props.height }">
      <div
        class="h-full rounded-full transition-all duration-500 ease-out"
        :class="barColorClass"
        :style="{ width: `${clampedPercentage}%` }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
type ProgressColor = 'primary' | 'coral' | 'lime' | 'amber' | 'blue'

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
  height: '0.375rem',
})

const clampedPercentage = computed(() => {
  if (props.max <= 0) return 0
  return Math.min((props.value / props.max) * 100, 100)
})

const colorClasses: Record<ProgressColor, string> = {
  primary: 'bg-primary-500',
  coral: 'bg-coral-500',
  lime: 'bg-lime-500',
  amber: 'bg-amber-500',
  blue: 'bg-blue-500',
}

const barColorClass = computed(() => colorClasses[props.color])
</script>
