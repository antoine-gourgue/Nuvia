<template>
  <div :class="classes">
    <slot />
  </div>
</template>

<script setup lang="ts">
type CardVariant = 'default' | 'soft' | 'featured'
type CardPadding = 'none' | 'sm' | 'md' | 'lg'

interface Props {
  variant?: CardVariant
  padding?: CardPadding
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  padding: 'md',
})

const variantClasses: Record<CardVariant, string> = {
  default: 'bg-surface-card border border-border-soft shadow-sm',
  soft: 'bg-surface-soft border border-border-soft',
  featured: 'bg-primary-50 border border-primary-200',
}

const paddingClasses: Record<CardPadding, string> = {
  none: '',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-6',
}

const classes = computed(() => [
  'rounded-2xl',
  variantClasses[props.variant],
  paddingClasses[props.padding],
])
</script>
