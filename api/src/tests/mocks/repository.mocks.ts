import { Provider } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Patient } from '@src/patients/entities/patient.entity';
import { VaccinationRecord } from '@src/vaccination-records/entities/vaccination-record.entity';
import { Vaccine } from '@src/vaccines/entities/vaccine.entity';

export const repositoryMockFactory = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});

export const vaccinationRecords = repositoryMockFactory();

export const patients = repositoryMockFactory();

export const vaccines = repositoryMockFactory();

export const providers: Provider[] = [
  {
    provide: getRepositoryToken(Patient),
    useValue: patients,
  },
  {
    provide: getRepositoryToken(VaccinationRecord),
    useValue: vaccinationRecords,
  },
  {
    provide: getRepositoryToken(Vaccine),
    useValue: vaccines,
  },
];
