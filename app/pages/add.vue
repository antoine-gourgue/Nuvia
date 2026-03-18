<template>
  <div class="mx-auto w-full max-w-lg space-y-6 px-4 py-8">
    <div>
      <h1 class="text-2xl font-bold tracking-tight text-surface-900">Add meal</h1>
      <p class="mt-1 text-surface-500">Log what you ate.</p>
    </div>

    <form class="space-y-4" @submit.prevent="handleSubmit">
      <UiUInput
        v-model="form.name"
        label="Meal name"
        placeholder="e.g. Chicken salad"
        :error="errors.name"
      />

      <div>
        <p class="mb-2 text-sm font-medium text-surface-700">Meal type</p>
        <div class="grid grid-cols-4 gap-2">
          <button
            v-for="option in mealTypeOptions"
            :key="option.value"
            type="button"
            :class="[
              'rounded-xl border-2 py-2.5 text-center text-xs font-medium transition-all',
              form.mealType === option.value
                ? 'border-primary-500 bg-primary-50 text-primary-700'
                : 'border-surface-200 text-surface-600 hover:border-surface-300',
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

      <p v-if="errorMessage" class="text-sm text-red-600">
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
</template>

<script setup lang="ts">
import type { MealType } from '#shared/types'

definePageMeta({
  layout: 'app',
  middleware: 'auth',
})

const route = useRoute()
const router = useRouter()
const journalStore = useJournalStore()
const dashboardStore = useDashboardStore()

const todayString = new Date().toISOString().slice(0, 10)

const form = reactive({
  name: '',
  mealType: ((route.query.mealType as string) || 'lunch') as MealType,
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
    await router.push('/journal')
  } catch {
    errorMessage.value = 'Failed to save meal. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>
