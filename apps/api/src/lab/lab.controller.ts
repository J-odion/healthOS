import { Controller, Post, Body, Param, UseInterceptors, Request } from '@nestjs/common';
import { LabService } from './lab.service.js';
import { RequirePermission } from '../auth/decorators/require-permission.decorator.js';
import { AuditInterceptor } from '../common/interceptors/audit.interceptor.js';

@UseInterceptors(AuditInterceptor)
@Controller('lab')
export class LabController {
  constructor(private labService: LabService) {}

  @Post('orders')
  @RequirePermission('consultation:execute') // Doctors order labs
  async createOrder(@Body() body: any, @Request() req: any) {
    return this.labService.createLabOrder(body.encounterId, body.patientId, req.user.staff.id, body.testId, body.notes);
  }

  @Post('orders/:id/status')
  @RequirePermission('lab:update') // Lab tech process labs
  async updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.labService.updateOrderStatus(id, status);
  }

  @Post('orders/:id/results')
  @RequirePermission('lab:update') // Lab tech input results
  async inputResult(@Param('id') id: string, @Body() body: any, @Request() req: any) {
    return this.labService.inputResult(id, req.user.staff.id, body.value, body.isAbnormal);
  }
}
