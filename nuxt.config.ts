import { fileURLToPath } from 'node:url'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: { enabled: true },

  modules: ['@pinia/nuxt', '@nuxt/eslint'],

  css: ['~/assets/css/main.css'],

  alias: {
    '#shared': fileURLToPath(new URL('./shared', import.meta.url)),
  },

  vite: {
    plugins: [import('@tailwindcss/vite').then((m) => m.default())],
  },

  typescript: {
    strict: true,
    typeCheck: false,
  },

  runtimeConfig: {
    databaseUrl: process.env.DATABASE_URL || 'postgresql://nuvia:nuvia@localhost:5432/nuvia',
    jwtSecret: process.env.JWT_SECRET || 'dev-secret-change-in-production',
  },

  eslint: {
    config: {
      standalone: true,
    },
  },
})
