'use server';

import { apiClient } from '@/services';
import { PatientFormFields } from '../register-patient';

export const createPatient = async (patient: PatientFormFields) => {
  const response = await apiClient.post({
    endpoint: '/patients',
    body: patient,
  });
  return response;
};
