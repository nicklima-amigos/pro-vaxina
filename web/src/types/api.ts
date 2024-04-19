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
