import { FormContainer } from '@/components/forms/form-container';
import { RegisterPatientForm } from '@/components/forms/register-patient';
import { Header } from '@/components/header';
import { FC } from 'react';

const RegisterPatients: FC = () => {
  return (
    <>
      <Header title={'Paciente'} />
      <FormContainer title={'Registrar Paciente'}>
        <RegisterPatientForm />
      </FormContainer>
    </>
  );
};

export default RegisterPatients;
