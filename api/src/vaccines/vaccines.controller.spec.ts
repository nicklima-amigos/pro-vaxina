import { Test, TestingModule } from '@nestjs/testing';
import { VaccinesController } from './vaccines.controller';
import { VaccinesService } from './vaccines.service';
import { repositoryMocks } from '@src/tests/mocks';
import { Agent, agent } from 'supertest';
import { HttpStatus } from '@nestjs/common';
import { vaccineItems } from '@src/tests/stubs/vaccines.stubs';

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
    repositoryMocks.vaccines.findOne.mockResolvedValue(vaccineItems[0]);

    //act
    const { body, status } = await request.get('/vaccines/1');

    //assert
    expect(status).toBe(HttpStatus.OK);
    expect(repositoryMocks.vaccines.findOne).toHaveBeenCalled();
    expect(body.id).toBe(vaccineItems[0].id);
    expect(body.model).toBe(vaccineItems[0].model);
    expect(body.illness).toBe(vaccineItems[0].illness);
  });

  it('should find many vaccines', async () => {
    //arrange
    repositoryMocks.vaccines.find.mockResolvedValue(vaccineItems);

    // act
    const {
      body: [firstVaccine],
      status,
    } = await request.get('/vaccines');

    // assert
    expect(status).toBe(HttpStatus.OK);
    expect(repositoryMocks.vaccines.find).toHaveBeenCalled();
    expect(firstVaccine.id).toBe(vaccineItems[0].id);
    expect(firstVaccine.model).toBe(vaccineItems[0].model);
    expect(firstVaccine.illness).toBe(vaccineItems[0].illness);
  });
});
