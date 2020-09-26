module.exports = {
  root: true,
  env: {
    es6: true,
    browser: true,
    node: true,
    jest: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: [
      'tsconfig.json'
    ],
    ecmaFeatures: {
      jsx: true,
      modules: true,
      experimentalObjectRestSpread: true
    }
  },
  plugins: ['react', '@typescript-eslint', 'security'],
  extends: [
    'prettier',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',

    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',

    'plugin:security/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  settings: {
    react: {
      version: 'detect'
    },
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  },
  rules: {
    semi: 'off',
    '@typescript-eslint/semi': ['error'],
    'no-extra-semi': 'off',
    '@typescript-eslint/no-extra-semi': ['error'],

    indent: 'off',
    '@typescript-eslint/indent': ['error', 2],

    'keyword-spacing': 'off',
    '@typescript-eslint/keyword-spacing': ['error', { before: true, after: true }],

    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'class', // EX: class ProductService {}
        format: ['PascalCase']
      },
      {
        selector: 'interface', // EX: interface IProductService {}
        format: ['PascalCase']
      },
      {
        selector: 'parameter',
        format: ['strictCamelCase']
      },
      {
        selector: 'variable',
        modifiers: ['const'],
        format: ['strictCamelCase', 'UPPER_CASE', 'PascalCase']
      },
      {
        selector: 'function',
        format: ['strictCamelCase', 'PascalCase']
      }
    ],

    '@typescript-eslint/no-for-in-array': 'error',
    '@typescript-eslint/no-implied-eval': 'error',
    '@typescript-eslint/unified-signatures': 'error',
    '@typescript-eslint/ban-ts-comment': 'warn',

    // '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/no-misused-promises': ['error', { checksConditionals: false }],

    'no-return-await': 'off',
    '@typescript-eslint/return-await': 'error',

    '@typescript-eslint/interface-name-prefix': 'off',

    'arrow-body-style': 'off',
    'comma-dangle': 'off',
    'import/no-unresolved': 'off',
    'no-console': 'off',
    'no-param-reassign': 'off',
    'no-plusplus': 'off',
    'no-unused-vars': 'off',

    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/control-has-associated-label': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',

    'react/forbid-prop-types': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
    'react-hooks/rules-of-hooks': 'error', // Kiểm tra rule của Hook
    'react-hooks/exhaustive-deps': 'warn' // Kiểm tra effect dependency
  }
};
