<template>
  <UiUBottomSheet :open="props.open" size="lg" @close="emit('close')">
    <div class="space-y-5">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-lg font-semibold text-text-strong">Add meal</h2>
          <p class="mt-0.5 text-sm text-text-muted">Log what you ate.</p>
        </div>
        <button
          aria-label="Close"
          class="rounded-lg p-1.5 text-text-muted transition-colors hover:bg-surface-soft hover:text-text-default"
          @click="emit('close')"
        >
          <X :size="20" />
        </button>
      </div>

      <form class="space-y-4" @submit.prevent="handleSubmit">
        <UiUInput
          v-model="form.name"
          label="Meal name"
          placeholder="e.g. Chicken salad"
          :error="errors.name"
        />

        <div>
          <p class="mb-2 text-sm font-medium text-text-default">Meal type</p>
          <div class="grid grid-cols-4 gap-2">
            <button
              v-for="option in mealTypeOptions"
              :key="option.value"
              type="button"
              :class="[
                'rounded-xl border-2 py-2.5 text-center text-xs font-medium transition-all',
                form.mealType === option.value
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-border-soft text-text-secondary hover:border-primary-200',
              ]"
              @click="form.mealType = option.value"
            >
              {{ option.label }}
            </button>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <UiUInput
            v-model="form.calories"
            label="Calories"
            type="number"
            placeholder="0"
            :error="errors.calories"
          />
          <UiUInput
            v-model="form.servingGrams"
            label="Serving (g)"
            type="number"
            placeholder="100"
            :error="errors.servingGrams"
          />
        </div>

        <div class="grid grid-cols-3 gap-3">
          <UiUInput v-model="form.protein" label="Protein (g)" type="number" placeholder="0" />
          <UiUInput v-model="form.carbs" label="Carbs (g)" type="number" placeholder="0" />
          <UiUInput v-model="form.fat" label="Fat (g)" type="number" placeholder="0" />
        </div>

        <UiUInput v-model="form.entryDate" label="Date" type="date" />

        <p v-if="errorMessage" class="text-sm text-error-text">
          {{ errorMessage }}
        </p>

        <UiUButton
          type="submit"
          class="w-full"
          size="lg"
          :loading="isSubmitting"
          :disabled="isSubmitting"
        >
          Save meal
        </UiUButton>
      </form>
    </div>
  </UiUBottomSheet>
</template>

<script setup lang="ts">
import { X } from 'lucide-vue-next'
import type { MealType } from '#shared/types'

interface Props {
  open: boolean
  defaultMealType?: MealType
}

const props = withDefaults(defineProps<Props>(), {
  defaultMealType: 'lunch',
})

const emit = defineEmits<{
  close: []
  saved: []
}>()

const journalStore = useJournalStore()
const dashboardStore = useDashboardStore()

const todayString = new Date().toISOString().slice(0, 10)

const form = reactive({
  name: '',
  mealType: props.defaultMealType,
  calories: 0,
  protein: 0,
  carbs: 0,
  fat: 0,
  servingGrams: 100,
  entryDate: todayString,
})

const errors = reactive({ name: '', calories: '', servingGrams: '' })
const errorMessage = ref('')
const isSubmitting = ref(false)

const mealTypeOptions: { value: MealType; label: string }[] = [
  { value: 'breakfast', label: 'Breakfast' },
  { value: 'lunch', label: 'Lunch' },
  { value: 'dinner', label: 'Dinner' },
  { value: 'snack', label: 'Snack' },
]

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) {
      resetForm()
    }
  },
)

watch(
  () => props.defaultMealType,
  (mealType) => {
    form.mealType = mealType
  },
)

function resetForm() {
  form.name = ''
  form.mealType = props.defaultMealType
  form.calories = 0
  form.protein = 0
  form.carbs = 0
  form.fat = 0
  form.servingGrams = 100
  form.entryDate = new Date().toISOString().slice(0, 10)
  errors.name = ''
  errors.calories = ''
  errors.servingGrams = ''
  errorMessage.value = ''
}

async function handleSubmit() {
  errors.name = ''
  errors.calories = ''
  errors.servingGrams = ''
  errorMessage.value = ''

  if (!form.name.trim()) {
    errors.name = 'Name is required'
    return
  }
  if (form.calories < 0) {
    errors.calories = 'Must be 0 or more'
    return
  }
  if (form.servingGrams < 1) {
    errors.servingGrams = 'Must be at least 1g'
    return
  }

  isSubmitting.value = true
  try {
    await journalStore.addMeal({
      name: form.name.trim(),
      mealType: form.mealType,
      calories: Number(form.calories),
      protein: Number(form.protein),
      carbs: Number(form.carbs),
      fat: Number(form.fat),
      servingGrams: Number(form.servingGrams),
      entryDate: form.entryDate,
    })
    void dashboardStore.fetchSummary()
    emit('saved')
    emit('close')
  } catch {
    errorMessage.value = 'Failed to save meal. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>
