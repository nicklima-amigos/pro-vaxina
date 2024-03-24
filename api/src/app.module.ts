import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientsModule } from './patients/patients.module';
import { VaccinationRecordsModule } from './vaccination-records/vaccination-records.module';
import { VaccinesModule } from './vaccines/vaccines.module';

@Module({
  imports: [PatientsModule, VaccinationRecordsModule, VaccinesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
