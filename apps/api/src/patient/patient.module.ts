import { Module } from '@nestjs/common';
import { PatientService } from './patient.service.js';
import { PatientController } from './patient.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [PatientController],
  providers: [PatientService],
  exports: [PatientService],
})
export class PatientModule {}
