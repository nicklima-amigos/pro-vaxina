import { Test, TestingModule } from '@nestjs/testing';
import { VaccinesController } from './vaccines.controller';
import { VaccinesService } from './vaccines.service';

describe('VaccinesController', () => {
  let controller: VaccinesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VaccinesController],
      providers: [VaccinesService],
    }).compile();

    controller = module.get<VaccinesController>(VaccinesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
