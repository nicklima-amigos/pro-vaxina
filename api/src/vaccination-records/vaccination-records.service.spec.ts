import { Test, TestingModule } from '@nestjs/testing';
import { VaccinationRecordsService } from './vaccination-records.service';
import { repositoryMocks } from '@src/tests/mocks';

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
});
