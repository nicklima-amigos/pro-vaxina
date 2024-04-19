import { IsNumber, IsString } from 'class-validator';

export class CreateVaccinationRecordDto {
  @IsNumber()
  patientId: number;

  @IsNumber()
  vaccineId: number;

  @IsString()
  applierName: string;
}
