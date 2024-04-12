import { Provider } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Patient } from '../patients/entities/patient.entity';
import { VaccinationRecord } from '../vaccination-records/entities/vaccination-record.entity';
import { Vaccine } from '../vaccines/entities/vaccine.entity';
import { Repository } from 'typeorm';

export const vaccinationRecordsRepositoryMock: jest.Mocked<
  Repository<VaccinationRecord>
> = {
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
} as any;

export const patientsRepositoryMock: jest.Mocked<Repository<Patient>> = {
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
} as any;

export const vaccinesRepositoryMock: jest.Mocked<Repository<Vaccine>> = {
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
} as any;

export const mockRepositoryProviders: Provider[] = [
  {
    provide: getRepositoryToken(Patient),
    useValue: patientsRepositoryMock,
  },
  {
    provide: getRepositoryToken(VaccinationRecord),
    useValue: vaccinationRecordsRepositoryMock,
  },
  {
    provide: getRepositoryToken(Vaccine),
    useValue: vaccinesRepositoryMock,
  },
];
