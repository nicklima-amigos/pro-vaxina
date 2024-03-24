import { Test, TestingModule } from '@nestjs/testing';
import { VaccinationRecordsController } from './vaccination-records.controller';
import { VaccinationRecordsService } from './vaccination-records.service';

describe('VaccinationRecordsController', () => {
  let controller: VaccinationRecordsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VaccinationRecordsController],
      providers: [VaccinationRecordsService],
    }).compile();

    controller = module.get<VaccinationRecordsController>(VaccinationRecordsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
