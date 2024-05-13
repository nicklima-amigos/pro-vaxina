import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { repositoryMocks } from '@src/tests/mocks';
import { vaccineItems } from '@src/tests/stubs/vaccines.stubs';
import { stringifyObjectDates } from '@src/tests/utils/transform-dates';
import { Agent, agent } from 'supertest';
import { Vaccine } from './entities/vaccine.entity';
import { VaccinesController } from './vaccines.controller';
import { VaccinesService } from './vaccines.service';

describe('VaccinesController', () => {
  let controller: VaccinesController;
  let request: Agent;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VaccinesController],
      providers: [VaccinesService, ...repositoryMocks.providers],
    }).compile();

    controller = module.get<VaccinesController>(VaccinesController);

    jest.clearAllMocks();

    await module.init();

    const app = module.createNestApplication();

    request = agent(app.getHttpServer());
    await app.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should find one vaccine', async () => {
    repositoryMocks.vaccines.findOne.mockResolvedValue(vaccineItems[0]);

    const { body, status } = await request.get(
      `/vaccines/${vaccineItems[0].id}`,
    );

    expect(status).toBe(HttpStatus.OK);
    expect(repositoryMocks.vaccines.findOne).toHaveBeenCalledWith({
      where: { id: vaccineItems[0].id },
    });
    expect(body).toEqual(stringifyObjectDates(vaccineItems[0]));
  });

  it('should find many vaccines', async () => {
    repositoryMocks.vaccines.find.mockResolvedValue(vaccineItems);

    const { body, status } = await request.get('/vaccines');

    expect(status).toBe(HttpStatus.OK);
    expect(repositoryMocks.vaccines.find).toHaveBeenCalled();
    expect(body).toEqual(vaccineItems.map(stringifyObjectDates));
  });

  it('should create a vaccine', async () => {
    const vaccineToCreate = {
      model: 'test vaccine',
      manufacturer: 'test vaccine manufacturer',
      illness: 'test illness',
      expirationDate: '2030-01-01',
    };

    const expectedVaccine: Vaccine = {
      ...vaccineToCreate,
      id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      expirationDate: new Date(vaccineToCreate.expirationDate),
    };
    repositoryMocks.vaccines.save.mockResolvedValue(expectedVaccine);

    const { status, body } = await request
      .post('/vaccines')
      .send(vaccineToCreate);

    expect(status).toBe(HttpStatus.CREATED);
    expect(body).toEqual(stringifyObjectDates(expectedVaccine));
    expect(repositoryMocks.vaccines.save).toHaveBeenCalledWith(vaccineToCreate);
  });

  it('should update a vaccine', async () => {
    const vaccineToUpdate = {
      model: 'modified test vaccine',
    };

    const expectedVaccine: Vaccine = {
      ...vaccineItems[0],
      ...vaccineToUpdate,
    };

    repositoryMocks.vaccines.save.mockResolvedValue(expectedVaccine);

    const { status, body } = await request
      .patch(`/vaccines/${vaccineItems[0].id}`)
      .send(vaccineToUpdate);

    expect(status).toBe(HttpStatus.OK);
    expect(body).toEqual(stringifyObjectDates(expectedVaccine));
    expect(repositoryMocks.vaccines.save).toHaveBeenCalledWith({
      ...vaccineToUpdate,
      id: expectedVaccine.id,
    });
  });

  it('should delete a vaccine', async () => {
    repositoryMocks.vaccines.delete.mockResolvedValue({ raw: {}, affected: 1 });

    const { status } = await request.delete(`/vaccines/${vaccineItems[0].id}`);

    expect(status).toBe(HttpStatus.NO_CONTENT);
    expect(repositoryMocks.vaccines.delete).toHaveBeenCalledWith({
      id: vaccineItems[0].id,
    });
  });
});
