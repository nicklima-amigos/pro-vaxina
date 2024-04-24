import { Vaccine } from '@src/vaccines/entities/vaccine.entity';
import {
  createManyVaccines,
  createVaccine,
} from './factories/vaccines.factory';

export const vaccineItem: Vaccine = createVaccine();

export const vaccineItems: Vaccine[] = createManyVaccines({ quantity: 10 });
