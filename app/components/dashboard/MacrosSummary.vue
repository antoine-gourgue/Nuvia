<template>
  <UiUCard>
    <div class="space-y-3">
      <h2 class="text-sm font-semibold text-surface-700">Macros</h2>
      <div class="grid grid-cols-3 gap-4">
        <div v-for="macro in macros" :key="macro.label" class="text-center">
          <div class="relative mx-auto mb-2 h-14 w-14">
            <svg class="h-full w-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke-width="10"
                class="stroke-surface-100"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke-width="10"
                stroke-linecap="round"
                :stroke-dasharray="circumference"
                :stroke-dashoffset="getOffset(macro.value, macro.target)"
                :class="macro.colorClass"
                class="transition-all duration-700 ease-out"
              />
            </svg>
            <span
              class="absolute inset-0 flex items-center justify-center text-xs font-bold text-surface-900"
            >
              {{ macro.value }}g
            </span>
          </div>
          <p class="text-xs font-medium text-surface-700">{{ macro.label }}</p>
          <p class="text-xs text-surface-400">/ {{ macro.target }}g</p>
        </div>
      </div>
    </div>
  </UiUCard>
</template>

<script setup lang="ts">
interface Props {
  protein: number
  carbs: number
  fat: number
  proteinTarget: number
  carbsTarget: number
  fatTarget: number
}

const props = defineProps<Props>()

const circumference = 2 * Math.PI * 42

function getOffset(value: number, target: number): number {
  if (target <= 0) return circumference
  const progress = Math.min(value / target, 1)
  return circumference * (1 - progress)
}

const macros = computed(() => [
  {
    label: 'Protein',
    value: Math.round(props.protein),
    target: props.proteinTarget,
    colorClass: 'stroke-blue-500',
  },
  {
    label: 'Carbs',
    value: Math.round(props.carbs),
    target: props.carbsTarget,
    colorClass: 'stroke-amber-500',
  },
  {
    label: 'Fat',
    value: Math.round(props.fat),
    target: props.fatTarget,
    colorClass: 'stroke-red-500',
  },
])
</script>
