import test, { expect } from '@playwright/test';
import { randomUUID } from 'crypto';

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

  test('should create a patient', async ({ page }) => {
    await page.goto('/register/patients');

    const fullNameInput = page.getByTestId('fullName');
    const cpfInput = page.getByTestId('cpf');
    const birthDateInput = page.getByTestId('birthDate');
    const submitBtn = page.getByTestId('submitBtn');

    const randomCpf = randomUUID().split('').slice(0, 11).join('');

    await fullNameInput.fill('test user');
    await cpfInput.fill(randomCpf);
    await birthDateInput.fill('2000-01-01');
    await submitBtn.click();

    await page.waitForSelector('table');

    expect(page.url()).toBe('http://127.0.0.1:3000/patients');

    const table = page.locator('table');
    expect(await table.innerHTML()).toContain(randomCpf);
  });
});
