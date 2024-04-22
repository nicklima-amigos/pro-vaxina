import { createPatient } from '@/actions/patients';
import { createVaccine } from '@/actions/vaccines';
import { VaccinationRecordFormFields } from '@/components/forms/register-vaccination-record';
import { test, expect } from '@playwright/test';
import { randomUUID } from 'crypto';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });

test.describe('VaccinationRecords', () => {
  const randomCPF = () => {
    const cpfChars = [];
    for (let i = 0; i < 11; i++) {
      cpfChars.push(Math.floor(Math.random() * 10));
    }
    return cpfChars.join('');
  };

  const createDependencies = async () => {
    const { data: patient } = await createPatient({
      birthDate: '1990-01-01',
      cpf: randomCPF(),
      fullName: randomUUID(),
    });

    const { data: vaccine } = await createVaccine({
      expirationDate: '2030-01-01',
      illness: randomUUID(),
      manufacturer: randomUUID(),
      model: randomUUID(),
    });

    return { patient, vaccine };
  };

  test('should create a vaccination record', async ({ page }) => {
    const { patient, vaccine } = await createDependencies();

    await page.goto('/register/records');

    const applierNameField = page.locator('#applierName');
    const vaccineIdField = page.locator('#vaccineId').locator('button');
    const patientIdField = page.locator('#patientId').locator('button');
    const submitBtn = page.locator('#submitBtn');

    const vaccinationRecordToCreate: VaccinationRecordFormFields = {
      applierName: 'testApplierName',
      vaccineId: vaccine.id!.toString(),
      patientId: patient.id!.toString(),
    };

    await applierNameField.fill(vaccinationRecordToCreate.applierName);
    await vaccineIdField.click();
    await page.keyboard.type(vaccine.model);
    await page.keyboard.press('Enter');

    await patientIdField.click();
    await page.keyboard.type(patient.fullName);
    await page.keyboard.press('Enter');

    await submitBtn.click();

    await new Promise((resolve) => setTimeout(resolve, 2000));

    expect(page.url()).toBe('http://127.0.0.1:3000/');

    await page.waitForSelector('table');
    const table = page.locator('table');

    const tableInnerHtml = await table.innerHTML();
    expect(tableInnerHtml).toContain(patient.fullName);
    expect(tableInnerHtml).toContain(vaccine.model);
  });
});
