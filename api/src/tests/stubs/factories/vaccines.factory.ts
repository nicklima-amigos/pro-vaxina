import { faker } from '@faker-js/faker';
import { Vaccine } from '@src/vaccines/entities/vaccine.entity';

export const createVaccine = (): Vaccine => {
  return {
    id: faker.number.int(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
    expirationDate: faker.date.future({ years: 10 }),
    illness: faker.lorem.word(),
    manufacturer: faker.lorem.word(),
    model: faker.lorem.word(),
  };
};

export const createManyVaccines = ({ quantity }: { quantity: number }) => {
  const vaccines: Vaccine[] = [];

  for (let i = 0; i < quantity; i++) {
    vaccines.push(createVaccine());
  }

  return vaccines;
};
