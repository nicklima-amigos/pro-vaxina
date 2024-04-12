import { Test, TestingModule } from '@nestjs/testing';
import { VaccinesService } from './vaccines.service';
import { mockRepositoryProviders } from '@src/tests/mocks/repository.mocks';

describe('VaccinesService', () => {
  let service: VaccinesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VaccinesService, ...mockRepositoryProviders],
    }).compile();

    service = module.get<VaccinesService>(VaccinesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
