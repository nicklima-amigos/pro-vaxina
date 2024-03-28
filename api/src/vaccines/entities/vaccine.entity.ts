import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('vaccine')
export class Vaccine {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createtAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  model: string;

  @Column()
  manufacturer: string;

  @Column()
  disease: string;
}
