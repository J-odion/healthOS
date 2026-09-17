import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class AppointmentService {
  constructor(
    private prisma: PrismaService,
    @InjectQueue('reminders') private remindersQueue: Queue
  ) {}

  async bookAppointment(data: { patientId: string; doctorId?: string; departmentId?: string; date: string; timeSlot: string; type: string; notes?: string }) {
    // Basic slot availability check
    if (data.doctorId) {
      const schedule = await this.prisma.doctorSchedule.findFirst({
        where: { doctorId: data.doctorId, dayOfWeek: new Date(data.date).getDay() }
      });
      if (!schedule) throw new BadRequestException('Doctor not scheduled for this day');
      
      const existing = await this.prisma.appointment.count({
        where: { doctorId: data.doctorId, date: new Date(data.date), timeSlot: data.timeSlot, status: { notIn: ['CANCELLED', 'RESCHEDULED'] } }
      });

      // Strict validation logic for double booking
      if (existing >= (schedule.maxCapacity || 1)) {
        throw new BadRequestException('Slot is fully booked');
      }

      // Check for DoctorLeave
      const leave = await this.prisma.doctorLeave.findFirst({
        where: { doctorId: data.doctorId, startDate: { lte: new Date(data.date) }, endDate: { gte: new Date(data.date) } }
      });
      if (leave) throw new BadRequestException('Doctor is on leave during this period');
    }

    const appointment = await this.prisma.appointment.create({
      data: {
        patientId: data.patientId,
        doctorId: data.doctorId,
        departmentId: data.departmentId,
        date: new Date(data.date),
        timeSlot: data.timeSlot,
        type: data.type,
        notes: data.notes
      }
    });

    // Dispatch reminder jobs (simplified delays for MVP)
    const appointmentDate = new Date(data.date).getTime();
    const now = Date.now();
    const delay24h = appointmentDate - (24 * 60 * 60 * 1000) - now;
    
    if (delay24h > 0) {
      await this.remindersQueue.add('send-reminder', { appointmentId: appointment.id }, { delay: delay24h });
    }

    return appointment;
  }

  async reschedule(id: string, reason: string, date: string, timeSlot: string) {
    if (!reason) throw new BadRequestException('Reason is required for rescheduling');
    
    const existing = await this.prisma.appointment.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Appointment not found');

    return this.prisma.$transaction([
      this.prisma.appointment.update({ where: { id }, data: { status: 'RESCHEDULED', cancelReason: reason } }),
      this.prisma.appointment.create({
        data: {
          patientId: existing.patientId,
          doctorId: existing.doctorId,
          departmentId: existing.departmentId,
          date: new Date(date),
          timeSlot,
          type: existing.type,
          notes: existing.notes,
        }
      })
    ]);
  }

  async cancel(id: string, reason: string) {
    if (!reason) throw new BadRequestException('Reason is required for cancellation');
    return this.prisma.appointment.update({ where: { id }, data: { status: 'CANCELLED', cancelReason: reason } });
  }
}
