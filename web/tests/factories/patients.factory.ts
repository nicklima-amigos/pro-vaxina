import { Patient } from '@/types/api';
import { faker } from '@faker-js/faker';

export const patientsFactory = (): Patient => {
  return {
    fullName: faker.person.fullName(),
    cpf: faker.string.numeric({ length: 11 }),
    birthDate: faker.date.past({ years: 100 }).toISOString(),
  };
};
