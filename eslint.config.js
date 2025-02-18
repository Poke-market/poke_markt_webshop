// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import perfectionist from 'eslint-plugin-perfectionist';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
  {
    ignores: ['**/*.{js,mjs}'],
  },
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true, // Improves performance over explicit project setting
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      'import/no-unresolved': 'error',
      'import/order': ['warn', { 'newlines-between': 'always' }],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      'prettier/prettier': 'error',
    },
  },
  perfectionist.configs['recommended-natural'],
  eslintConfigPrettier, // Always last to avoid conflicts
);
