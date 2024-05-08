import { Test, TestingModule } from '@nestjs/testing';
import { PatientsService } from './patients.service';
import { repositoryMocks } from '@src/tests/mocks';
import { patientItems } from '@src/tests/stubs/patients.stubs';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

describe('PatientsService', () => {
  let service: PatientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatientsService, ...repositoryMocks.providers],
    }).compile();

    jest.clearAllMocks();

    service = module.get<PatientsService>(PatientsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all patients', async () => {
    repositoryMocks.patients.find.mockResolvedValue(patientItems);
    const patients = await service.findAll();
    expect(patients).toEqual(patientItems);
  });

  it('should return a patient by id', async () => {
    repositoryMocks.patients.findOne.mockResolvedValue(patientItems[0]);
    const patient = await service.findOne(1);
    expect(repositoryMocks.patients.findOne).toHaveBeenCalledWith({
      where: {
        id: 1,
      },
    });
    expect(patient).toEqual(patientItems[0]);
  });

  it('should create a patient', async () => {
    const patientToCreate: CreatePatientDto = {
      fullName: 'John Doe of Silva',
      cpf: '12345678901',
      birthDate: new Date('1990-01-01'),
    };

    const expectedPatient = { ...patientToCreate, id: 1 };

    repositoryMocks.patients.save.mockResolvedValue(expectedPatient);

    const patient = await service.create(patientToCreate);

    expect(repositoryMocks.patients.save).toHaveBeenCalledWith(patientToCreate);

    expect(patient).toEqual(expectedPatient);
  });

  it('should update a patient', async () => {
    const patientToUpdate: UpdatePatientDto = {
      fullName: 'John Doe of Silva',
      cpf: '12345678901',
      birthDate: new Date('1990-01-01'),
    };

    const expectedPatient = { ...patientToUpdate, id: 1 };

    repositoryMocks.patients.save.mockResolvedValue(expectedPatient);

    const patient = await service.update(expectedPatient.id, patientToUpdate);

    expect(repositoryMocks.patients.save).toHaveBeenCalledWith({
      ...patientToUpdate,
      id: expectedPatient.id,
    });

    expect(patient).toEqual(expectedPatient);
  });

  it('should delete a patient', async () => {
    const affected = 1;
    repositoryMocks.patients.delete.mockResolvedValue({ affected });
    const deleteResult = await service.remove(patientItems[0].id);
    expect(deleteResult.affected).toBe(1);
  });
});
