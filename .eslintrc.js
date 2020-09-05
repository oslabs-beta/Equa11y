module.exports = {
  env: {
    node: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts'],
      },
    },
  },
  rules: {
    'import/extensions': 0,
    'object-curly-spacing': ['warn', 'always'],
    '@typescript-eslint/indent': 0,
    'no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        args: 'all',
        argsIgnorePattern: '^_',
      },
    ],
    'no-debugger': 0, // 1
    'no-console': 0, // ['error', { allow: ['warn', 'error'] }],
    'no-shadow': 0,
    'no-param-reassign': 0,
    'no-return-assign': 0,
    'no-constant-condition': ['error', { checkLoops: false }],
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
    'import/no-default-export': 1,
    'import/prefer-default-export': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
  },
};
