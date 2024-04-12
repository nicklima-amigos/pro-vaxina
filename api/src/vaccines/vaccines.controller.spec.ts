import { Test, TestingModule } from '@nestjs/testing';
import { VaccinesController } from './vaccines.controller';
import { VaccinesService } from './vaccines.service';
import { vaccineItem } from '@src/tests/stubs/vaccines.stubs';
import { repositoryMocks } from '@src/tests/mocks';
import { Agent, agent } from 'supertest';
import { HttpStatus } from '@nestjs/common';

describe('VaccinesController', () => {
  let controller: VaccinesController;
  let request: Agent;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VaccinesController],
      providers: [VaccinesService, ...repositoryMocks.providers],
    }).compile();

    controller = module.get<VaccinesController>(VaccinesController);

    await module.init();

    const app = module.createNestApplication();

    request = agent(app.getHttpServer());
    await app.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should find one vaccine', async () => {
    // arrange
    repositoryMocks.vaccines.findOne.mockResolvedValue(vaccineItem);

    //act
    const { body, status } = await request.get('/vaccines/1');

    //assert
    expect(status).toBe(HttpStatus.OK);
    expect(repositoryMocks.vaccines.findOne).toHaveBeenCalled();
    expect(body.id).toBe(vaccineItem.id);
    expect(body.model).toBe(vaccineItem.model);
    expect(body.illness).toBe(vaccineItem.illness);
  });

  it('should find many vaccines', async () => {
    //arrange
    repositoryMocks.vaccines.find.mockResolvedValue([vaccineItem]);

    // act
    const {
      body: [firstVaccine],
      status,
    } = await request.get('/vaccines');

    // assert
    expect(status).toBe(HttpStatus.OK);
    expect(repositoryMocks.vaccines.find).toHaveBeenCalled();
    expect(firstVaccine.id).toBe(vaccineItem.id);
    expect(firstVaccine.model).toBe(vaccineItem.model);
    expect(firstVaccine.illness).toBe(vaccineItem.illness);
  });
});
