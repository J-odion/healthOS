import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { HealthController } from './health.controller.js';
import { AuthModule } from './auth/auth.module.js';
import { DepartmentModule } from './department/department.module.js';
import { PatientModule } from './patient/patient.module.js';
import { AppointmentModule } from './appointment/appointment.module.js';
import { ScheduleModule } from './schedule/schedule.module.js';
import { QueueModule } from './queue/queue.module.js';
import { EmrModule } from './emr/emr.module.js';
import { ConsultationModule } from './consultation/consultation.module.js';
import { LabModule } from './lab/lab.module.js';
import { PharmacyModule } from './pharmacy/pharmacy.module.js';
import { BillingModule } from './billing/billing.module.js';
import { StorageModule } from './storage/storage.module.js';
import { NotificationModule } from './notification/notification.module.js';
import { TelemedicineModule } from './telemedicine/telemedicine.module.js';
import { PrismaModule } from './prisma/prisma.module.js';

@Module({
  imports: [AuthModule, DepartmentModule, PatientModule, AppointmentModule, ScheduleModule, QueueModule, EmrModule, ConsultationModule, LabModule, PharmacyModule, BillingModule, StorageModule, NotificationModule, TelemedicineModule, PrismaModule],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
