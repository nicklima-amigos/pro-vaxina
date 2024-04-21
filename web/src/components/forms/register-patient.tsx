'use client';

import { FC, useState } from 'react';
import { InputWithLabel } from '../ui/input';
import { Button } from '../button';
import { createPatient } from './actions/patients';
import { useRouter } from 'next/navigation';

export interface PatientFormFields {
  fullName: string;
  cpf: string;
  birthDate: string;
}

const patientFormInitialState: PatientFormFields = {
  fullName: '',
  cpf: '',
  birthDate: '',
};

export const RegisterPatientForm: FC = () => {
  const [patientFormState, setPatientFormState] = useState(
    patientFormInitialState,
  );
  const router = useRouter();

  return (
    <form
      action=""
      onSubmit={async (event) => {
        event.preventDefault();
        await createPatient(patientFormState);
        router.push('/patients');
      }}
    >
      <InputWithLabel
        label={'Nome completo'}
        onChange={({ target }) =>
          setPatientFormState({
            ...patientFormState,
            fullName: target.value,
          })
        }
        data-testid="fullName"
      />

      <InputWithLabel
        label={'CPF'}
        onChange={({ target }) =>
          setPatientFormState({ ...patientFormState, cpf: target.value })
        }
        data-testid="cpf"
      />

      <InputWithLabel
        label={'Data de nascimento'}
        type="date"
        onChange={({ target }) =>
          setPatientFormState({ ...patientFormState, birthDate: target.value })
        }
        data-testid="birthDate"
      />

      <Button data-testid="submitBtn">Cadastrar</Button>
    </form>
  );
};
