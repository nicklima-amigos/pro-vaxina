import { Button } from '@/components/button';
import { Header } from '@/components/header';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/table';
import { apiClient } from '@/services';
import { Vaccine } from '@/types/api';
import Link from 'next/link';

export default async function Vaccines() {
  const response = await apiClient.get<Vaccine[]>({
    endpoint: '/vaccines',
  });

  return (
    <>
      <Header title="Vacinas">
        <Link href="/register/vaccines">
          <Button variant="default">Registrar</Button>
        </Link>
        <Link href="/">
          <Button variant="destructive">Voltar</Button>
        </Link>
      </Header>
      <h1 className="text-4xl text-center my-8">Lista de vacinas</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Identificação</TableHead>
            <TableHead>Modelo</TableHead>
            <TableHead>Fabricante</TableHead>
            <TableHead>Doença</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {response.data.map((data) => (
            <TableRow key={data.id}>
              <TableCell className="font-medium">{data.id}</TableCell>
              <TableCell>{data.model}</TableCell>
              <TableCell>{data.manufacturer}</TableCell>
              <TableCell>{data.illness}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
