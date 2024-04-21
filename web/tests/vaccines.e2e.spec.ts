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

    const header = page.locator('h3');

    await expect(header).toContainText('Vaccines');
    const homeButton = page.getByText('Home');
    await homeButton.click();
    await expect(header).toContainText('Pro-Vaxina');
    expect(page.url()).toBe('http://127.0.0.1:3000/');
  });
});