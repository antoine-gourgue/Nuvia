<template>
  <div
    :class="[
      'animate-pulse rounded-lg bg-surface-200',
      props.rounded ? 'rounded-full' : 'rounded-lg',
    ]"
    :style="{ width: props.width, height: props.height }"
  />
</template>

<script setup lang="ts">
interface Props {
  width?: string
  height?: string
  rounded?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  height: '1rem',
  rounded: false,
})
</script>
