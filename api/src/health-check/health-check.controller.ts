import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthcheckController {
  @Get()
  healthCheck() {
    return { status: 'ok' };
  }
}
