import { PartialType } from '@nestjs/mapped-types';
import { CreateVaccinationRecordDto } from './create-vaccination-record.dto';

export class UpdateVaccinationRecordDto extends PartialType(CreateVaccinationRecordDto) {}
