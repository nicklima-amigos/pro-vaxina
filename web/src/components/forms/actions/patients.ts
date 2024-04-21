'use server';

import { apiClient } from '@/services';
import { PatientFormFields } from '../register-patient';
import { Patient } from '@/types/api';

export const createPatient = async (patient: PatientFormFields) => {
  const response = await apiClient.post<Patient>({
    endpoint: '/patients',
    body: patient,
  });
  return response;
};
