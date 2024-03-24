import { Injectable } from '@nestjs/common';
import { CreateVaccinationRecordDto } from './dto/create-vaccination-record.dto';
import { UpdateVaccinationRecordDto } from './dto/update-vaccination-record.dto';

@Injectable()
export class VaccinationRecordsService {
  create(createVaccinationRecordDto: CreateVaccinationRecordDto) {
    return 'This action adds a new vaccinationRecord';
  }

  findAll() {
    return `This action returns all vaccinationRecords`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vaccinationRecord`;
  }

  update(id: number, updateVaccinationRecordDto: UpdateVaccinationRecordDto) {
    return `This action updates a #${id} vaccinationRecord`;
  }

  remove(id: number) {
    return `This action removes a #${id} vaccinationRecord`;
  }
}
