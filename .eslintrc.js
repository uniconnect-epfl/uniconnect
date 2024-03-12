module.exports = {
  env: {
    es2021: true,
    node: true,
    'react-native/react-native': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react-native/all',
    'plugin:yml/standard'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'react-hooks',
    'react-native',
    'yml'
  ],
  rules: {
    // Custom rules here. Example:
    'react/react-in-jsx-scope': 'off', // Not needed with React 17+
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    // Adjust rules based on your project needs
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect the React version
    },
  },
};
