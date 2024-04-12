import { Provider } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Patient } from '@src/patients/entities/patient.entity';
import { VaccinationRecord } from '@src/vaccination-records/entities/vaccination-record.entity';
import { Vaccine } from '@src/vaccines/entities/vaccine.entity';

export const vaccinationRecordsRepositoryMock = {
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

export const patientsRepositoryMock = {
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

export const vaccinesRepositoryMock = {
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

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
