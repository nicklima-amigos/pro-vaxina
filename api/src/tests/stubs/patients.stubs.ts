import { Patient } from '@src/patients/entities/patient.entity';
import { createPatient } from './factories/patients.factory';
import { createMany } from './factories/factory.helpers';

export const patientItems: Patient[] = createMany(createPatient, 10);
