<template>
  <div class="space-y-6">
    <div class="space-y-2">
      <UiUSkeleton width="10rem" height="1.75rem" />
      <UiUSkeleton width="16rem" height="1rem" />
    </div>
    <UiUCard>
      <div class="flex items-center gap-6">
        <UiUSkeleton width="7rem" height="7rem" rounded />
        <div class="flex flex-1 flex-col gap-3">
          <UiUSkeleton height="0.875rem" />
          <UiUSkeleton height="0.875rem" />
          <UiUSkeleton height="0.875rem" />
        </div>
      </div>
    </UiUCard>
    <UiUCard>
      <div class="grid grid-cols-3 gap-4">
        <UiUSkeleton width="3.5rem" height="3.5rem" rounded />
        <UiUSkeleton width="3.5rem" height="3.5rem" rounded />
        <UiUSkeleton width="3.5rem" height="3.5rem" rounded />
      </div>
    </UiUCard>
  </div>
</template>
