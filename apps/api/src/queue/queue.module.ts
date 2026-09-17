import { Module } from '@nestjs/common';
import { QueueService } from './queue.service.js';
import { QueueGateway } from './queue.gateway.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  providers: [QueueService, QueueGateway],
  exports: [QueueService],
})
export class QueueModule {}
