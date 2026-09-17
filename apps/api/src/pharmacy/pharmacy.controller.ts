import { Controller, Post, Body, Param, UseInterceptors, Request } from '@nestjs/common';
import { PharmacyService } from './pharmacy.service.js';
import { RequirePermission } from '../auth/decorators/require-permission.decorator.js';
import { AuditInterceptor } from '../common/interceptors/audit.interceptor.js';

@UseInterceptors(AuditInterceptor)
@Controller('pharmacy')
export class PharmacyController {
  constructor(private pharmacyService: PharmacyService) {}

  @Post('dispense/:prescriptionId')
  @RequirePermission('pharmacy:execute')
  async dispense(@Param('prescriptionId') prescriptionId: string, @Body() body: any, @Request() req: any) {
    return this.pharmacyService.dispense(prescriptionId, req.user.staff.id, body.items);
  }

  @Post('session/:encounterId/finish')
  @RequirePermission('pharmacy:execute')
  async finishSession(@Param('encounterId') encounterId: string) {
    return this.pharmacyService.finishPharmacySession(encounterId);
  }
}
