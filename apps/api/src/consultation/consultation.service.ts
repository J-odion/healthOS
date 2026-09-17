import { Injectable, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { QueueService } from '../queue/queue.service.js';

@Injectable()
export class ConsultationService {
  constructor(
    private prisma: PrismaService,
    private queueService: QueueService
  ) {}

  async checkEncounterOpen(encounterId: string) {
    const encounter = await this.prisma.encounter.findUnique({ where: { id: encounterId } });
    if (!encounter) throw new BadRequestException('Encounter not found');
    if (encounter.status === 'COMPLETED') {
      throw new ForbiddenException('Cannot modify a completed encounter');
    }
    return encounter;
  }

  async addDiagnosis(encounterId: string, authorId: string, data: any) {
    const encounter = await this.checkEncounterOpen(encounterId);
    
    return this.prisma.diagnosis.create({
      data: {
        encounterId,
        patientId: encounter.patientId,
        authorId,
        ...data
      }
    });
  }

  async createPrescription(encounterId: string, authorId: string, items: any[], notes?: string) {
    const encounter = await this.checkEncounterOpen(encounterId);

    return this.prisma.prescription.create({
      data: {
        encounterId,
        patientId: encounter.patientId,
        authorId,
        notes,
        items: {
          create: items.map(item => ({
            medicationId: item.medicationId,
            dosage: item.dosage,
            frequency: item.frequency,
            duration: item.duration,
            route: item.route,
            quantity: item.quantity
          }))
        }
      }
    });
  }

  async finishConsultation(encounterId: string, authorId: string) {
    const encounter = await this.checkEncounterOpen(encounterId);

    return this.prisma.$transaction(async (tx) => {
      // 1. Mark Encounter as COMPLETED
      await tx.encounter.update({
        where: { id: encounterId },
        data: { status: 'COMPLETED' }
      });

      // 2. Auto-sign DOCTOR notes
      await tx.clinicalNote.updateMany({
        where: { encounterId, type: 'DOCTOR', isSigned: false },
        data: { isSigned: true, signedAt: new Date() }
      });

      // 3. Check for Prescriptions / Labs to transition Queue
      const prescriptions = await tx.prescription.findMany({ where: { encounterId, status: 'ACTIVE' } });
      const labOrders = await tx.labOrder.findMany({ where: { encounterId, status: { not: 'COMPLETED' } } });
      
      const currentQueueItem = await tx.queue.findFirst({ where: { encounterId, status: { not: 'DONE' } } });
      
      if (currentQueueItem) {
        if (labOrders.length > 0) {
          // Push to Lab Queue first
          await tx.queue.update({
            where: { id: currentQueueItem.id },
            data: { status: 'LAB' } 
          });
        } else if (prescriptions.length > 0) {
          // Push to Pharmacy Queue
          await tx.queue.update({
            where: { id: currentQueueItem.id },
            data: { status: 'PHARMACY' }
          });
        } else {
          // Complete the queue item
          await tx.queue.update({
            where: { id: currentQueueItem.id },
            data: { status: 'COMPLETED' }
          });
        }
      }

      return { message: 'Consultation finished successfully' };
    });
  }
}
