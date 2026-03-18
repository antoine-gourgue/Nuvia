<template>
  <span :class="classes">
    <slot />
  </span>
</template>

<script setup lang="ts">
type BadgeVariant =
  | 'default'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'coral'
  | 'lime'
  | 'peach'
type BadgeSize = 'sm' | 'md'

interface Props {
  variant?: BadgeVariant
  size?: BadgeSize
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'sm',
})

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-surface-soft text-text-secondary border border-border-soft',
  success: 'bg-success-bg text-success-text border border-success-border',
  warning: 'bg-warning-bg text-warning-text border border-warning-border',
  error: 'bg-error-bg text-error-text border border-error-border',
  info: 'bg-info-bg text-info-text border border-info-border',
  coral: 'bg-coral-50 text-coral-700 border border-coral-200',
  lime: 'bg-lime-50 text-lime-700 border border-lime-200',
  peach: 'bg-peach-50 text-peach-700 border border-peach-200',
}

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-xs',
}

const classes = computed(() => [
  'inline-flex items-center rounded-full font-medium',
  variantClasses[props.variant],
  sizeClasses[props.size],
])
</script>
