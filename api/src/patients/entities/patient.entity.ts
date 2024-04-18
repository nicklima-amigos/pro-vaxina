import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { VaccinationRecord } from '@src/vaccination-records/entities/vaccination-record.entity';

@Entity('patient')
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createtAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  fullName: string;

  @Column()
  cpf: string;

  @Column()
  birthDate: Date;

  @OneToMany(() => VaccinationRecord, (record) => record.patient)
  records: VaccinationRecord[];
}
