import { Vaccine } from '@src/vaccines/entities/vaccine.entity';
import { createVaccine } from './factories/vaccines.factory';
import { createMany } from './factories/factory.helpers';

export const vaccineItem: Vaccine = createVaccine();

export const vaccineItems: Vaccine[] = createMany(createVaccine, 10);
