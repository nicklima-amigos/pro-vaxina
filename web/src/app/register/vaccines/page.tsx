import { FormContainer } from '@/components/forms/form-container';
import { RegisterVaccineForm } from '@/components/forms/register-vaccine';
import { Header } from '@/components/header';
import { FC } from 'react';

const RegisterVaccines: FC = () => {
  return (
    <>
      <Header title={'Vacina'} />
      <FormContainer title={'Registrar Nova Vacina'}>
        <RegisterVaccineForm />
      </FormContainer>
    </>
  );
};

export default RegisterVaccines;
