// my commands:
// npx eslint .     => to run on whole project
// npx eslint --fix .     => to fix issues
// npx eslint src/**/*.ts   => to lint a specific file
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import perfectionist from 'eslint-plugin-perfectionist';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  tseslint.configs.recommendedTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  perfectionist.configs['recommended-natural'],
  eslintConfigPrettier, // keep last
  {
    ignores: ['**/*.{js,mjs,ejs}'], // Ignore files
    languageOptions: {
      parser: tsParser, // very important: eslint needs to know i'm using typescript
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
      sourceType: 'module',
      ecmaVersion: 'latest', // Use the latest ECMAScript features
    },
    rules: {
      'prettier/prettier': 'error',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      'import/no-unresolved': 'error', // unresolved imports as errors
      'import/order': [
        'warn',
        {
          'newlines-between': 'always',
        },
      ],
      'react/jsx-uses-react': 'off', // +17 not required
      'react/prop-types': 'off',
      'react-hooks/rules-of-hooks': 'error', // hooks rules = error
      'react-hooks/exhaustive-deps': 'warn', // when I have deps in useEffect they should be in my array
      'jsx-a11y/anchor-is-valid': 'warn', // href for a tags
    },
    settings: {
      react: { version: 'detect' },
    },
  },
];
