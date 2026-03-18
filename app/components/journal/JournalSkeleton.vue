<template>
  <div class="space-y-6">
    <div class="space-y-2">
      <UiUSkeleton width="8rem" height="1.75rem" />
      <UiUSkeleton width="12rem" height="1rem" />
    </div>
    <div v-for="i in 4" :key="i" class="space-y-2">
      <UiUSkeleton width="6rem" height="1rem" />
      <UiUSkeleton height="3.5rem" />
      <UiUSkeleton height="3.5rem" />
    </div>
  </div>
</template>
