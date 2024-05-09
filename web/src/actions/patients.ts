'use server';

import { PatientFormFields } from '@/components/forms/register-patient';
import { apiClient } from '@/services';
import { Patient } from '@/types/api';

export const createPatient = async (patient: PatientFormFields) => {
  const response = await apiClient.post<Patient>({
    endpoint: '/patients',
    body: patient,
  });
  return response;
};

export const deletePatient = async (id: number) => {
  const response = await apiClient.remove({
    endpoint: `/patients/${id}`,
  });
  return response;
};
