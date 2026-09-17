import { Controller, Post, Get, Body, Param, UseInterceptors, Request } from '@nestjs/common';
import { EmrService } from './emr.service.js';
import { RequirePermission } from '../auth/decorators/require-permission.decorator.js';
import { AuditInterceptor } from '../common/interceptors/audit.interceptor.js';

@UseInterceptors(AuditInterceptor)
@Controller('emr')
export class EmrController {
  constructor(private emrService: EmrService) {}

  @Post('encounter/:encounterId/vitals')
  @RequirePermission('emr:update')
  async captureVitals(@Param('encounterId') encounterId: string, @Body() body: any, @Request() req: any) {
    return this.emrService.captureVitals(encounterId, body.patientId, req.user.staff.id, body.vitals);
  }

  @Post('encounter/:encounterId/triage')
  @RequirePermission('emr:update')
  async updateTriage(@Param('encounterId') encounterId: string, @Body() body: any, @Request() req: any) {
    return this.emrService.updateTriagePriority(encounterId, req.user.staff.id, body.priority);
  }

  @Post('encounter/:encounterId/notes')
  @RequirePermission('emr:update')
  async addNote(@Param('encounterId') encounterId: string, @Body() body: any, @Request() req: any) {
    return this.emrService.addClinicalNote(encounterId, req.user.staff.id, req.user.staff.role.name, body.type, body.content);
  }

  @Post('notes/:noteId/sign')
  @RequirePermission('emr:update')
  async signNote(@Param('noteId') noteId: string, @Request() req: any) {
    return this.emrService.signNote(noteId, req.user.staff.id);
  }

  @Post('notes/:noteId/amend')
  @RequirePermission('emr:update')
  async amendNote(@Param('noteId') noteId: string, @Body() body: any, @Request() req: any) {
    return this.emrService.addAmendment(noteId, req.user.staff.id, body.content);
  }

  @Get('patient/:patientId/timeline')
  @RequirePermission('emr:read')
  async getTimeline(@Param('patientId') patientId: string) {
    return this.emrService.getPatientTimeline(patientId);
  }
}
