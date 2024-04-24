import { createPatient, deletePatient } from '@/actions/patients';
import { createVaccine, deleteVaccine } from '@/actions/vaccines';
import { VaccinationRecordFormFields } from '@/components/forms/register-vaccination-record';
import { test, expect } from '@playwright/test';
import { Patient, VaccinationRecord, Vaccine } from '@/types/api';
import { patientsFactory, vaccinesFactory } from './factories';
import {
  createVaccinationRecord,
  deleteVaccinationRecord,
} from '@/actions/vaccination-records';
import { createVaccinationRecordsFactory } from './factories/vaccination-records.factory';

test.describe('VaccinationRecords', () => {
  let patientStub: Patient;
  let vaccineStub: Vaccine;
  let vaccinationRecordStub: VaccinationRecord;

  test.beforeAll(async () => {
    const { data: patient } = await createPatient(patientsFactory());
    patientStub = patient;

    const { data: vaccine } = await createVaccine(vaccinesFactory());
    vaccineStub = vaccine;

    const { data: vaccinationRecord } = await createVaccinationRecord(
      createVaccinationRecordsFactory(
        patient.id!.toString(),
        vaccine.id!.toString(),
      ),
    );
    vaccinationRecordStub = vaccinationRecord;
  });

  test.afterAll(async () => {
    await deleteVaccinationRecord(vaccinationRecordStub.id!);
    await deletePatient(patientStub.id!).catch(() => {
      console.log('failed deleting patientStub');
    });
    await deleteVaccine(vaccineStub.id!).catch(() => {
      console.log('failed deleting vaccineStub');
    });
  });

  test('should create a vaccination record', async ({ page }) => {
    await page.goto('/register/records');

    const applierNameField = page.locator('#applierName');
    const vaccineIdField = page.locator('#vaccineId').locator('button');
    const patientIdField = page.locator('#patientId').locator('button');
    const submitBtn = page.locator('#submitBtn');

    const vaccinationRecordToCreate: VaccinationRecordFormFields = {
      applierName: 'testApplierName',
      vaccineId: vaccineStub.id!.toString(),
      patientId: patientStub.id!.toString(),
    };

    await applierNameField.fill(vaccinationRecordToCreate.applierName);
    await vaccineIdField.click();
    await page.keyboard.type(vaccineStub.model);
    await page.keyboard.press('Enter');

    await patientIdField.click();
    await page.keyboard.type(patientStub.fullName);
    await page.keyboard.press('Enter');

    await submitBtn.click();

    await new Promise((resolve) => setTimeout(resolve, 1000));

    expect(page.url()).toBe('http://127.0.0.1:3000/');

    await page.waitForSelector('table');

    const table = page.locator('table');
    const tableInnerHtml = await table.innerHTML();

    expect(tableInnerHtml).toContain(patientStub.fullName);
    expect(tableInnerHtml).toContain(vaccineStub.model);
  });

  test('should list the vaccination records for a specific patient', async ({
    page,
  }) => {
    await page.goto(`/patient-records/${patientStub.id}`);

    const tableBody = page.locator('tbody');
    const tableBodyHtml = await tableBody.innerHTML();
    const tableRows = await tableBody.locator('tr').all();

    expect(tableBody).toBeDefined();
    expect(tableRows.length).toBeGreaterThan(0);
    expect(tableBodyHtml).toContain(vaccinationRecordStub.id!.toString());
  });
});
