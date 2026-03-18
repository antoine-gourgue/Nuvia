<template>
  <UCard :padding="'md'">
    <div class="flex flex-col gap-1">
      <span class="text-xs font-medium text-text-muted">
        {{ props.label }}
      </span>
      <div class="flex items-baseline gap-1.5">
        <span class="text-2xl font-semibold tracking-tight text-text-strong">
          {{ props.value }}
        </span>
        <span v-if="props.unit" class="text-sm text-text-muted">
          {{ props.unit }}
        </span>
      </div>
      <div v-if="props.trend" class="mt-0.5 flex items-center gap-1">
        <UBadge :variant="trendVariant" size="sm">
          {{ props.trend }}
        </UBadge>
      </div>
      <div v-if="$slots.footer" class="mt-2">
        <slot name="footer" />
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
type BadgeVariant =
  | 'default'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'coral'
  | 'lime'
  | 'peach'
type TrendDirection = 'up' | 'down' | 'neutral'

interface Props {
  label: string
  value: string | number
  unit?: string
  trend?: string
  trendDirection?: TrendDirection
}

const props = withDefaults(defineProps<Props>(), {
  unit: undefined,
  trend: undefined,
  trendDirection: 'neutral',
})

const trendVariantMap: Record<TrendDirection, BadgeVariant> = {
  up: 'success',
  down: 'error',
  neutral: 'default',
}

const trendVariant = computed(() => trendVariantMap[props.trendDirection])
</script>
