import { defineConfig } from 'vitest/config';
export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
    environment: 'jsdom',
    reporters: ['html'],
    server: {
      deps: {
        inline: ['@mui/x-data-grid'],
      },
    },
  },
  // resolve: {
  //   alias: {},
  // },
});
