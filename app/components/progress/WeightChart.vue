<template>
  <UiUCard>
    <div class="space-y-3">
      <h2 class="text-sm font-semibold text-surface-700">Weight trend</h2>

      <div v-if="points.length < 2" class="flex h-40 items-center justify-center">
        <p class="text-sm text-surface-400">Log at least 2 entries to see your trend.</p>
      </div>

      <svg v-else :viewBox="`0 0 ${width} ${height}`" class="w-full" preserveAspectRatio="none">
        <!-- Grid lines -->
        <line
          v-for="i in 4"
          :key="'grid-' + i"
          :x1="padding"
          :x2="width - padding"
          :y1="padding + ((height - padding * 2) / 4) * i"
          :y2="padding + ((height - padding * 2) / 4) * i"
          stroke-width="1"
          class="stroke-surface-100"
        />

        <!-- Area fill -->
        <path :d="areaPath" class="fill-primary-500/10" />

        <!-- Line -->
        <path
          :d="linePath"
          fill="none"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="stroke-primary-500"
        />

        <!-- Points -->
        <circle
          v-for="(point, index) in points"
          :key="'point-' + index"
          :cx="point.x"
          :cy="point.y"
          r="4"
          class="fill-primary-500 stroke-white"
          stroke-width="2"
        />

        <!-- Y-axis labels -->
        <text
          :x="padding - 4"
          :y="padding + 4"
          text-anchor="end"
          class="fill-surface-400 text-[10px]"
        >
          {{ maxWeight }}
        </text>
        <text
          :x="padding - 4"
          :y="height - padding + 4"
          text-anchor="end"
          class="fill-surface-400 text-[10px]"
        >
          {{ minWeight }}
        </text>
      </svg>
    </div>
  </UiUCard>
</template>

<script setup lang="ts">
import type { WeightEntry } from '../../../shared/types'

interface Props {
  entries: WeightEntry[]
}

const props = defineProps<Props>()

const width = 400
const height = 180
const padding = 40

const sortedEntries = computed(() =>
  [...props.entries].sort(
    (a, b) => new Date(a.entryDate).getTime() - new Date(b.entryDate).getTime(),
  ),
)

const minWeight = computed(() => {
  const weights = sortedEntries.value.map((e) => e.weightKg)
  return Math.floor(Math.min(...weights) - 1)
})

const maxWeight = computed(() => {
  const weights = sortedEntries.value.map((e) => e.weightKg)
  return Math.ceil(Math.max(...weights) + 1)
})

const points = computed(() => {
  const entries = sortedEntries.value
  if (entries.length === 0) return []

  const chartWidth = width - padding * 2
  const chartHeight = height - padding * 2
  const range = maxWeight.value - minWeight.value || 1

  return entries.map((entry, i) => ({
    x: padding + (i / Math.max(entries.length - 1, 1)) * chartWidth,
    y: padding + (1 - (entry.weightKg - minWeight.value) / range) * chartHeight,
  }))
})

const linePath = computed(() => {
  if (points.value.length === 0) return ''
  return points.value.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
})

const areaPath = computed(() => {
  if (points.value.length === 0) return ''
  const first = points.value[0]
  const last = points.value[points.value.length - 1]
  const bottom = height - padding
  return `M ${first.x} ${bottom} ${linePath.value} L ${last.x} ${bottom} Z`
})
</script>
