import { IsDateString, IsString } from 'class-validator';

export class CreateVaccineDto {
  @IsString()
  model: string;

  @IsString()
  manufacturer: string;

  @IsString()
  illness: string;

  @IsDateString()
  expirationDate: Date;
}
