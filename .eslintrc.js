module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [],
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'no-unused-vars': ['warn'],
    'no-console': ['warn']
  },
  globals: {}
}