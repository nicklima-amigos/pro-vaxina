import { IsDateString, IsString, Length } from 'class-validator';

export class CreatePatientDto {
  @IsString()
  fullName: string;

  @IsString()
  @Length(11, 11)
  cpf: string;

  @IsDateString()
  birthDate: Date;
}
