'use client';

import { useEffect, useState } from 'react';
import { InputWithLabel } from '../ui/input';
import { Patient, Vaccine } from '@/types/api';
import { SelectWithLabel } from '../ui/select';
import { Button } from '../button';
import { apiClient } from '@/services';

export interface VaccinationRecordFormFields {
  applierName: string;
  vaccineId: string;
  patientId: string;
}

const vaccinationRecordFormInitialState: VaccinationRecordFormFields = {
  applierName: '',
  vaccineId: '',
  patientId: '',
};

export const RegisterVaccinationRecordForm = () => {
  const [availablePatients, setAvailablePatients] = useState<Patient[]>([]);
  const [availableVaccines, setAvailableVaccines] = useState<Vaccine[]>([]);
  const [vaccinationRecordFormState, setVaccinationRecordFormState] = useState(
    vaccinationRecordFormInitialState
  );

  useEffect(() => {
    const fetchPatientsAndVaccines = async () => {
      const { data: patients } = await apiClient.get<Patient[]>({
        endpoint: '/patients',
      });

      const { data: vaccines } = await apiClient.get<Vaccine[]>({
        endpoint: '/vaccines',
      });

      setAvailablePatients(patients);
      setAvailableVaccines(vaccines);
    };

    fetchPatientsAndVaccines();
  }, []);

  return (
    <form
      action=""
      onSubmit={(event) => {
        event.preventDefault();
        console.log({ vaccinationRecordFormState });
      }}
    >
      <InputWithLabel
        label={'Nome do aplicador'}
        onChange={({ target }) =>
          setVaccinationRecordFormState({
            ...vaccinationRecordFormState,
            applierName: target.value,
          })
        }
      />

      <SelectWithLabel
        label={'Vacina'}
        items={availableVaccines.map((vaccine) => ({
          label: `${vaccine.model} - ${vaccine.manufacturer}`,
          value: vaccine.id!.toString(),
        }))}
        onValueChange={(value) =>
          setVaccinationRecordFormState({
            ...vaccinationRecordFormState,
            vaccineId: value,
          })
        }
      />

      <SelectWithLabel
        label={'Paciente'}
        items={availablePatients.map((patient) => ({
          label: `${patient.fullName} - ${patient.cpf}`,
          value: patient.id!.toString(),
        }))}
        onValueChange={(value) =>
          setVaccinationRecordFormState({
            ...vaccinationRecordFormState,
            patientId: value,
          })
        }
      />

      <Button>Cadastrar</Button>
    </form>
  );
};
