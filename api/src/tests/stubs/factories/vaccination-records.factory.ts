import { VaccinationRecord } from '@src/vaccination-records/entities/vaccination-record.entity';
import { faker } from '@faker-js/faker';
import { Patient } from '@src/patients/entities/patient.entity';
import { Vaccine } from '@src/vaccines/entities/vaccine.entity';
import { createPatient } from './patients.factory';
import { createVaccine } from './vaccines.factory';

export interface CreateVaccinationRecordProps {
  patient: Patient;
  vaccine: Vaccine;
}

export const createVaccinationRecord = (
  { patient, vaccine }: CreateVaccinationRecordProps = {
    patient: createPatient(),
    vaccine: createVaccine(),
  },
): VaccinationRecord => {
  return {
    id: faker.number.int(),
    vaccine,
    patient,
    applierName: faker.person.fullName(),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  };
};
