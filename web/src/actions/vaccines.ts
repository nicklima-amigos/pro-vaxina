'use server';

import { VaccineFormFields } from '@/components/forms/register-vaccine';
import { apiClient } from '@/services';
import { Vaccine } from '@/types/api';

export const createVaccine = async (vaccine: VaccineFormFields) => {
  const response = await apiClient.post<Vaccine>({
    endpoint: '/vaccines',
    body: vaccine,
  });
  return response;
};
