<template>
  <div class="flex flex-col items-center justify-center px-6 py-12 text-center">
    <div
      v-if="props.icon"
      class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-surface-soft"
    >
      <span class="text-2xl">{{ props.icon }}</span>
    </div>
    <h3 class="text-base font-semibold text-text-strong">
      {{ props.title }}
    </h3>
    <p v-if="props.description" class="mt-1.5 max-w-xs text-sm text-text-muted">
      {{ props.description }}
    </p>
    <div v-if="$slots.action" class="mt-5">
      <slot name="action" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  description?: string
  icon?: string
}

const props = withDefaults(defineProps<Props>(), {
  description: undefined,
  icon: undefined,
})
</script>
