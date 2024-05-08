'use server';

import { VaccinationRecordFormFields } from '@/components/forms/register-vaccination-record';
import { apiClient } from '@/services';
import { VaccinationRecord } from '@/types/api';

export const createVaccinationRecord = async ({
  applierName,
  vaccineId,
  patientId,
}: VaccinationRecordFormFields) => {
  const response = await apiClient.post<VaccinationRecord>({
    endpoint: '/vaccination-records',
    body: {
      applierName,
      vaccineId: parseInt(vaccineId),
      patientId: parseInt(patientId),
    },
  });
  return response;
};

export const deleteVaccinationRecord = async (id: number) => {
  const response = await apiClient.remove({
    endpoint: `/vaccination-records/${id}`,
  });
  return response;
};
