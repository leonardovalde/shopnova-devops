import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller.js';

describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('responde status ok con la hora en formato ISO', () => {
    const respuesta = controller.check();

    expect(respuesta.status).toBe('ok');
    expect(new Date(respuesta.timestamp).toISOString()).toBe(respuesta.timestamp);
  });
});
