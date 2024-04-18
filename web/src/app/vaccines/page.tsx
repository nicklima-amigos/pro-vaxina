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
  const vaccines = [
    {
      id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      model: 'Model 1',
      manufacturer: 'Manufacturer 1',
      illness: 'Illness 1',
    },
    {
      id: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
      model: 'Model 2',
      manufacturer: 'Manufacturer 2',
      illness: 'Illness 2',
    },
    {
      id: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
      model: 'Model 3',
      manufacturer: 'Manufacturer 3',
      illness: 'Illness 3',
    },
    {
      id: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
      model: 'Model 4',
      manufacturer: 'Manufacturer 4',
      illness: 'Illness 4',
    },
    {
      id: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
      model: 'Model 5',
      manufacturer: 'Manufacturer 5',
      illness: 'Illness 5',
    },
    {
      id: 6,
      createdAt: new Date(),
      updatedAt: new Date(),
      model: 'Model 6',
      manufacturer: 'Manufacturer 6',
      illness: 'Illness 6',
    },
    {
      id: 7,
      createdAt: new Date(),
      updatedAt: new Date(),
      model: 'Model 7',
      manufacturer: 'Manufacturer 7',
      illness: 'Illness 7',
    },
    {
      id: 8,
      createdAt: new Date(),
      updatedAt: new Date(),
      model: 'Model 8',
      manufacturer: 'Manufacturer 8',
      illness: 'Illness 8',
    },
    {
      id: 9,
      createdAt: new Date(),
      updatedAt: new Date(),
      model: 'Model 9',
      manufacturer: 'Manufacturer 9',
      illness: 'Illness 9',
    },
    {
      id: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
      model: 'Model 10',
      manufacturer: 'Manufacturer 10',
      illness: 'Illness 10',
    },
  ];

  return (
    <>
      <Header title="Vaccines">
        {/* TODO: Route to our form to register a new vaccine inside our system */}

        <Link href="/register-patient">
          <Button variant="default">Register</Button>
        </Link>
        <Link href="/">
          <Button variant="destructive">Go Back</Button>
        </Link>
      </Header>
      <Table>
        <TableCaption>A list of our active vaccines.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Identification</TableHead>
            <TableHead>Model</TableHead>
            <TableHead>Manufacturer</TableHead>
            <TableHead>Illness</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* TODO: fetch vaccines from our api */}
          {vaccines.map((data) => (
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
