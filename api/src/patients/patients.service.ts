import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from './entities/patient.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private patientsRepository: Repository<Patient>,
  ) {}

  create(createPatientDto: CreatePatientDto) {
    return this.patientsRepository.save(createPatientDto);
  }

  findAll() {
    return this.patientsRepository.find();
  }

  findOne(id: number) {
    return this.patientsRepository.findOne({ where: { id } });
  }

  update(id: number, updatePatientDto: UpdatePatientDto) {
    return this.patientsRepository.save({ id, ...updatePatientDto });
  }

  remove(id: number) {
    return this.patientsRepository.delete({ id });
  }
}
