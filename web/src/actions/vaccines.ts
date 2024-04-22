'use server';

import { apiClient } from '@/services';
import { VaccineFormFields } from '../register-vaccine';
import { Vaccine } from '@/types/api';

export const createVaccine = async (vaccine: VaccineFormFields) => {
  const response = await apiClient.post<Vaccine>({
    endpoint: '/vaccines',
    body: vaccine,
  });
  return response;
};
