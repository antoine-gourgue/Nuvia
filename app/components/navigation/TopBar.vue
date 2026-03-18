<template>
  <nav
    class="fixed top-6 left-1/2 z-50 hidden -translate-x-1/2 items-center rounded-full border border-surface-200 bg-white/80 px-6 py-3 shadow-md backdrop-blur-md lg:flex"
  >
    <div class="flex items-center space-x-2">
      <NuxtLink
        v-for="item in leftItems"
        :key="item.to"
        :to="item.to"
        class="nav-link"
        :class="{ 'active-link': isActive(item.to) }"
      >
        {{ item.label }}
      </NuxtLink>
    </div>

    <NuxtLink to="/" class="mx-8 flex items-center">
      <span class="text-lg font-bold tracking-tight text-surface-900">Nuvia</span>
    </NuxtLink>

    <div class="flex items-center space-x-2">
      <NuxtLink
        v-for="item in rightItems"
        :key="item.to"
        :to="item.to"
        class="nav-link"
        :class="{ 'active-link': isActive(item.to) }"
      >
        {{ item.label }}
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
const route = useRoute()

const leftItems = [
  { to: '/', label: 'Dashboard' },
  { to: '/journal', label: 'Journal' },
]

const rightItems = [
  { to: '/progress', label: 'Progress' },
  { to: '/profile', label: 'Profile' },
]

function isActive(path: string): boolean {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}
</script>

<style scoped>
@reference '~/assets/css/main.css';

.nav-link {
  @apply relative rounded-full px-4 py-2 text-sm text-surface-600 transition duration-300 hover:text-surface-900;
}

.nav-link::after {
  content: '';
  @apply absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-primary-600 transition-all duration-300;
}

.nav-link:hover::after,
.nav-link.active-link::after {
  @apply w-6;
}

.nav-link.active-link {
  @apply text-surface-900 font-medium;
}
</style>
