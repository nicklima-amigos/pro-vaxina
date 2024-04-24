import { faker } from '@faker-js/faker';
import { Patient } from '@src/patients/entities/patient.entity';

export const createPatient = (): Patient => {
  return {
    id: faker.number.int(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
    records: [],
    fullName: faker.person.fullName(),
    cpf: faker.string.numeric({ length: 11 }),
    birthDate: faker.date.past({ years: 100 }),
  };
};

export const createManyPatients = ({ quantity }: { quantity: number }) => {
  const patients: Patient[] = [];

  for (let i = 0; i < quantity; i++) {
    patients.push(createPatient());
  }

  return patients;
};
