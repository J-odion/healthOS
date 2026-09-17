import { Controller, Post, Body, Param, UseInterceptors, Request } from '@nestjs/common';
import { BillingService } from './billing.service.js';
import { RequirePermission } from '../auth/decorators/require-permission.decorator.js';
import { AuditInterceptor } from '../common/interceptors/audit.interceptor.js';

@UseInterceptors(AuditInterceptor)
@Controller('billing')
export class BillingController {
  constructor(private billingService: BillingService) {}

  @Post('invoices')
  @RequirePermission('billing:execute')
  async createInvoice(@Body() body: any) {
    return this.billingService.createDraftInvoice(body.patientId, body.encounterId);
  }

  @Post('invoices/:id/items')
  @RequirePermission('billing:execute')
  async addItem(@Param('id') id: string, @Body() body: any) {
    return this.billingService.addInvoiceItem(id, body.description, body.quantity, body.unitPrice);
  }

  @Post('invoices/:id/issue')
  @RequirePermission('billing:execute')
  async issueInvoice(@Param('id') id: string) {
    return this.billingService.issueInvoice(id);
  }

  @Post('invoices/:id/pay')
  @RequirePermission('billing:execute')
  async capturePayment(@Param('id') id: string, @Body() body: any, @Request() req: any) {
    return this.billingService.capturePayment(id, body.amount, body.method, body.reference, req.user.staff.id);
  }
}
