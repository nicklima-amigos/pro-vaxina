import { Injectable } from '@nestjs/common';
import { CreateVaccinationRecordDto } from './dto/create-vaccination-record.dto';
import { UpdateVaccinationRecordDto } from './dto/update-vaccination-record.dto';
import { Repository } from 'typeorm';
import { VaccinationRecord } from './entities/vaccination-record.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class VaccinationRecordsService {
  constructor(
    @InjectRepository(VaccinationRecord)
    private vaccinationRecordsRepository: Repository<VaccinationRecord>,
  ) {}

  create({ applierName, vaccineId, patientId }: CreateVaccinationRecordDto) {
    return this.vaccinationRecordsRepository.save({
      applierName,
      vaccine: { id: vaccineId },
      patient: { id: patientId },
    });
  }

  findAll() {
    return this.vaccinationRecordsRepository.find();
  }

  findOne(id: number) {
    return this.vaccinationRecordsRepository.findOne({
      where: { id },
      relations: ['vaccine', 'patient'],
    });
  }

  update(id: number, updateVaccinationRecordDto: UpdateVaccinationRecordDto) {
    return this.vaccinationRecordsRepository.save({
      id,
      ...updateVaccinationRecordDto,
    });
  }

  remove(id: number) {
    return this.vaccinationRecordsRepository.delete({ id });
  }
}
