import { Test, TestingModule } from '@nestjs/testing';
import { VaccinationRecordsService } from './vaccination-records.service';
import { repositoryMocks } from '@src/tests/mocks';
import { CreateVaccinationRecordDto } from './dto/create-vaccination-record.dto';
import { UpdateVaccinationRecordDto } from './dto/update-vaccination-record.dto';
import { vaccinationRecordItems } from '@src/tests/stubs/vaccination-records.stubs';
import { patientItems } from '@src/tests/stubs/patients.stubs';
import { vaccineItems } from '@src/tests/stubs/vaccines.stubs';
import { VaccinationRecord } from './entities/vaccination-record.entity';
import { DeleteResult } from 'typeorm';

describe('VaccinationRecordsService', () => {
  let service: VaccinationRecordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VaccinationRecordsService, ...repositoryMocks.providers],
    }).compile();

    service = module.get<VaccinationRecordsService>(VaccinationRecordsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all records', async () => {
    repositoryMocks.vaccinationRecords.find.mockResolvedValue(
      vaccinationRecordItems,
    );

    const record = await service.findAll();

    expect(record).toEqual(vaccinationRecordItems);
  });

  it('should return a record by id', async () => {
    repositoryMocks.vaccinationRecords.findOne.mockResolvedValue(
      vaccinationRecordItems[0],
    );

    const record = await service.findOne(1);

    expect(repositoryMocks.vaccinationRecords.findOne).toHaveBeenCalledWith({
      relations: ['vaccine', 'patient'],
      where: { id: 1 },
    });
    expect(record).toEqual(vaccinationRecordItems[0]);
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

    const record = await service.create(recordToCreate);

    expect(repositoryMocks.vaccinationRecords.save).toHaveBeenCalledWith({
      patient: { id: recordToCreate.patientId },
      vaccine: { id: recordToCreate.vaccineId },
      applierName: recordToCreate.applierName,
    });
    expect(record).toEqual(expectedRecord);
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

    const record = await service.update(expectedRecord.id, recordToUpdate);

    expect(repositoryMocks.vaccinationRecords.save).toHaveBeenCalledWith({
      patientId: recordToUpdate.patientId,
      vaccineId: recordToUpdate.vaccineId,
      applierName: recordToUpdate.applierName,
      id: expectedRecord.id,
    });

    expect(record).toEqual(expectedRecord);
  });

  it('should delete a record', async () => {
    const expectedResult: DeleteResult = { raw: {}, affected: 1 };
    repositoryMocks.vaccinationRecords.delete.mockResolvedValue(expectedResult);

    const deleteResult = await service.remove(vaccinationRecordItems[0].id);

    expect(repositoryMocks.vaccinationRecords.delete).toHaveBeenCalledWith({
      id: vaccinationRecordItems[0].id,
    });
    expect(deleteResult).toBe(expectedResult);
  });
});
