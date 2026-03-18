<template>
  <div class="mb-3 flex items-center justify-between">
    <h2 class="text-sm font-semibold text-text-strong">
      {{ props.title }}
    </h2>
    <slot name="action" />
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
}

const props = defineProps<Props>()
</script>
