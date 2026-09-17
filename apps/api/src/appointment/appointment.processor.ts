import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('reminders')
export class AppointmentProcessor extends WorkerHost {
  async process(job: Job<any, any, string>): Promise<any> {
    console.log(`Processing reminder job ${job.id} for appointment: ${job.data.appointmentId}`);
    // In Phase 9 this will integrate with Notification Engine
  }
}
