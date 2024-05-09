import { agent, Agent } from 'supertest';
import { Test } from '@nestjs/testing';
import { HealthcheckController } from './health-check.controller';
import { HttpStatus } from '@nestjs/common';

describe('HealthcheckController', () => {
  let controller: HealthcheckController;
  let request: Agent;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [HealthcheckController],
    }).compile();

    controller = module.get<HealthcheckController>(HealthcheckController);
    const app = module.createNestApplication();

    request = agent(app.getHttpServer());
    await app.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should respond with status ok and a message', async () => {
    const { status, body } = await request.get('/');

    expect(status).toBe(HttpStatus.OK);
    expect(body).toHaveProperty('status');
    expect(body.status).toBe('ok');
  });
});
