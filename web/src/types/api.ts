export interface ApiEntity {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
}
export interface Patient extends ApiEntity {
  fullName: string;
  cpf: string;
  birthDate: string;
}

export interface Vaccine extends ApiEntity {
  model: string;
  manufacturer: string;
  illness: string;
  expirationDate: string;
}

export interface VaccinationRecord extends ApiEntity {
  applierName: string;
  vaccine: Vaccine;
  patient: Patient;
}
