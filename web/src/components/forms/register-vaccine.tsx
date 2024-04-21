'use client';

import { FC, useState } from 'react';
import { InputWithLabel } from '../ui/input';
import { Button } from '../button';
import { createVaccine } from './actions/vaccines';
import { useRouter } from 'next/navigation';

export interface VaccineFormFields {
  expirationDate: string;
  model: string;
  manufacturer: string;
  illness: string;
}

const vaccineFormInitialState: VaccineFormFields = {
  expirationDate: '',
  model: '',
  manufacturer: '',
  illness: '',
};

export const RegisterVaccineForm: FC = () => {
  const [vaccineFormState, setVaccineFormState] = useState<VaccineFormFields>(
    vaccineFormInitialState,
  );
  const router = useRouter();

  return (
    <form
      action=""
      onSubmit={async (event) => {
        event.preventDefault();
        await createVaccine(vaccineFormState);
        router.push('/vaccines');
      }}
      className="w-full"
    >
      <InputWithLabel
        label={'Fabricante'}
        onChange={({ target }) =>
          setVaccineFormState({
            ...vaccineFormState,
            manufacturer: target.value,
          })
        }
        data-testid={'manufacturer'}
      />

      <InputWithLabel
        label={'Modelo'}
        onChange={({ target }) =>
          setVaccineFormState({
            ...vaccineFormState,
            model: target.value,
          })
        }
        data-testid="model"
      />

      <InputWithLabel
        label={'Doença'}
        onChange={({ target }) =>
          setVaccineFormState({
            ...vaccineFormState,
            illness: target.value,
          })
        }
        data-testid={'illness'}
      />

      <InputWithLabel
        label={'Data de validade'}
        value={vaccineFormState.expirationDate}
        onChange={({ target }) =>
          setVaccineFormState({
            ...vaccineFormState,
            expirationDate: target.value,
          })
        }
        data-testid={'expirationDate'}
      />
      <Button data-testid={'submitBtn'}>Cadastrar</Button>
    </form>
  );
};
