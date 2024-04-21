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
import { Vaccine } from '@/types/api';
import Link from 'next/link';

export default async function Vaccines() {
  const response = await apiClient.get<Vaccine[]>({
    endpoint: '/vaccines',
  });

  return (
    <>
      <Header title="Vaccines">
        <Link href="/register/vaccines">
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
