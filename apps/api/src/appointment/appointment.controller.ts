import { Controller, Post, Body, Param, UseInterceptors } from '@nestjs/common';
import { AppointmentService } from './appointment.service.js';
import { RequirePermission } from '../auth/decorators/require-permission.decorator.js';
import { AuditInterceptor } from '../common/interceptors/audit.interceptor.js';

@UseInterceptors(AuditInterceptor)
@Controller('appointments')
export class AppointmentController {
  constructor(private appointmentService: AppointmentService) {}

  @Post()
  @RequirePermission('appointment:create')
  async book(@Body() body: any) {
    return this.appointmentService.bookAppointment(body);
  }

  @Post(':id/reschedule')
  @RequirePermission('appointment:update')
  async reschedule(@Param('id') id: string, @Body() body: { reason: string, date: string, timeSlot: string }) {
    return this.appointmentService.reschedule(id, body.reason, body.date, body.timeSlot);
  }

  @Post(':id/cancel')
  @RequirePermission('appointment:update')
  async cancel(@Param('id') id: string, @Body() body: { reason: string }) {
    return this.appointmentService.cancel(id, body.reason);
  }
}
