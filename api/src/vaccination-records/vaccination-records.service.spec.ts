import { Test, TestingModule } from '@nestjs/testing';
import { VaccinationRecordsService } from './vaccination-records.service';

describe('VaccinationRecordsService', () => {
  let service: VaccinationRecordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VaccinationRecordsService],
    }).compile();

    service = module.get<VaccinationRecordsService>(VaccinationRecordsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
