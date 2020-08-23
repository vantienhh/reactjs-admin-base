module.exports = {
  env: {
    'es6': true,
    'browser': true,
  },
  // parser: 'babel-eslint',
  plugins: [
    'react',
    'prettier'
  ],
  extends: [
    'prettier',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended'
  ],
  settings: {
    'import/resolver': {
      'node': {
        'paths': [
          'src',
        ],
        'extensions': [
          '.js',
          '.jsx',
        ],
      },
    },
  },
  rules: {
    'arrow-body-style': 'off',
    'comma-dangle': 'off',
    'import/no-unresolved': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/control-has-associated-label': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'no-console': 'off',
    'no-param-reassign': 'off',
    'no-plusplus': 'off',
    'react/forbid-prop-types': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
    "react-hooks/rules-of-hooks": "error", // Kiểm tra rule của Hook
    "react-hooks/exhaustive-deps": "warn" // Kiểm tra effect dependency
  },
}
