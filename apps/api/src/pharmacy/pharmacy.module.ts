import { Module } from '@nestjs/common';
import { PharmacyService } from './pharmacy.service.js';
import { PharmacyController } from './pharmacy.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { QueueModule } from '../queue/queue.module.js';

@Module({
  imports: [PrismaModule, QueueModule],
  controllers: [PharmacyController],
  providers: [PharmacyService],
})
export class PharmacyModule {}
