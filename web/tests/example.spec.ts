import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  const header = page.locator('h3');

  await expect(header).toContainText('Welcome to Pro-Vaxina');
});
