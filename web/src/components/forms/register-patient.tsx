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
      />

      <InputWithLabel
        label={'CPF'}
        onChange={({ target }) =>
          setPatientFormState({ ...patientFormState, cpf: target.value })
        }
      />

      <InputWithLabel
        label={'Data de nascimento'}
        type="date"
        onChange={({ target }) =>
          setPatientFormState({ ...patientFormState, birthDate: target.value })
        }
      />

      <Button>Cadastrar</Button>
    </form>
  );
};
