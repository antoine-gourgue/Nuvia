<template>
  <div class="rounded-lg bg-surface-50 px-3 py-2">
    <p class="text-xs text-surface-500">{{ label }}</p>
    <p class="text-sm font-medium text-surface-900">{{ value }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  label: string
  value: string
}

defineProps<Props>()
</script>
