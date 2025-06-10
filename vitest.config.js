import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './test/setup.js',
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
}); 