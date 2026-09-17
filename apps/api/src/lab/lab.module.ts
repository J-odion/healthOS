import { Module } from '@nestjs/common';
import { LabService } from './lab.service.js';
import { LabController } from './lab.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { QueueModule } from '../queue/queue.module.js';

@Module({
  imports: [PrismaModule, QueueModule],
  controllers: [LabController],
  providers: [LabService],
})
export class LabModule {}
