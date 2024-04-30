import { VaccinationRecord } from '@src/vaccination-records/entities/vaccination-record.entity';
import { faker } from '@faker-js/faker';
import { Patient } from '@src/patients/entities/patient.entity';
import { Vaccine } from '@src/vaccines/entities/vaccine.entity';
import { createPatient } from './patients.factory';
import { createVaccine } from './vaccines.factory';

export interface CreateVaccinationRecordProps {
  patient?: Patient;
  vaccine?: Vaccine;
}

export const createVaccinationRecord = ({
  patient = createPatient(),
  vaccine = createVaccine(),
}: CreateVaccinationRecordProps = {}): VaccinationRecord => {
  return {
    id: faker.number.int(),
    applierName: faker.person.fullName(),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
    patient,
    vaccine,
  };
};
