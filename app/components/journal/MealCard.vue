<template>
  <div
    class="flex items-center justify-between rounded-xl border border-border-soft bg-surface-card p-3 transition-colors hover:bg-surface-soft"
  >
    <div class="min-w-0 flex-1">
      <p class="truncate font-medium text-text-strong">{{ props.meal.name }}</p>
      <p class="text-sm text-text-muted">
        {{ props.meal.calories }} kcal · {{ props.meal.servingGrams }}g
      </p>
    </div>
    <div class="flex items-center gap-3">
      <div class="hidden text-right text-xs text-text-muted sm:block">
        <p>P {{ Math.round(props.meal.protein) }}g</p>
        <p>C {{ Math.round(props.meal.carbs) }}g · F {{ Math.round(props.meal.fat) }}g</p>
      </div>
      <button
        aria-label="Delete meal"
        class="rounded-lg p-1.5 text-text-muted transition-colors hover:bg-error-bg hover:text-error-text"
        @click="emit('delete', props.meal.id)"
      >
        <Trash2 :size="16" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Trash2 } from 'lucide-vue-next'
import type { MealEntry } from '#shared/types'

interface Props {
  meal: MealEntry
}

const props = defineProps<Props>()
const emit = defineEmits<{ delete: [id: string] }>()
</script>
