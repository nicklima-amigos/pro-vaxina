import { FormContainer } from '@/components/forms/form-container';
import { RegisterVaccinationRecordForm } from '@/components/forms/register-vaccination-record';
import { Header } from '@/components/header';

const RegisterRecord = () => {
  return (
    <>
      <Header title={'Vacina'} />
      <FormContainer title={'Registrar Vacinação'}>
        <RegisterVaccinationRecordForm />
      </FormContainer>
    </>
  );
};

export default RegisterRecord;
