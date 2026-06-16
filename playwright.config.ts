import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  globalSetup: require.resolve('./global-setup'),
  globalTeardown: require.resolve('./global-teardown'),

  use: {
    baseURL: 'http://localhost:5173',
    headless: true,
  },
});