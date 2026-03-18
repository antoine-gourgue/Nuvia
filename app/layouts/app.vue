<template>
  <div class="min-h-screen bg-surface-50">
    <NavigationTopBar />

    <main class="pb-24 pt-6 lg:pt-24">
      <slot />
    </main>

    <NavigationBottomBar />
  </div>
</template>
