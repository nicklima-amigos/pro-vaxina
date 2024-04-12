import { Test, TestingModule } from '@nestjs/testing';
import { PatientsService } from './patients.service';
import { repositoryMocks } from '@src/tests/mocks';

describe('PatientsService', () => {
  let service: PatientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatientsService, ...repositoryMocks.providers],
    }).compile();

    service = module.get<PatientsService>(PatientsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
