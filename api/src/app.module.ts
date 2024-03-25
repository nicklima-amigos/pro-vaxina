import { Module } from '@nestjs/common';
import { PatientsModule } from './patients/patients.module';
import { VaccinationRecordsModule } from './vaccination-records/vaccination-records.module';
import { VaccinesModule } from './vaccines/vaccines.module';

@Module({
  imports: [PatientsModule, VaccinationRecordsModule, VaccinesModule],
})
export class AppModule {}
