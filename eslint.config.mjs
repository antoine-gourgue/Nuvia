import withNuxt from './.nuxt/eslint.config.mjs'
import prettier from 'eslint-plugin-prettier/recommended'

export default withNuxt(prettier).append({
  rules: {
    'no-console': 'warn',
  },
})
