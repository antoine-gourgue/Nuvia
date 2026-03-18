<template>
  <div class="min-h-screen bg-background">
    <NavigationTopBar />

    <main class="pb-28 pt-6 lg:pt-24">
      <slot />
    </main>

    <NavigationBottomBar />
  </div>
</template>
