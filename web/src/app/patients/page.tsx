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
import { Patient } from '@/types/api';
import Link from 'next/link';

export default async function Vaccines() {
  const response = await apiClient.get<Patient[]>({ endpoint: '/patients' });

  return (
    <>
      <Header title="Patients">
        <Link href="/register/patients">
          <Button variant="default">Registrar</Button>
        </Link>
        <Link href="/">
          <Button variant="destructive">Voltar</Button>
        </Link>
      </Header>
      <Table>
        <TableCaption>Lista de pacientes.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Identificação</TableHead>
            <TableHead>Paciente</TableHead>
            <TableHead>CPF</TableHead>
            <TableHead>Vacinado em</TableHead>
            <TableHead>Ação</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {response.data.map((data) => (
            <TableRow key={data.id}>
              <TableCell className="font-medium">{data.id}</TableCell>
              <TableCell>{data.fullName}</TableCell>
              <TableCell>{data.cpf}</TableCell>
              <TableCell>{new Date(data.birthDate).toUTCString()}</TableCell>
              <TableCell>
                <Link href="/patient-records">
                  <Button variant="secondary">Registros</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
