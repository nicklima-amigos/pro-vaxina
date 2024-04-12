import { Test, TestingModule } from '@nestjs/testing';
import { PatientsService } from './patients.service';
import { mockRepositoryProviders } from '@src/tests/mocks/repository.mocks';

describe('PatientsService', () => {
  let service: PatientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatientsService, ...mockRepositoryProviders],
    }).compile();

    service = module.get<PatientsService>(PatientsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
