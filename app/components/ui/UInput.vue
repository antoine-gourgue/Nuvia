<template>
  <div class="flex flex-col gap-1.5">
    <label v-if="props.label" :for="inputId" class="text-sm font-medium text-surface-700">
      {{ props.label }}
    </label>
    <input
      :id="inputId"
      :type="props.type"
      :value="props.modelValue"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :class="[
        'h-10 w-full rounded-lg border bg-white px-3 text-sm text-surface-900 transition-colors duration-150',
        'placeholder:text-surface-400',
        'focus:outline-none focus:ring-2 focus:ring-offset-1',
        'disabled:cursor-not-allowed disabled:opacity-50',
        props.error
          ? 'border-red-400 focus:ring-red-500'
          : 'border-surface-200 focus:ring-primary-500',
      ]"
      @input="handleInput"
    />
    <p v-if="props.error" class="text-xs text-red-600">
      {{ props.error }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: string | number
  label?: string
  placeholder?: string
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'search'
  error?: string
  disabled?: boolean
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  label: undefined,
  placeholder: undefined,
  type: 'text',
  error: undefined,
  disabled: false,
  id: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
}>()

const inputId = computed(() => props.id ?? `input-${Math.random().toString(36).slice(2, 9)}`)

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  const value = props.type === 'number' ? Number(target.value) : target.value
  emit('update:modelValue', value)
}
</script>
