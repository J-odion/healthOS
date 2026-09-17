import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service.js';
import { AppointmentController } from './appointment.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { BullModule } from '@nestjs/bullmq';
import { AppointmentProcessor } from './appointment.processor.js';

@Module({
  imports: [
    PrismaModule,
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'reminders',
    }),
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService, AppointmentProcessor],
  exports: [AppointmentService],
})
export class AppointmentModule {}
