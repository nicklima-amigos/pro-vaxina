'use client';

import { useState } from 'react';
import { InputWithLabel } from '../ui/input';

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
  const [vaccinationRecordFormState, setVaccinationRecordFormState] = useState(
    vaccinationRecordFormInitialState,
  );
  return (
    <form
      action=""
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <InputWithLabel
        label={'Nome do aplicador'}
        onChange={(event) =>
          setVaccinationRecordFormState({
            ...vaccinationRecordFormState,
            applierName: event.target.value,
          })
        }
      />

      <InputWithLabel label={'Vacina'} />

      <InputWithLabel label={'Paciente'} />
    </form>
  );
};
