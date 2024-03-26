import { Provider } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Patient } from '../patients/entities/patient.entity';
import { VaccinationRecord } from '../vaccination-records/entities/vaccination-record.entity';
import { Vaccine } from '../vaccines/entities/vaccine.entity';

// TODO: Create mock repositories and pass them as useValue in each provider
export const mockRepositoryProviders: Provider[] = [
  {
    provide: getRepositoryToken(Patient),
    useValue: {} as any,
  },
  {
    provide: getRepositoryToken(VaccinationRecord),
    useValue: {} as any,
  },
  {
    provide: getRepositoryToken(Vaccine),
    useValue: {} as any,
  },
];
