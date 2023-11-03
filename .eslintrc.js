module.exports = {
    extends: 'react-app',
    overrides: [
      {
        files: ['**/*.ts', '**/*.tsx'],
        parser: '@typescript-eslint/parser',
        parserOptions: {
          ecmaVersion: 2018,
          sourceType: 'module',
          ecmaFeatures: {
            jsx: true,
          },
          warnOnUnsupportedTypeScriptVersion: true,
        },
        plugins: ['@typescript-eslint'],
        rules: {
          'default-case': 'off',
          'no-dupe-class-members': 'off',
          '@typescript-eslint/no-angle-bracket-type-assertion': 'warn',
          'no-array-constructor': 'off',
          '@typescript-eslint/no-array-constructor': 'warn',
          '@typescript-eslint/no-namespace': 'error',
          'no-unused-vars': 'off',
          '@typescript-eslint/no-unused-vars': ['warn', { args: 'none', ignoreRestSiblings: true }],
          'no-useless-constructor': 'off',
          '@typescript-eslint/no-useless-constructor': 'warn',
        },
      },
    ],
  };
  