import { Module } from '@nestjs/common';
import { VaccinationRecordsService } from './vaccination-records.service';
import { VaccinationRecordsController } from './vaccination-records.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VaccinationRecord } from './entities/vaccination-record.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VaccinationRecord])],
  controllers: [VaccinationRecordsController],
  providers: [VaccinationRecordsService],
})
export class VaccinationRecordsModule {}
