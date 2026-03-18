<template>
  <nav
    class="fixed bottom-4 left-1/2 z-50 flex w-[90%] max-w-md -translate-x-1/2 items-center justify-between rounded-full border border-surface-200 bg-white/80 px-6 py-3 shadow-xl backdrop-blur-md lg:hidden"
  >
    <NuxtLink
      v-for="item in navigationItems"
      :key="item.to"
      :to="item.to"
      class="bottom-link"
      :class="isActive(item.to) ? 'text-surface-900 scale-95' : 'text-surface-400'"
    >
      <component :is="item.icon" :size="20" class="mb-1 transition-transform duration-300" />
      <span class="text-xs transition-transform duration-300">{{ item.label }}</span>
    </NuxtLink>
  </nav>
</template>

<script setup lang="ts">
import { Home, BookOpen, PlusCircle, TrendingUp, User } from 'lucide-vue-next'

const route = useRoute()

const navigationItems = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/journal', label: 'Journal', icon: BookOpen },
  { to: '/add', label: 'Add', icon: PlusCircle },
  { to: '/progress', label: 'Progress', icon: TrendingUp },
  { to: '/profile', label: 'Profile', icon: User },
]

function isActive(path: string): boolean {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}
</script>

<style scoped>
@reference '~/assets/css/main.css';

.bottom-link {
  @apply flex flex-col items-center transition-all duration-300;
}
</style>
