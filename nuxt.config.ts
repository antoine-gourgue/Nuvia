// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: { enabled: true },

  modules: ['@pinia/nuxt', '@nuxt/eslint'],

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [import('@tailwindcss/vite').then((m) => m.default())],
  },

  typescript: {
    strict: true,
    typeCheck: false,
  },

  runtimeConfig: {
    databaseUrl: process.env.DATABASE_URL || 'postgresql://nuvia:nuvia@localhost:5432/nuvia',
  },

  eslint: {
    config: {
      standalone: true,
    },
  },
})
