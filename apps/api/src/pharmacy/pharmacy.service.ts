import { Injectable, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { QueueService } from '../queue/queue.service.js';

@Injectable()
export class PharmacyService {
  constructor(
    private prisma: PrismaService,
    private queueService: QueueService
  ) {}

  async dispense(prescriptionId: string, authorId: string, items: { prescriptionItemId: string, quantity: number, batchId: string }[]) {
    return this.prisma.$transaction(async (tx) => {
      const prescription = await tx.prescription.findUnique({
        where: { id: prescriptionId },
        include: { items: { include: { dispenses: true } } }
      });

      if (!prescription) throw new BadRequestException('Prescription not found');
      if (prescription.status === 'DISPENSED') throw new ForbiddenException('Prescription already fully dispensed');

      for (const reqItem of items) {
        const item = prescription.items.find(i => i.id === reqItem.prescriptionItemId);
        if (!item) throw new BadRequestException(`Item ${reqItem.prescriptionItemId} not found on this prescription`);

        const alreadyDispensed = item.dispenses.reduce((sum, d) => sum + d.quantity, 0);
        const remaining = (item.quantity || 0) - alreadyDispensed;

        if (reqItem.quantity > remaining) {
          throw new BadRequestException(`Cannot dispense ${reqItem.quantity}. Only ${remaining} remaining for item ${item.id}`);
        }

        // Create dispense record
        await tx.pharmacyDispense.create({
          data: {
            prescriptionItemId: item.id,
            quantity: reqItem.quantity,
            authorId
          }
        });

        // Deduct from Inventory Batch
        const batch = await tx.inventoryBatch.findUnique({ where: { id: reqItem.batchId } });
        if (!batch) throw new BadRequestException(`Batch ${reqItem.batchId} not found`);
        if (batch.quantity < reqItem.quantity) {
           // Allow negative for MVP to avoid blocking clinical care, but normally we'd warn or block
           // throw new BadRequestException(`Insufficient stock in batch ${batch.batchNumber}`);
        }

        await tx.stockMovement.create({
          data: {
            batchId: batch.id,
            quantity: -reqItem.quantity,
            reason: 'DISPENSE',
            authorId
          }
        });

        await tx.inventoryBatch.update({
          where: { id: batch.id },
          data: { quantity: batch.quantity - reqItem.quantity }
        });
      }

      // Check overall status
      const updatedPrescription = await tx.prescription.findUnique({
        where: { id: prescriptionId },
        include: { items: { include: { dispenses: true } } }
      });

      let allFullyDispensed = true;
      let anyDispensed = false;
      // Check if completely fulfilled
      for (const item of updatedPrescription?.items || []) {
        const dispensed = item.dispenses.reduce((sum, d) => sum + d.quantity, 0);
        if (dispensed > 0) anyDispensed = true;
        if (dispensed < (item.quantity || 0)) allFullyDispensed = false;
      }

      let newStatus = prescription.status;
      if (allFullyDispensed) newStatus = 'DISPENSED';
      else if (anyDispensed) newStatus = 'PARTIAL';

      if (newStatus !== prescription.status) {
        await tx.prescription.update({
          where: { id: prescriptionId },
          data: { status: newStatus }
        });
      }

      return { message: 'Dispense successful', newStatus };
    });
  }

  async finishPharmacySession(encounterId: string) {
    // Route queue to BILLING
    const currentQueueItem = await this.prisma.queue.findFirst({ where: { encounterId, status: { not: 'DONE' } } });
    if (currentQueueItem) {
      await this.prisma.queue.update({
        where: { id: currentQueueItem.id },
        data: { status: 'BILLING' }
      });
    }
    return { message: 'Patient routed to Billing' };
  }
}
