import { VaccinationRecord } from '@src/vaccination-records/entities/vaccination-record.entity';
import { createVaccinationRecord } from './factories/vaccination-records.factory';
import { createMany } from './factories/factory.helpers';

export const vaccinationRecordItem: VaccinationRecord =
  createVaccinationRecord();

export const vaccinationRecordItems: VaccinationRecord[] = createMany(
  createVaccinationRecord,
  10,
);
