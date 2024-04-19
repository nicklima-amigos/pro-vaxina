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

export default function Vaccines() {
  // TODO: create interface for our vaccination-record
  const fakePatients = [
    {
      id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      fullName: 'John Doe',
      cpf: '123.456.789-00',
      birthDate: new Date('1990-01-01'),
      records: [],
    },
    {
      id: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
      fullName: 'Jane Smith',
      cpf: '987.654.321-00',
      birthDate: new Date('1985-05-10'),
      records: [],
    },
    {
      id: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
      fullName: 'Michael Johnson',
      cpf: '456.789.123-00',
      birthDate: new Date('1978-08-15'),
      records: [],
    },
    {
      id: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
      fullName: 'Emily Wilson',
      cpf: '654.321.987-00',
      birthDate: new Date(),
      records: [],
    },
    {
      id: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
      fullName: 'David Brown',
      cpf: '789.123.456-00',
      birthDate: new Date('1975-04-05'),
      records: [],
    },
    {
      id: 6,
      createdAt: new Date(),
      updatedAt: new Date(),
      fullName: 'Sarah Lee',
      cpf: '321.987.654-00',
      birthDate: new Date('1992-09-30'),
      records: [],
    },
    {
      id: 7,
      createdAt: new Date(),
      updatedAt: new Date(),
      fullName: 'Robert Garcia',
      cpf: '234.567.890-00',
      birthDate: new Date('1988-02-14'),
      records: [],
    },
    {
      id: 8,
      createdAt: new Date(),
      updatedAt: new Date(),
      fullName: 'Olivia Taylor',
      cpf: '890.123.456-00',
      birthDate: new Date('1996-06-25'),
      records: [],
    },
    {
      id: 9,
      createdAt: new Date(),
      updatedAt: new Date(),
      fullName: 'James Martinez',
      cpf: '567.890.123-00',
      birthDate: new Date('1980-07-10'),
      records: [],
    },
    {
      id: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
      fullName: 'Alice Jones',
      cpf: '345.678.901-00',
      birthDate: new Date('1998-03-15'),
      records: [],
    },
  ];
  return (
    <>
      <Header title="Pacientes">
        {/* TODO: Route to our form to register a new patient inside our system */}
        <Link href="/register-patient">
          <Button variant="default">Registrar</Button>
        </Link>
        <Link href="/">
          <Button variant="destructive">Voltar</Button>
        </Link>
      </Header>
      <Table>
        <TableCaption>Lista dos pacientes</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Identificação</TableHead>
            <TableHead>Paciente</TableHead>
            <TableHead>Vacina</TableHead>
            <TableHead>Vacinado em</TableHead>
            <TableHead>Ação</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* TODO: fetch patients from our api */}
          {fakePatients.map((data) => (
            <TableRow key={data.id}>
              <TableCell className="font-medium">{data.id}</TableCell>
              <TableCell>{data.fullName}</TableCell>
              <TableCell>{data.cpf}</TableCell>
              <TableCell>{data.birthDate.toDateString()}</TableCell>
              <TableCell>
                {/* TODO: patient records page, similar to this page*/}
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
