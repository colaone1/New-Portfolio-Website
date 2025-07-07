module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    serviceworker: true,
  },
  extends: [
    'eslint:recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-console': 'warn',
    'no-unused-vars': 'warn',
    'no-undef': 'error',
  },
  overrides: [
    {
      // Service Worker files
      files: ['sw.js'],
      env: {
        serviceworker: true,
      },
      globals: {
        self: 'readonly',
        caches: 'readonly',
        fetch: 'readonly',
      },
    },
    {
      // Node.js scripts
      files: ['scripts/**/*.js', '*.config.js', 'lighthouserc.js', 'commitlint.config.js'],
      env: {
        node: true,
      },
      globals: {
        module: 'readonly',
        require: 'readonly',
        __dirname: 'readonly',
        process: 'readonly',
        global: 'readonly',
      },
    },
    {
      // Test files
      files: ['test/**/*.js', 'tests/**/*.js'],
      env: {
        node: true,
        jest: true,
      },
      globals: {
        global: 'readonly',
      },
    },
    {
      // Build output (should be ignored but just in case)
      files: ['dist/**/*.js'],
      env: {
        browser: true,
      },
      globals: {
        MutationObserver: 'readonly',
        fetch: 'readonly',
      },
    },
  ],
};
