'use server';

import { VaccinationRecordFormFields } from '@/components/forms/register-vaccination-record';
import { apiClient } from '@/services';

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
