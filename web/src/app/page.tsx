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
import Link from 'next/link';

export default function Home() {
  // TODO: create interface for our vaccination-record
  const fakeVaccinationRecordData = [
    {
      id: '001',
      patient: 'John Doe',
      vaccine: 'Covid-19',
      recordedAt: '2021-10-10',
    },
    {
      id: '002',
      patient: 'Jane Smith',
      vaccine: 'Flu',
      recordedAt: '2021-10-10',
    },
    {
      id: '003',
      patient: 'Michael Johnson',
      vaccine: 'Tetanus',
      recordedAt: '2021-10-10',
    },
    {
      id: '004',
      patient: 'Alice Jones',
      vaccine: 'Measles',
      recordedAt: '2021-10-11',
    },
    {
      id: '005',
      patient: 'David Brown',
      vaccine: 'Hepatitis B',
      recordedAt: '2021-10-11',
    },
    {
      id: '006',
      patient: 'Sarah Lee',
      vaccine: 'Polio',
      recordedAt: '2021-10-11',
    },
    {
      id: '007',
      patient: 'Robert Garcia',
      vaccine: 'Chickenpox',
      recordedAt: '2021-10-12',
    },
    {
      id: '008',
      patient: 'Emily Wilson',
      vaccine: 'HPV',
      recordedAt: '2021-10-12',
    },
    {
      id: '009',
      patient: 'James Martinez',
      vaccine: 'Mumps',
      recordedAt: '2021-10-12',
    },
    {
      id: '010',
      patient: 'Olivia Taylor',
      vaccine: 'Pneumococcal',
      recordedAt: '2021-10-13',
    },
  ];
  return (
    <>
      <Header title="Bem-vindo ao Pro-Vaxina">
        <Link href="/patients">
          <Button variant="default">Pacientes</Button>
        </Link>
        <Link href="/vaccines">
          <Button variant="secondary">Vacinas</Button>
        </Link>
        {/* TODO: Route to our form to record a new vaccination-record */}
        <Link href="/record-vaccine">
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
          {/* TODO: fetch vaccination-records from our api */}
          {fakeVaccinationRecordData.map((data) => (
            <TableRow key={data.id}>
              <TableCell className="font-medium">{data.id}</TableCell>
              <TableCell>{data.patient}</TableCell>
              <TableCell>{data.vaccine}</TableCell>
              <TableCell>{data.recordedAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
