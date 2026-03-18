<template>
  <UiUCard>
    <form class="space-y-3" @submit.prevent="handleSubmit">
      <h2 class="text-sm font-semibold text-surface-700">Log your weight</h2>

      <div class="grid grid-cols-2 gap-3">
        <UiUInput
          v-model="weightKg"
          label="Weight (kg)"
          type="number"
          placeholder="70.0"
          :error="error"
        />
        <UiUInput v-model="entryDate" label="Date" type="date" />
      </div>

      <UiUInput v-model="note" label="Note (optional)" placeholder="e.g. After morning run" />

      <UiUButton type="submit" class="w-full" :loading="isSubmitting" :disabled="isSubmitting">
        Save
      </UiUButton>
    </form>
  </UiUCard>
</template>

<script setup lang="ts">
const emit = defineEmits<{ saved: [] }>()

const weightStore = useWeightStore()

const todayString = new Date().toISOString().slice(0, 10)
const weightKg = ref<number | string>('')
const entryDate = ref(todayString)
const note = ref('')
const error = ref('')
const isSubmitting = ref(false)

async function handleSubmit() {
  error.value = ''
  const numWeight = Number(weightKg.value)

  if (!numWeight || numWeight < 20 || numWeight > 500) {
    error.value = 'Enter a valid weight (20–500 kg)'
    return
  }

  isSubmitting.value = true
  try {
    await weightStore.logWeight(numWeight, entryDate.value, note.value || undefined)
    weightKg.value = ''
    note.value = ''
    emit('saved')
  } catch {
    error.value = 'Failed to save. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>
