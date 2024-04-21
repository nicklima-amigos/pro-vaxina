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
          <Button variant="default">Register</Button>
        </Link>
        <Link href="/">
          <Button variant="destructive">Go Back</Button>
        </Link>
      </Header>
      <Table>
        <TableCaption>A list of our active patients.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Identification</TableHead>
            <TableHead>Patient</TableHead>
            <TableHead>Vaccine</TableHead>
            <TableHead>RecordedAt</TableHead>
            <TableHead>Action</TableHead>
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
                  <Button variant="secondary">Records</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
