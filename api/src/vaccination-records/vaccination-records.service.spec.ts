import { Test, TestingModule } from '@nestjs/testing';
import { VaccinationRecordsService } from './vaccination-records.service';
import { mockRepositoryProviders } from '@src/tests/mocks/repository.mocks';

describe('VaccinationRecordsService', () => {
  let service: VaccinationRecordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VaccinationRecordsService, ...mockRepositoryProviders],
    }).compile();

    service = module.get<VaccinationRecordsService>(VaccinationRecordsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
