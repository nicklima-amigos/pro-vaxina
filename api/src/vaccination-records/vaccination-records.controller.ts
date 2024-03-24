import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VaccinationRecordsService } from './vaccination-records.service';
import { CreateVaccinationRecordDto } from './dto/create-vaccination-record.dto';
import { UpdateVaccinationRecordDto } from './dto/update-vaccination-record.dto';

@Controller('vaccination-records')
export class VaccinationRecordsController {
  constructor(private readonly vaccinationRecordsService: VaccinationRecordsService) {}

  @Post()
  create(@Body() createVaccinationRecordDto: CreateVaccinationRecordDto) {
    return this.vaccinationRecordsService.create(createVaccinationRecordDto);
  }

  @Get()
  findAll() {
    return this.vaccinationRecordsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vaccinationRecordsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVaccinationRecordDto: UpdateVaccinationRecordDto) {
    return this.vaccinationRecordsService.update(+id, updateVaccinationRecordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vaccinationRecordsService.remove(+id);
  }
}
