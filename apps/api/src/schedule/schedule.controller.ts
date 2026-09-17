import { Controller, Post, Get, Body, Param, UseInterceptors } from '@nestjs/common';
import { ScheduleService } from './schedule.service.js';
import { RequirePermission } from '../auth/decorators/require-permission.decorator.js';
import { AuditInterceptor } from '../common/interceptors/audit.interceptor.js';

@UseInterceptors(AuditInterceptor)
@Controller('schedule')
export class ScheduleController {
  constructor(private scheduleService: ScheduleService) {}

  @Post()
  @RequirePermission('schedule:create')
  async createSchedule(@Body() body: any) {
    return this.scheduleService.createSchedule(body);
  }

  @Get(':doctorId')
  @RequirePermission('schedule:read')
  async getSchedules(@Param('doctorId') doctorId: string) {
    return this.scheduleService.getDoctorSchedules(doctorId);
  }

  @Post('leave')
  @RequirePermission('schedule:create') // Often restricted to admins or specific roles
  async setLeave(@Body() body: any) {
    return this.scheduleService.setLeave(body);
  }
}
