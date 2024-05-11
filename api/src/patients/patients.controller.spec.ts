import { Test, TestingModule } from '@nestjs/testing';
import { PatientsController } from './patients.controller';
import { PatientsService } from './patients.service';
import { repositoryMocks } from '@src/tests/mocks';
import { Agent, agent } from 'supertest';
import { HttpStatus } from '@nestjs/common';
import { patientItems } from '@src/tests/stubs/patients.stubs';
import { Patient } from './entities/patient.entity';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { stringifyObjectDates } from '@src/tests/utils/transform-dates';

describe('PatientsController', () => {
  let controller: PatientsController;
  let request: Agent;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientsController],
      providers: [PatientsService, ...repositoryMocks.providers],
    }).compile();

    jest.clearAllMocks();

    controller = module.get<PatientsController>(PatientsController);

    const app = module.createNestApplication();

    request = agent(app.getHttpServer());
    await app.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a patient', async () => {
    const patientToCreate = {
      fullName: 'John Doe of Silva',
      cpf: '12345678901',
      birthDate: '1990-01-01',
    };

    const createdPatient: Patient = {
      ...patientToCreate,
      id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      birthDate: new Date(patientToCreate.birthDate),
      records: [],
    };

    repositoryMocks.patients.save.mockResolvedValue(createdPatient);

    const expectedPatient = stringifyObjectDates(createdPatient);

    const { body, status } = await request
      .post('/patients')
      .send(patientToCreate);

    expect(repositoryMocks.patients.save).toHaveBeenCalledWith(patientToCreate);
    expect(status).toBe(HttpStatus.CREATED);
    expect(body).toEqual(expectedPatient);
  });

  it('should find all patients', async () => {
    repositoryMocks.patients.find.mockResolvedValue(patientItems);
    const expectedPatients = patientItems.map(stringifyObjectDates);
    const { body, status } = await request.get('/patients');
    expect(repositoryMocks.patients.find).toHaveBeenCalled();
    expect(status).toBe(HttpStatus.OK);
    expect(body).toEqual(expectedPatients);
  });

  it('should find one patient', async () => {
    repositoryMocks.patients.findOne.mockResolvedValue(patientItems[0]);
    const expectedPatient = stringifyObjectDates(patientItems[0]);
    const { body, status } = await request.get(
      `/patients/${patientItems[0].id}`,
    );
    expect(repositoryMocks.patients.findOne).toHaveBeenCalledWith({
      where: { id: patientItems[0].id },
    });
    expect(status).toBe(HttpStatus.OK);
    expect(body).toEqual(expectedPatient);
  });

  it('should update a patient', async () => {
    const patientToUpdate: UpdatePatientDto = {
      fullName: 'Updated Patient',
    };
    const returnedPatient: Patient = {
      ...patientItems[0],
      ...patientToUpdate,
    };
    repositoryMocks.patients.save.mockResolvedValue(returnedPatient);
    const expectedPatient = stringifyObjectDates(returnedPatient);
    const { body, status } = await request
      .patch(`/patients/${patientItems[0].id}`)
      .send(patientToUpdate);
    expect(repositoryMocks.patients.save).toHaveBeenCalledWith({
      id: returnedPatient.id,
      ...patientToUpdate,
    });
    expect(status).toBe(HttpStatus.OK);
    expect(body).toStrictEqual(expectedPatient);
  });

  it('should delete a patient', async () => {
    repositoryMocks.patients.delete.mockResolvedValue({ affected: 1, raw: {} });
    const { status } = await request.delete(`/patients/${patientItems[0].id}`);
    expect(repositoryMocks.patients.delete).toHaveBeenCalledWith({
      id: patientItems[0].id,
    });
    expect(status).toBe(HttpStatus.NO_CONTENT);
  });
});
