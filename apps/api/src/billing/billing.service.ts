import { Injectable, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { QueueService } from '../queue/queue.service.js';

@Injectable()
export class BillingService {
  constructor(
    private prisma: PrismaService,
    private queueService: QueueService
  ) {}

  async createDraftInvoice(patientId: string, encounterId?: string) {
    const invoiceNo = `INV-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`;
    return this.prisma.invoice.create({
      data: { invoiceNo, patientId, encounterId }
    });
  }

  async addInvoiceItem(invoiceId: string, description: string, quantity: number, unitPrice: number) {
    const invoice = await this.prisma.invoice.findUnique({ where: { id: invoiceId } });
    if (!invoice) throw new BadRequestException('Invoice not found');
    if (invoice.status !== 'DRAFT') throw new ForbiddenException('Can only add items to DRAFT invoices');

    const totalPrice = quantity * unitPrice;

    return this.prisma.$transaction(async (tx) => {
      await tx.invoiceItem.create({
        data: { invoiceId, description, quantity, unitPrice, totalPrice }
      });

      return tx.invoice.update({
        where: { id: invoiceId },
        data: { totalAmount: invoice.totalAmount + totalPrice }
      });
    });
  }

  async issueInvoice(invoiceId: string) {
    const invoice = await this.prisma.invoice.findUnique({ where: { id: invoiceId }, include: { items: true } });
    if (!invoice) throw new BadRequestException('Invoice not found');
    if (invoice.items.length === 0) throw new BadRequestException('Cannot issue empty invoice');

    return this.prisma.invoice.update({
      where: { id: invoiceId },
      data: { status: 'ISSUED', issuedAt: new Date() }
    });
  }

  async capturePayment(invoiceId: string, amount: number, method: string, reference?: string, authorId?: string) {
    return this.prisma.$transaction(async (tx) => {
      const invoice = await tx.invoice.findUnique({ where: { id: invoiceId } });
      if (!invoice) throw new BadRequestException('Invoice not found');
      if (['DRAFT', 'VOID', 'PAID'].includes(invoice.status)) {
        throw new ForbiddenException(`Cannot capture payment for invoice in ${invoice.status} status`);
      }

      await tx.payment.create({
        data: { invoiceId, amount, method, reference, authorId }
      });

      const newAmountPaid = invoice.amountPaid + amount;
      let newStatus = invoice.status;

      if (newAmountPaid >= invoice.totalAmount) {
        newStatus = 'PAID';
        
        // Resolve Queue if linked to encounter
        if (invoice.encounterId) {
          const q = await tx.queue.findFirst({ where: { encounterId: invoice.encounterId, status: 'BILLING' } });
          if (q) {
            await tx.queue.update({ where: { id: q.id }, data: { status: 'COMPLETED' } });
          }
        }
      } else {
        newStatus = 'PARTIAL';
      }

      return tx.invoice.update({
        where: { id: invoiceId },
        data: { amountPaid: newAmountPaid, status: newStatus }
      });
    });
  }
}
