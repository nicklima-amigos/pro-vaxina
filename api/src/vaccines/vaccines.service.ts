import { Injectable } from '@nestjs/common';
import { CreateVaccineDto } from './dto/create-vaccine.dto';
import { UpdateVaccineDto } from './dto/update-vaccine.dto';
import { Repository } from 'typeorm';
import { Vaccine } from './entities/vaccine.entity';

@Injectable()
export class VaccinesService {
  constructor(private vaccinesRepository: Repository<Vaccine>) {}

  create(createVaccineDto: CreateVaccineDto) {
    return this.vaccinesRepository.create(createVaccineDto);
  }

  findAll() {
    return this.vaccinesRepository.find();
  }

  findOne(id: number) {
    return this.vaccinesRepository.findOne({ where: { id } });
  }

  update(id: number, updateVaccineDto: UpdateVaccineDto) {
    return this.vaccinesRepository.save({ id, ...updateVaccineDto });
  }

  remove(id: number) {
    return this.vaccinesRepository.delete({ where: { id } });
  }
}
