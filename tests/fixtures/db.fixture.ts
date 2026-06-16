import { test as base, expect } from '@playwright/test';
import { connectDB, disconnectDB } from '../config/db';

export const test = base.extend<{}, { db: void }>({
  db: [
    async ({}, use) => {
      await connectDB();

      await use();

      await disconnectDB();
    },
    { scope: 'worker', auto: true },
  ],
});

export { expect };