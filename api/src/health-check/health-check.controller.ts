import { Controller, Get } from '@nestjs/common';

@Controller('health-check')
export class HealthcheckController {
  @Get()
  healthCheck() {
    return { status: 'ok' };
  }
}
