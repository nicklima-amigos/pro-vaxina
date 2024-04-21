import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Patient } from '@src/patients/entities/patient.entity';
import { PatientsModule } from '@src/patients/patients.module';
import { VaccinationRecord } from '@src/vaccination-records/entities/vaccination-record.entity';
import { VaccinationRecordsModule } from '@src/vaccination-records/vaccination-records.module';
import { Vaccine } from '@src/vaccines/entities/vaccine.entity';
import { VaccinesModule } from '@src/vaccines/vaccines.module';
import { unlink } from 'fs/promises';
import { Repository } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env.test' }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const nodeEnv = configService.get<string>('NODE_ENV');
        const database = configService.get<string>('DATABASE_NAME');
        return {
          type: 'better-sqlite3',
          database,
          synchronize: nodeEnv !== 'production',
          autoLoadEntities: true,
        };
      },
    }),
    PatientsModule,
    VaccinationRecordsModule,
    VaccinesModule,
  ],
})
export class SeedModule {}

const createPatients = async (repository: Repository<Patient>) => {
  return repository.save([
    { fullName: 'John Doe', cpf: '12345678901', birthDate: '1990-01-01' },
    { fullName: 'Jane Doe', cpf: '10987654321', birthDate: '1990-01-01' },
  ]);
};

const createVaccines = async (repository: Repository<Vaccine>) => {
  return repository.save([
    {
      model: 'Coronavac',
      manufacturer: 'Sinovac',
      illness: 'COVID-19',
      expirationDate: '2022-01-01',
    },
    {
      model: 'BioNTech',
      manufacturer: 'Pfizer',
      illness: 'COVID-19',
      expirationDate: '2022-01-01',
    },
  ]);
};

const createVaccinationRecord = async (
  repository: Repository<VaccinationRecord>,
  patientId: number,
  vaccineId: number,
) => {
  return repository.save({
    applierName: 'John Doe',
    vaccine: { id: vaccineId },
    patient: { id: patientId },
    date: '2021-01-01',
  });
};

const seedDatabase = async () => {
  const logger = new Logger('Database seed');
  ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env.test' });
  const databaseName = process.env.DATABASE_NAME;
  logger.log('Deleting pre-existing database...');
  try {
    await unlink(databaseName);
    logger.log('Pre existing database deleted');
  } catch {
    logger.log('Database not found');
  }

  const app = await NestFactory.create(SeedModule, { cors: true });
  const patientRepository = app.get(getRepositoryToken(Patient));
  const vaccineRepository = app.get(getRepositoryToken(Vaccine));
  const vaccinationRecordRepository = app.get(
    getRepositoryToken(VaccinationRecord),
  );

  logger.log('Creating patients...');
  const patients = await createPatients(patientRepository);
  logger.log('Creating vaccines...');
  const vaccines = await createVaccines(vaccineRepository);
  logger.log('Creating vaccination records');
  for (let i = 0; i < patients.length; i++) {
    if (!vaccines[i]) {
      break;
    }
    await createVaccinationRecord(
      vaccinationRecordRepository,
      patients[i].id,
      vaccines[i].id,
    );
  }
  logger.log('Done');
};

seedDatabase();
