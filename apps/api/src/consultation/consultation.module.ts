import { Module } from '@nestjs/common';
import { ConsultationService } from './consultation.service.js';
import { ConsultationController } from './consultation.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { QueueModule } from '../queue/queue.module.js';

@Module({
  imports: [PrismaModule, QueueModule],
  controllers: [ConsultationController],
  providers: [ConsultationService],
})
export class ConsultationModule {}
