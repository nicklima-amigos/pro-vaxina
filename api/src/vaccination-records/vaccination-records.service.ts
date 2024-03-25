import { Injectable } from '@nestjs/common';
import { CreateVaccinationRecordDto } from './dto/create-vaccination-record.dto';
import { UpdateVaccinationRecordDto } from './dto/update-vaccination-record.dto';
import { Repository } from 'typeorm';
import { VaccinationRecord } from './entities/vaccination-record.entity';

@Injectable()
export class VaccinationRecordsService {
  constructor(
    private vaccinationRecordsRepository: Repository<VaccinationRecord>,
  ) {}

  create(createVaccinationRecordDto: CreateVaccinationRecordDto) {
    return this.vaccinationRecordsRepository.save(createVaccinationRecordDto);
  }

  findAll() {
    return this.vaccinationRecordsRepository.find();
  }

  findOne(id: number) {
    return this.vaccinationRecordsRepository.findOne({ where: { id } });
  }

  update(id: number, updateVaccinationRecordDto: UpdateVaccinationRecordDto) {
    return this.vaccinationRecordsRepository.save({
      id,
      ...updateVaccinationRecordDto,
    });
  }

  remove(id: number) {
    return this.vaccinationRecordsRepository.delete({ where: { id } });
  }
}
