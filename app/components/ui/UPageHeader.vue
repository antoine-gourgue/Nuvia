<template>
  <div class="mb-6 flex items-start justify-between gap-4">
    <div class="flex flex-col gap-1">
      <h1 class="text-xl font-semibold tracking-tight text-text-strong">
        {{ props.title }}
      </h1>
      <p v-if="props.subtitle" class="text-sm text-text-muted">
        {{ props.subtitle }}
      </p>
    </div>
    <div v-if="$slots.action" class="shrink-0">
      <slot name="action" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  subtitle?: string
}

const props = withDefaults(defineProps<Props>(), {
  subtitle: undefined,
})
</script>
