import { Test, TestingModule } from '@nestjs/testing';
import { VaccinationRecordsController } from './vaccination-records.controller';
import { VaccinationRecordsService } from './vaccination-records.service';
import { repositoryMocks } from '@src/tests/mocks';
import { vaccinationRecordItems } from '@src/tests/stubs/vaccination-records.stubs';
import { Agent, agent } from 'supertest';
import { HttpStatus } from '@nestjs/common';
import { patientItems } from '@src/tests/stubs/patients.stubs';
import { vaccineItems } from '@src/tests/stubs/vaccines.stubs';
import { VaccinationRecord } from './entities/vaccination-record.entity';
import { CreateVaccinationRecordDto } from './dto/create-vaccination-record.dto';
import { UpdateVaccinationRecordDto } from './dto/update-vaccination-record.dto';
import { stringifyObjectDates } from '@src/tests/utils/transform-dates';

describe('VaccinationRecordsController', () => {
  let controller: VaccinationRecordsController;
  let request: Agent;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VaccinationRecordsController],
      providers: [VaccinationRecordsService, ...repositoryMocks.providers],
    }).compile();
    controller = module.get<VaccinationRecordsController>(
      VaccinationRecordsController,
    );

    jest.clearAllMocks();

    const app = module.createNestApplication();

    request = agent(app.getHttpServer());

    await app.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all records', async () => {
    repositoryMocks.vaccinationRecords.find.mockResolvedValue(
      vaccinationRecordItems,
    );

    const { status, body } = await request.get('/vaccination-records');

    expect(status).toBe(HttpStatus.OK);
    expect(body).toEqual(vaccinationRecordItems.map(stringifyObjectDates));
    expect(repositoryMocks.vaccinationRecords.find).toHaveBeenCalled();
  });

  it('should return a record by id', async () => {
    repositoryMocks.vaccinationRecords.findOne.mockResolvedValue(
      vaccinationRecordItems[0],
    );

    const { status, body } = await request.get(
      `/vaccination-records/${vaccinationRecordItems[0].id}`,
    );

    expect(body).toEqual(stringifyObjectDates(vaccinationRecordItems[0]));
    expect(status).toBe(HttpStatus.OK);
    expect(repositoryMocks.vaccinationRecords.findOne).toHaveBeenCalledWith({
      relations: ['vaccine', 'patient'],
      where: { id: vaccinationRecordItems[0].id },
    });
    expect(body).toEqual(vaccinationRecordItems[0]);
  });

  it('should find records based on a patient', async () => {
    repositoryMocks.vaccinationRecords.find.mockResolvedValue(
      vaccinationRecordItems,
    );

    const { status, body } = await request.get(
      `/vaccination-records/patient/${patientItems[0].id}`,
    );

    expect(status).toEqual(HttpStatus.OK);
    expect(body).toEqual(stringifyObjectDates(vaccinationRecordItems));
    expect(repositoryMocks.vaccinationRecords.find).toHaveBeenCalledWith({
      where: { patient: { id: patientItems[0].id } },
      relations: ['vaccine'],
    });
  });

  it('should create a vaccination record', async () => {
    const recordToCreate: CreateVaccinationRecordDto = {
      patientId: patientItems[0].id,
      vaccineId: vaccineItems[0].id,
      applierName: 'John Doe',
    };

    const expectedRecord: VaccinationRecord = {
      id: 1,
      applierName: recordToCreate.applierName,
      createdAt: new Date(),
      updatedAt: new Date(),
      patient: patientItems[0],
      vaccine: vaccineItems[0],
    };

    repositoryMocks.vaccinationRecords.save.mockResolvedValue(expectedRecord);

    const { status, body } = await request
      .post('/vaccination-records')
      .send(recordToCreate);

    expect(status).toBe(HttpStatus.CREATED);
    expect(body).toEqual(stringifyObjectDates(expectedRecord));
    expect(repositoryMocks.vaccinationRecords.save).toHaveBeenCalledWith({
      patient: { id: recordToCreate.patientId },
      vaccine: { id: recordToCreate.vaccineId },
      applierName: recordToCreate.applierName,
    });
  });

  it('should update a record', async () => {
    const existingRecord = vaccinationRecordItems[0];
    const recordToUpdate: UpdateVaccinationRecordDto = {
      patientId: patientItems[0].id,
      vaccineId: vaccineItems[0].id,
      applierName: 'John Doe',
    };

    const expectedRecord: VaccinationRecord = {
      ...existingRecord,
      patient: { ...existingRecord.patient, id: recordToUpdate.patientId },
      vaccine: { ...existingRecord.vaccine, id: recordToUpdate.vaccineId },
      applierName: recordToUpdate.applierName,
    };

    repositoryMocks.vaccinationRecords.save.mockResolvedValue(expectedRecord);

    const { status, body } = await request
      .patch(`/vaccination-records/${vaccinationRecordItems[0].id}`)
      .send(recordToUpdate);

    expect(status).toBe(HttpStatus.OK);
    expect(body).toEqual(stringifyObjectDates(expectedRecord));
    expect(repositoryMocks.vaccinationRecords.save).toHaveBeenCalledWith({
      ...recordToUpdate,
      id: expectedRecord.id,
    });
  });

  it('should delete a record', async () => {
    repositoryMocks.vaccinationRecords.delete.mockResolvedValue({
      raw: {},
      affected: 1,
    });

    const { status } = await request.delete(
      `/vaccination-records/${vaccinationRecordItems[0].id}`,
    );

    expect(status).toBe(HttpStatus.NO_CONTENT);
    expect(repositoryMocks.vaccinationRecords.delete).toHaveBeenCalledWith({
      id: vaccinationRecordItems[0].id,
    });
  });
});
