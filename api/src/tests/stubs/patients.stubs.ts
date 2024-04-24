import { Patient } from '@src/patients/entities/patient.entity';
import { createManyPatients } from './factories/patients.factory';

export const patientItems: Patient[] = createManyPatients({
  quantity: 10,
});
