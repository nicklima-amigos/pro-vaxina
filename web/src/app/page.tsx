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
