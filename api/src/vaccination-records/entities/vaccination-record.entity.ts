import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Patient } from '@src/patients/entities/patient.entity';
import { Vaccine } from '@src/vaccines/entities/vaccine.entity';

@Entity('vaccination_record')
export class VaccinationRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createtAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Patient, (patient) => patient.records)
  patient: Patient;

  @ManyToOne(() => Vaccine)
  vaccine: Vaccine;
}
