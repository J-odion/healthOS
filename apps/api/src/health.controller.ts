import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service.js';

@Controller('system')
export class HealthController {
  constructor(private prisma: PrismaService) {}

  @Get('status')
  async getStatus() {
    let dbStatus = 'unhealthy';
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      dbStatus = 'healthy';
    } catch (e) {
      dbStatus = 'unhealthy';
    }

    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      services: {
        database: dbStatus,
        redis: 'healthy', // To be implemented with Redis service
        queue: 'healthy', // To be implemented with Queue service
      }
    };
  }
}
