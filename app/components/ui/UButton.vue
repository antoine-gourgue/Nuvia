<template>
  <button :type="props.type" :disabled="props.disabled || props.loading" :class="classes">
    <span
      v-if="props.loading"
      class="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
    />
    <slot />
  </button>
</template>

<script setup lang="ts">
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'soft' | 'destructive'
type ButtonSize = 'sm' | 'md' | 'lg'

interface Props {
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  loading?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  type: 'button',
})

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 focus-visible:ring-primary-500',
  secondary:
    'bg-surface-soft text-text-default border border-border-soft hover:bg-surface-200 active:bg-surface-300 focus-visible:ring-primary-400',
  ghost:
    'bg-transparent text-text-secondary hover:bg-surface-soft active:bg-surface-200 focus-visible:ring-primary-400',
  soft: 'bg-primary-50 text-primary-700 hover:bg-primary-100 active:bg-primary-200 focus-visible:ring-primary-400',
  destructive:
    'bg-error-bg text-error-text hover:bg-red-100 active:bg-red-200 focus-visible:ring-red-400',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-sm rounded-lg gap-1.5',
  md: 'h-10 px-4 text-sm rounded-xl gap-2',
  lg: 'h-12 px-6 text-base rounded-xl gap-2.5',
}

const classes = computed(() => [
  'inline-flex items-center justify-center font-medium transition-all duration-150',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
  'disabled:pointer-events-none disabled:opacity-50',
  variantClasses[props.variant],
  sizeClasses[props.size],
])
</script>
