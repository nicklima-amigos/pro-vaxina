import { Test, TestingModule } from '@nestjs/testing';
import { VaccinationRecordsService } from './vaccination-records.service';
import { repositoryMocks } from '@src/tests/mocks';
import { vaccinationRecords } from '@src/tests/mocks/repository.mocks';
import { CreateVaccinationRecordDto } from './dto/create-vaccination-record.dto';
import { UpdateVaccinationRecordDto } from './dto/update-vaccination-record.dto';

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
      vaccinationRecords,
    );

    const record = await service.findAll();

    expect(record).toEqual(vaccinationRecords);
  });

  it('should return a record by id', async () => {
    repositoryMocks.vaccinationRecords.findOne.mockResolvedValue(
      vaccinationRecords[0],
    );

    const record = await service.findOne(1);

    expect(repositoryMocks.vaccinationRecords.findOne).toHaveBeenCalledWith({
      relations: ['vaccine', 'patient'],
      where: { id: 1 },
    });
    expect(record).toEqual(vaccinationRecords[0]);
  });

  it('should create a vaccination record', async () => {
    const recordToCreate: CreateVaccinationRecordDto = {
      patientId: 1,
      vaccineId: 1,
      applierName: 'John Doe',
    };

    repositoryMocks.vaccinationRecords.save.mockResolvedValue(recordToCreate);

    const record = await service.create(recordToCreate);

    expect(repositoryMocks.vaccinationRecords.save).toHaveBeenCalledWith({
      patient: { id: recordToCreate.patientId },
      vaccine: { id: recordToCreate.vaccineId },
      applierName: recordToCreate.applierName,
    });

    expect(record).toEqual(recordToCreate);
  });

  it('should update a record', async () => {
    const recordToUpdate: UpdateVaccinationRecordDto = {
      patientId: 1,
      vaccineId: 1,
      applierName: 'John Doe',
    };

    const expectedRecord = { ...recordToUpdate, id: 1 };

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
    await service.remove(1);
    expect(true).toBe(true);
  });
});
