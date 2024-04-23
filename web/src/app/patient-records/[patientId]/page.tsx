import { Button } from '@/components/button';
import { Header } from '@/components/header';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/table';
import { apiClient } from '@/services';
import { Patient, VaccinationRecord } from '@/types/api';
import Link from 'next/link';
import { FC } from 'react';

interface UserRecordsProps {
  params: {
    patientId: string;
  };
}

const UserRecords: FC<UserRecordsProps> = async ({ params }) => {
  const { data: patient } = await apiClient.get<Patient>({
    endpoint: `/patients/${params.patientId}`,
  });

  const { data: patientRecords } = await apiClient.get<VaccinationRecord[]>({
    endpoint: `/vaccination-records/patient/${params.patientId}`,
  });

  return (
    <>
      <Header title={patient.fullName}>
        <Link href="/patients">
          <Button variant="default">Pacientes</Button>
        </Link>
        <Link href="/vaccines">
          <Button variant="secondary">Vacinas</Button>
        </Link>
        <Link href="/register/records">
          <Button variant="red" className="animate-pulse">
            VACINAR AGORA!
          </Button>
        </Link>
      </Header>
      <Table>
        <TableCaption>Lista de vacinação.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Identificação</TableHead>
            <TableHead>Vacina</TableHead>
            <TableHead>Vacinado em</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patientRecords.map((row) => {
            return (
              <TableRow key={row.id}>
                <TableCell className="font-medium">{row.id}</TableCell>
                <TableCell>{row.vaccine.model}</TableCell>
                <TableCell>{new Date(row.createdAt!).toUTCString()}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default UserRecords;
