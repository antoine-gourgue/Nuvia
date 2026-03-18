<template>
  <div class="space-y-5">
    <div class="mb-6 space-y-2">
      <UiUSkeleton width="10rem" height="1.75rem" />
      <UiUSkeleton width="16rem" height="1rem" />
    </div>
    <UiUCard>
      <div class="space-y-4">
        <UiUSkeleton width="4rem" height="0.875rem" />
        <div class="flex items-center gap-6">
          <UiUSkeleton width="7rem" height="7rem" rounded />
          <div class="flex flex-1 flex-col gap-3">
            <UiUSkeleton height="0.875rem" />
            <UiUSkeleton height="0.875rem" />
            <UiUSkeleton height="0.875rem" />
          </div>
        </div>
      </div>
    </UiUCard>
    <UiUCard>
      <div class="space-y-4">
        <UiUSkeleton width="4rem" height="0.875rem" />
        <div class="grid grid-cols-3 gap-4">
          <div v-for="i in 3" :key="i" class="flex flex-col items-center gap-2">
            <UiUSkeleton width="3.5rem" height="3.5rem" rounded />
            <UiUSkeleton width="3rem" height="0.75rem" />
          </div>
        </div>
      </div>
    </UiUCard>
    <div class="flex gap-3">
      <UiUSkeleton class="flex-1" height="2.75rem" />
      <UiUSkeleton class="flex-1" height="2.75rem" />
    </div>
  </div>
</template>
