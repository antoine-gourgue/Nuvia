<template>
  <div
    :class="[props.orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px', 'bg-border-soft']"
  />
</template>

<script setup lang="ts">
interface Props {
  orientation?: 'horizontal' | 'vertical'
}

const props = withDefaults(defineProps<Props>(), {
  orientation: 'horizontal',
})
</script>
