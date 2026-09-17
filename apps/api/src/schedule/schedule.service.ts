import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class ScheduleService {
  constructor(private prisma: PrismaService) {}

  async createSchedule(data: { doctorId: string; dayOfWeek: number; startTime: string; endTime: string; slotDuration: number; maxCapacity?: number }) {
    return this.prisma.doctorSchedule.create({ data });
  }

  async getDoctorSchedules(doctorId: string) {
    return this.prisma.doctorSchedule.findMany({ where: { doctorId, isActive: true } });
  }

  async setLeave(data: { doctorId: string; startDate: string; endDate: string; reason?: string }) {
    return this.prisma.doctorLeave.create({
      data: {
        ...data,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate)
      }
    });
  }
}
