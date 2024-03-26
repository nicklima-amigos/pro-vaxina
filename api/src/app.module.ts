import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PatientsModule } from './patients/patients.module';
import { VaccinationRecordsModule } from './vaccination-records/vaccination-records.module';
import { VaccinesModule } from './vaccines/vaccines.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'db.sqlite3',
    }),
    PatientsModule,
    VaccinationRecordsModule,
    VaccinesModule,
  ],
})
export class AppModule {}
