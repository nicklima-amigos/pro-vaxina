import { Test, TestingModule } from '@nestjs/testing';
import { VaccinesController } from './vaccines.controller';
import { VaccinesService } from './vaccines.service';
import { vaccineItem } from '../stubs/vaccines.stubs';
import {
  mockRepositoryProviders,
  vaccinesRepositoryMock,
} from '@src/mocks/repository.mocks';

describe('VaccinesController', () => {
  let controller: VaccinesController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VaccinesController],
      providers: [VaccinesService, ...mockRepositoryProviders],
    }).compile();

    controller = module.get<VaccinesController>(VaccinesController);

    await module.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should find one vaccine.', async () => {
    // arrange
    vaccinesRepositoryMock.findOne.mockResolvedValue(vaccineItem);

    //act
    const result = await controller.findOne(`${vaccineItem.id}`);

    //assert
    expect(result.id).toBe(vaccineItem.id);
    expect(result.model).toBe(vaccineItem.model);
    expect(result.illness).toBe(vaccineItem.illness);
  });
});
