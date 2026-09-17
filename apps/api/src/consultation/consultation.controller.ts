import { Controller, Post, Body, Param, UseInterceptors, Request } from '@nestjs/common';
import { ConsultationService } from './consultation.service.js';
import { RequirePermission } from '../auth/decorators/require-permission.decorator.js';
import { AuditInterceptor } from '../common/interceptors/audit.interceptor.js';

@UseInterceptors(AuditInterceptor)
@Controller('consultation')
export class ConsultationController {
  constructor(private consultationService: ConsultationService) {}

  @Post(':encounterId/diagnoses')
  @RequirePermission('consultation:execute')
  async addDiagnosis(@Param('encounterId') encounterId: string, @Body() body: any, @Request() req: any) {
    return this.consultationService.addDiagnosis(encounterId, req.user.staff.id, body);
  }

  @Post(':encounterId/prescriptions')
  @RequirePermission('consultation:execute')
  async createPrescription(@Param('encounterId') encounterId: string, @Body() body: any, @Request() req: any) {
    return this.consultationService.createPrescription(encounterId, req.user.staff.id, body.items, body.notes);
  }

  @Post(':encounterId/finish')
  @RequirePermission('consultation:execute')
  async finishConsultation(@Param('encounterId') encounterId: string, @Request() req: any) {
    return this.consultationService.finishConsultation(encounterId, req.user.staff.id);
  }
}
