<template>
  <div class="flex gap-3">
    <NuxtLink to="/add" class="flex-1">
      <UiUButton variant="primary" class="w-full" size="lg">
        <PlusCircle :size="18" />
        Add meal
      </UiUButton>
    </NuxtLink>
    <NuxtLink to="/journal" class="flex-1">
      <UiUButton variant="secondary" class="w-full" size="lg">
        <BookOpen :size="18" />
        Journal
      </UiUButton>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { PlusCircle, BookOpen } from 'lucide-vue-next'
</script>
