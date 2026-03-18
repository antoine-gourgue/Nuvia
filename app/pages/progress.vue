<template>
  <div class="mx-auto w-full max-w-2xl px-4 py-8">
    <h1 class="text-2xl font-bold tracking-tight text-surface-900">Progress</h1>
    <p class="mt-1 text-surface-500">Track your journey.</p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'app',
  middleware: 'auth',
})
</script>
