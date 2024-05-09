import { Provider } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Patient } from '@src/patients/entities/patient.entity';
import { VaccinationRecord } from '@src/vaccination-records/entities/vaccination-record.entity';
import { Vaccine } from '@src/vaccines/entities/vaccine.entity';
import { Repository } from 'typeorm';

const repositoryMockFactory = <T>() =>
  ({
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  }) as unknown as jest.Mocked<Repository<T>>;

export const vaccinationRecords = repositoryMockFactory<VaccinationRecord>();
export const patients = repositoryMockFactory<Patient>();
export const vaccines = repositoryMockFactory<Vaccine>();

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
