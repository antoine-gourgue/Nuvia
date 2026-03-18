<template>
  <div class="space-y-2">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <component :is="icon" :size="18" class="text-text-muted" />
        <h3 class="text-sm font-semibold text-text-strong">{{ label }}</h3>
      </div>
      <span class="text-xs font-medium text-text-muted">{{ totalCalories }} kcal</span>
    </div>

    <div v-if="props.meals.length > 0" class="space-y-1.5">
      <JournalMealCard
        v-for="meal in props.meals"
        :key="meal.id"
        :meal="meal"
        @delete="emit('delete', $event)"
      />
    </div>

    <p v-else class="py-3 text-center text-sm text-text-muted">No meals logged yet.</p>

    <NuxtLink :to="`/add?mealType=${props.mealType}`">
      <button
        class="flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-border-soft py-2.5 text-sm text-text-muted transition-colors hover:border-primary-300 hover:text-primary-600"
      >
        <Plus :size="16" />
        Add {{ label.toLowerCase() }}
      </button>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { Plus, Coffee, UtensilsCrossed, Soup, Cookie } from 'lucide-vue-next'
import type { MealEntry, MealType } from '#shared/types'

interface Props {
  mealType: MealType
  meals: MealEntry[]
}

const props = defineProps<Props>()
const emit = defineEmits<{ delete: [id: string] }>()

const labelMap: Record<MealType, string> = {
  breakfast: 'Breakfast',
  lunch: 'Lunch',
  dinner: 'Dinner',
  snack: 'Snack',
}

const iconMap: Record<MealType, typeof Coffee> = {
  breakfast: Coffee,
  lunch: UtensilsCrossed,
  dinner: Soup,
  snack: Cookie,
}

const label = computed(() => labelMap[props.mealType])
const icon = computed(() => iconMap[props.mealType])
const totalCalories = computed(() => props.meals.reduce((sum, m) => sum + m.calories, 0))
</script>
