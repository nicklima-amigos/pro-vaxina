import { Module } from '@nestjs/common';
import { VaccinationRecordsService } from './vaccination-records.service';
import { VaccinationRecordsController } from './vaccination-records.controller';

@Module({
  controllers: [VaccinationRecordsController],
  providers: [VaccinationRecordsService],
})
export class VaccinationRecordsModule {}
