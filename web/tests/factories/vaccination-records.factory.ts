import { VaccinationRecordFormFields } from '@/components/forms/register-vaccination-record';
import { Patient, VaccinationRecord, Vaccine } from '@/types/api';
import { faker } from '@faker-js/faker';

export const vaccinationRecordsFactory = (
  patient: Patient,
  vaccine: Vaccine,
): VaccinationRecord => {
  return {
    applierName: faker.person.fullName(),
    patient,
    vaccine,
  };
};

export const createVaccinationRecordsFactory = (
  patientId: string,
  vaccineId: string,
): VaccinationRecordFormFields => {
  return {
    applierName: faker.person.fullName(),
    patientId,
    vaccineId,
  };
};
