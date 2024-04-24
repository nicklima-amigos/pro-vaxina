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
import { VaccinationRecord } from '@/types/api';
import Link from 'next/link';

export default async function Home() {
  const { data } = await apiClient.get<VaccinationRecord[]>({
    endpoint: '/vaccination-records',
  });

  return (
    <>
      <Header title="Bem-vindo ao Pro-Vaxina">
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
            <TableHead>Paciente</TableHead>
            <TableHead>Vacina</TableHead>
            <TableHead>Vacinado em</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => {
            return (
              <TableRow key={row.id}>
                <TableCell className="font-medium">{row.id}</TableCell>
                <TableCell>{row.patient.fullName}</TableCell>
                <TableCell>{row.vaccine.model}</TableCell>
                <TableCell>{new Date(row.createdAt!).toUTCString()}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}
