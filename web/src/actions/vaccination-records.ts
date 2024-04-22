'use server';

import { apiClient } from '@/services';
import { VaccinationRecordFormFields } from '../register-vaccination-record';

export const createVaccinationRecord = async ({
  applierName,
  vaccineId,
  patientId,
}: VaccinationRecordFormFields) => {
  const response = await apiClient.post({
    endpoint: '/vaccination-records',
    body: {
      applierName,
      vaccineId: parseInt(vaccineId),
      patientId: parseInt(patientId),
    },
  });
  return response;
};
