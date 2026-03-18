<template>
  <div
    :class="[
      'flex shrink-0 items-center justify-center rounded-full bg-primary-100 font-semibold text-primary-700',
      sizeClasses[props.size],
    ]"
  >
    <img
      v-if="props.src"
      :src="props.src"
      :alt="props.alt"
      class="h-full w-full rounded-full object-cover"
    />
    <span v-else>
      {{ initials }}
    </span>
  </div>
</template>

<script setup lang="ts">
type AvatarSize = 'sm' | 'md' | 'lg'

interface Props {
  src?: string
  alt?: string
  name?: string
  size?: AvatarSize
}

const props = withDefaults(defineProps<Props>(), {
  src: undefined,
  alt: undefined,
  name: undefined,
  size: 'md',
})

const sizeClasses: Record<AvatarSize, string> = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-base',
}

const initials = computed(() => {
  if (!props.name) return '?'
  return props.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
})
</script>
