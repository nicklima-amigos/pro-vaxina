import { Vaccine } from '@/types/api';
import { faker } from '@faker-js/faker';

export const vaccinesFactory = (): Vaccine => {
  return {
    expirationDate: faker.date.future({ years: 10 }).toISOString(),
    illness: faker.lorem.word(),
    manufacturer: faker.lorem.word(),
    model: faker.lorem.word(),
  };
};
