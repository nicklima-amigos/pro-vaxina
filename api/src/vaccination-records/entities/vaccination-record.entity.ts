import {
  Column,
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
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Patient, (patient) => patient.records, { nullable: false })
  patient: Patient;

  @ManyToOne(() => Vaccine, { nullable: false })
  vaccine: Vaccine;

  @Column()
  applierName: string;
}
