import antfu from '@antfu/eslint-config'
import globals from 'globals'

export default antfu(
  {
    stylistic: false,
    typescript: true,
    vue: true,
    comments: false,
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.worker,
        ...globals.webextensions,
      },
    },
  },
  {
    ignores: [
      'node_modules',
      'dist',
      '**/*.js',
      '**/*.d.ts',
      'public',
      'build',
      'coverage',
      'tests',
      'cypress',
      'src/types/**/*',
    ],
  },
  {
    rules: {
      'no-console': 'off',
      'no-alert': 'off',
      'no-restricted-globals': 'warn',
      'import/order': 'warn',
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'warn',
      'vue/multi-word-component-names': 'warn',
      '@eslint-community/eslint-comments/no-unlimited-disable': 'off',
      'node/prefer-global/process': 'off',
      'node/prefer-global/buffer': 'off',
      'unicorn/prefer-node-protocol': 'off',
      'one-var': 'off',
      '@typescript-eslint/no-unused-vars': 'off'
    },
  }
)
