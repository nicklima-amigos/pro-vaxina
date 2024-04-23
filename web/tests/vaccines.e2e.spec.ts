import { Vaccine } from '@/types/api';
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

  test('should create a vaccine', async ({ page }) => {
    await page.goto('/register/vaccines');

    const manufacturerInput = page.locator('#manufacturer');
    const modelInput = page.locator('#model');
    const illnessInput = page.locator('#illness');
    const expirationDateInput = page.locator('#expirationDate');
    const submitBtn = page.locator('#submitBtn');

    const vaccineToCreate: Vaccine = {
      manufacturer: 'TestManufacturer',
      model: 'TestModel',
      illness: 'TestIlness',
      expirationDate: '2030-01-01',
    };

    await manufacturerInput.fill(vaccineToCreate.manufacturer);
    await modelInput.fill(vaccineToCreate.model);
    await illnessInput.fill(vaccineToCreate.illness);
    await expirationDateInput.fill(vaccineToCreate.expirationDate);
    await submitBtn.click();

    await page.waitForSelector('table');

    expect(page.url()).toBe('http://127.0.0.1:3000/vaccines');

    const table = page.locator('table');
    expect(await table.innerHTML()).toContain(vaccineToCreate.model);
  });
});
