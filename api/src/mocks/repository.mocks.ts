import { Provider } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Patient } from '../patients/entities/patient.entity';
import { VaccinationRecord } from '../vaccination-records/entities/vaccination-record.entity';
import { Vaccine } from '../vaccines/entities/vaccine.entity';

const entities = [Patient, VaccinationRecord, Vaccine];

export const mockRepositoryProviders: Provider[] = entities.map((entity) => ({
  provide: getRepositoryToken(entity),
  useValue: {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

export const vaccineRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};
