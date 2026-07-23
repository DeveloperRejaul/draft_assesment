module.exports = {
  root: true,
  extends:['@react-native','plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint','jest' , 'import'],
  rules: {
    indent: ['error', 2], 
    "@typescript-eslint/no-explicit-any":0,
    "@typescript-eslint/ban-ts-comment":0,
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
        disallowTypeAnnotations: false,
        fixStyle: 'inline-type-imports',
      },
    ],
    'import/order': [
      'error',
      {
        groups: [
          'builtin',       // Node builtins like fs, path
          'external',      // 3rd party packages
          'internal',      // internal aliases like @/
          ['parent', 'sibling', 'index'], // relative imports
          'type',          // type imports separated at bottom
        ],
        pathGroups: [
          {
            pattern: 'react',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: 'react-native',
            group: 'external',
            position: 'before',
          },
          { pattern: '@src/**', group: 'internal' },
        ],
        pathGroupsExcludedImportTypes: ['react', 'react-native'],
        'newlines-between': 'never',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
  },
};