module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
  },
  // ecmaFeatures: {
  //   jsx: true,
  //   modules: true,
  //   classes: true
  // },
  extends: [
    'airbnb-base',
    'plugin:react/recommended'
  ],
  plugins: ['react'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
  },
};
