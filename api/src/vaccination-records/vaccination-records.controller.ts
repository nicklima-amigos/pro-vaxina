import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { VaccinationRecordsService } from './vaccination-records.service';
import { CreateVaccinationRecordDto } from './dto/create-vaccination-record.dto';
import { UpdateVaccinationRecordDto } from './dto/update-vaccination-record.dto';

@Controller('vaccination-records')
export class VaccinationRecordsController {
  constructor(
    private readonly vaccinationRecordsService: VaccinationRecordsService,
  ) {}

  @Post()
  create(@Body() createVaccinationRecordDto: CreateVaccinationRecordDto) {
    return this.vaccinationRecordsService.create(createVaccinationRecordDto);
  }

  @Get()
  findAll() {
    return this.vaccinationRecordsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.vaccinationRecordsService.findOne(id);
  }

  @Get('patient/:id')
  findByPatient(@Param('id', ParseIntPipe) id: number) {
    return this.vaccinationRecordsService.findByPatient(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVaccinationRecordDto: UpdateVaccinationRecordDto,
  ) {
    return this.vaccinationRecordsService.update(
      id,
      updateVaccinationRecordDto,
    );
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.vaccinationRecordsService.remove(id);
  }
}
