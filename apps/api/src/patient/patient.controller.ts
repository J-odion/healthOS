import { Controller, Post, Get, Body, Param, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { PatientService } from './patient.service.js';
import { PermissionGuard } from '../auth/guards/permission.guard.js';
import { RequirePermission } from '../auth/decorators/require-permission.decorator.js';
import { AuditInterceptor } from '../common/interceptors/audit.interceptor.js';

@UseInterceptors(AuditInterceptor)
@Controller('patients')
export class PatientController {
  constructor(private patientService: PatientService) {}

  @Post()
  @RequirePermission('patient:create')
  async createPatient(@Body() body: any, @Query('bypass') bypass?: boolean) {
    return this.patientService.createPatient(body, bypass === true);
  }

  @Get()
  @RequirePermission('patient:read')
  async searchPatients(@Query('q') q: string) {
    return this.patientService.searchPatients({ q });
  }

  @Post(':id/cards')
  @RequirePermission('patient:update')
  async issueCard(@Param('id') id: string) {
    return this.patientService.issueCard(id);
  }

  @Post(':id/checkin')
  @RequirePermission('patient:update') // Should ideally be a specific checkin permission
  async checkIn(@Param('id') id: string, @Body('departmentId') departmentId: string) {
    return this.patientService.checkIn(id, departmentId);
  }
}
