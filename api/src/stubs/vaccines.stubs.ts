import { Vaccine } from '@src/vaccines/entities/vaccine.entity';

export const vaccineItem: Vaccine = {
  id: 1,
  model: 'AstraZeneca',
  createdAt: new Date(),
  updatedAt: new Date(),
  illness: 'COVID-19',
  manufacturer: 'AstraZeneca',
};
