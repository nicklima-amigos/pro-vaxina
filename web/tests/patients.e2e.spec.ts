import test, { expect } from '@playwright/test';

test.describe('Patients', () => {
  test('should list Patients', async ({ page }) => {
    await page.goto('/patients');

    const table = page.locator('table');
    const tableBody = page.locator('tbody');
    const tableRows = tableBody.locator('tr');

    expect(await table.isVisible()).toBeTruthy();
    expect(await tableBody.isVisible()).toBeTruthy();
    expect(await tableRows.count()).toBeGreaterThan(0);
  });

  test('should change title and go home', async ({ page }) => {
    await page.goto('/patients');

    const header = page.locator('h3');
    const homeButton = page.getByText('Home');
    await expect(header).toContainText('Patients');
    await homeButton.click();
    await expect(header).toContainText('Pro-Vaxina');
    expect(page.url()).toBe('http://127.0.0.1:3000/');
  });
});
