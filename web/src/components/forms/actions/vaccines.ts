'use server';

import { apiClient } from '@/services';
import { VaccineFormFields } from '../register-vaccine';

export const createVaccine = async (vaccine: VaccineFormFields) => {
  const response = await apiClient.post({
    endpoint: '/vaccines',
    body: vaccine,
  });
  return response;
};
