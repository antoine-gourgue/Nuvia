<template>
  <div class="grid grid-cols-3 gap-3">
    <UiUCard padding="sm">
      <div class="text-center">
        <p class="text-xs text-surface-500">Current</p>
        <p class="text-lg font-bold text-surface-900">
          {{ props.currentWeight ? `${props.currentWeight} kg` : '—' }}
        </p>
      </div>
    </UiUCard>

    <UiUCard padding="sm">
      <div class="text-center">
        <p class="text-xs text-surface-500">Target</p>
        <p class="text-lg font-bold text-surface-900">
          {{ props.targetWeight ? `${props.targetWeight} kg` : '—' }}
        </p>
      </div>
    </UiUCard>

    <UiUCard padding="sm">
      <div class="text-center">
        <p class="text-xs text-surface-500">Change</p>
        <p class="text-lg font-bold" :class="changeColor">
          {{ changeLabel }}
        </p>
      </div>
    </UiUCard>
  </div>
</template>

<script setup lang="ts">
interface Props {
  currentWeight: number | null
  targetWeight: number | null
  change: number | null
}

const props = defineProps<Props>()

const changeLabel = computed(() => {
  if (props.change === null) return '—'
  const sign = props.change > 0 ? '+' : ''
  return `${sign}${props.change.toFixed(1)} kg`
})

const changeColor = computed(() => {
  if (props.change === null) return 'text-surface-900'
  if (props.change === 0) return 'text-surface-500'
  return props.change < 0 ? 'text-primary-600' : 'text-amber-600'
})
</script>
