<template>
  <div class="flex gap-3">
    <div class="flex-1">
      <UiUButton variant="primary" class="w-full" size="lg" @click="emit('addMeal')">
        <PlusCircle :size="18" />
        Add meal
      </UiUButton>
    </div>
    <NuxtLink to="/journal" class="flex-1">
      <UiUButton variant="soft" class="w-full" size="lg">
        <BookOpen :size="18" />
        Journal
      </UiUButton>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { PlusCircle, BookOpen } from 'lucide-vue-next'

const emit = defineEmits<{ addMeal: [] }>()
</script>
