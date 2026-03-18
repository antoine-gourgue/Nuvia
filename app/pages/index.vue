<template>
  <div class="mx-auto w-full max-w-2xl space-y-8 px-4 py-8">
    <div>
      <h1 class="text-2xl font-bold tracking-tight text-surface-900">Good morning</h1>
      <p class="mt-1 text-surface-500">Your nutrition journey starts here.</p>
    </div>

    <UiUCard>
      <div class="space-y-3">
        <h2 class="text-sm font-semibold text-surface-700">Today's progress</h2>
        <UiUProgress
          :value="1450"
          :max="2200"
          label="Calories"
          show-value
          color="primary"
          height="0.625rem"
        />
        <div class="grid grid-cols-3 gap-3">
          <UiUProgress :value="85" :max="150" label="Protein" show-value color="blue" />
          <UiUProgress :value="180" :max="275" label="Carbs" show-value color="amber" />
          <UiUProgress :value="45" :max="70" label="Fat" show-value color="red" />
        </div>
      </div>
    </UiUCard>

    <UiUCard>
      <div class="space-y-3">
        <h2 class="text-sm font-semibold text-surface-700">Quick actions</h2>
        <div class="flex flex-wrap gap-2">
          <UiUButton variant="primary"> Add meal </UiUButton>
          <UiUButton variant="secondary"> Log weight </UiUButton>
          <UiUButton variant="ghost"> View history </UiUButton>
        </div>
      </div>
    </UiUCard>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'app',
  middleware: 'auth',
})
</script>
