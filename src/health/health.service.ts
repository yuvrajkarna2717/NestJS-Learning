import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class HealthService {
  constructor(private dataSource: DataSource) {}

  async check() {
    try {
      // Simple DB ping query
      await this.dataSource.query('SELECT 1');
      return {
        status: 'ok',
        database: 'connected',
      };
    } catch (error) {
      return {
        status: 'error',
        database: 'disconnected',
        error: error.message,
      };
    }
  }
}
