import { Test, TestingModule } from '@nestjs/testing';
import { VaccinationRecordsController } from './vaccination-records.controller';
import { VaccinationRecordsService } from './vaccination-records.service';
import { repositoryMocks } from '@src/tests/mocks';

describe('VaccinationRecordsController', () => {
  let controller: VaccinationRecordsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VaccinationRecordsController],
      providers: [VaccinationRecordsService, ...repositoryMocks.providers],
    }).compile();

    controller = module.get<VaccinationRecordsController>(
      VaccinationRecordsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
