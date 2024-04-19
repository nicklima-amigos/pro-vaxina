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
import { apiClient } from '@/services/api-client';
import Link from 'next/link';

export interface Patient {
  id: number;
  createtAt: string;
  updatedAt: string;
  fullName: string;
  cpf: string;
  birthstring: Date;
}

export interface Vaccine {
  id: number;
  createdAt: string;
  updatedAt: string;
  model: string;
  manufacturer: string;
  illness: string;
  expirationstring: string;
}

export interface VaccinationRecord {
  id: number;
  createdAt: string;
  updatedAt: string;
  applierName: string;
  vaccine: Vaccine;
  patient: Patient;
}

export default async function Home() {
  const { data } = await apiClient.get<VaccinationRecord[]>({
    endpoint: '/vaccination-records',
  });

  return (
    <>
      <Header title="Welcome to Pro-Vaxina">
        <Link href="/patients">
          <Button variant="default">Patients</Button>
        </Link>
        <Link href="/vaccines">
          <Button variant="secondary">Vaccines</Button>
        </Link>
        {/* TODO: Route to our form to record a new vaccination-record */}
        <Link href="/record-vaccine">
          <Button variant="red" className="animate-pulse">
            VACCINE NOW!
          </Button>
        </Link>
      </Header>
      <Table>
        <TableCaption>A list of your recent vaccinations.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Identification</TableHead>
            <TableHead>Patient</TableHead>
            <TableHead>Vaccine</TableHead>
            <TableHead>RecordedAt</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* TODO: fetch vaccination-records from our api */}
          {data.map((row) => {
            console.log({ row });
            return (
              <TableRow key={row.id}>
                <TableCell className="font-medium">{row.id}</TableCell>
                <TableCell>{row.patient.fullName}</TableCell>
                <TableCell>{row.vaccine.model}</TableCell>
                <TableCell>{row.createdAt}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}
