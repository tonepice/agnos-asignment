import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    include: ['src/__tests__/*.ts', 'src/__tests__/**/*.ts'],
  },
});
