<template>
  <div>
    <div class="mb-6 flex items-start justify-between gap-4">
      <div class="flex flex-col gap-2">
        <UiUSkeleton width="6rem" height="1.5rem" />
        <UiUSkeleton width="12rem" height="1rem" />
      </div>
      <UiUSkeleton width="9rem" height="2.5rem" />
    </div>
    <div class="space-y-5">
      <div v-for="i in 4" :key="i" class="space-y-2">
        <div class="flex items-center justify-between">
          <UiUSkeleton width="5rem" height="0.875rem" />
          <UiUSkeleton width="3rem" height="0.75rem" />
        </div>
        <UiUSkeleton height="3.5rem" />
        <UiUSkeleton height="3.5rem" />
      </div>
    </div>
  </div>
</template>
