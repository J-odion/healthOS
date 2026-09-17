import { Module } from '@nestjs/common';
import { EmrService } from './emr.service.js';
import { EmrController } from './emr.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [EmrController],
  providers: [EmrService],
  exports: [EmrService],
})
export class EmrModule {}
