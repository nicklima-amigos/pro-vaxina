import test, { expect } from '@playwright/test';

test.describe('Vaccines', () => {
  test('should list vaccines', async ({ page }) => {
    await page.goto('/vaccines');

    const table = page.locator('table');
    const tableBody = page.locator('tbody');
    const tableRows = tableBody.locator('tr');

    expect(await table.isVisible()).toBeTruthy();
    expect(await tableBody.isVisible()).toBeTruthy();
    expect(await tableRows.count()).toBeGreaterThan(0);
  });

  test('should change title and go home', async ({ page }) => {
    await page.goto('/vaccines');

    const header = page.locator('h1');
    await expect(header).toContainText('Vaccines');
    await header.click();
    await expect(header).toContainText('Welcome to Pro-Vaxina');
    expect(page.url()).toBe('http://127.0.0.1:3000/');
  });
});
