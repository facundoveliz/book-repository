module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  root: true,
  extends: [
    'plugin:react/recommended',
    'airbnb-typescript',
    'plugin:@next/next/recommended',
    'plugin:import/recommended',
  ],
  // ignorePatterns: [".eslintrc.js"],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    // disable error jsx not allowed in tsx
    'react/jsx-filename-extension': [0],
    // disable extensions in imports because ts conflict
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
};
