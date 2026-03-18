<template>
  <div class="flex flex-col gap-1.5">
    <label v-if="props.label" :for="inputId" class="text-sm font-medium text-text-default">
      {{ props.label }}
    </label>
    <input
      :id="inputId"
      :type="props.type"
      :value="props.modelValue"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :class="[
        'h-11 w-full rounded-xl border bg-surface-card px-3.5 text-sm text-text-strong transition-all duration-150',
        'placeholder:text-text-muted',
        'focus:outline-none focus:ring-2 focus:ring-offset-1',
        'disabled:cursor-not-allowed disabled:opacity-50',
        props.error
          ? 'border-error-border focus:ring-red-400'
          : 'border-border-soft focus:ring-primary-400',
      ]"
      @input="handleInput"
    />
    <p v-if="props.helper && !props.error" class="text-xs text-text-muted">
      {{ props.helper }}
    </p>
    <p v-if="props.error" class="text-xs text-error-text">
      {{ props.error }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: string | number
  label?: string
  placeholder?: string
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'search' | 'date'
  error?: string
  helper?: string
  disabled?: boolean
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  label: undefined,
  placeholder: undefined,
  type: 'text',
  error: undefined,
  helper: undefined,
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
