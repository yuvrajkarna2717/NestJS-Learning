import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  async check() {
    const result = await this.healthService.check();
    return {
      uptime: process.uptime(),
      timestamp: new Date(),
      ...result,
    };
  }
}
