import { Injectable, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { QueueService } from '../queue/queue.service.js';

@Injectable()
export class LabService {
  constructor(
    private prisma: PrismaService,
    private queueService: QueueService
  ) {}

  async createLabOrder(encounterId: string, patientId: string, authorId: string, testId: string, notes?: string) {
    return this.prisma.labOrder.create({
      data: { encounterId, patientId, testId, authorId, notes }
    });
  }

  async updateOrderStatus(orderId: string, newStatus: string) {
    const validTransitions: Record<string, string[]> = {
      ORDERED: ['SAMPLE_COLLECTED'],
      SAMPLE_COLLECTED: ['ANALYZING'],
      ANALYZING: ['COMPLETED']
    };

    const order = await this.prisma.labOrder.findUnique({ where: { id: orderId } });
    if (!order) throw new BadRequestException('Lab order not found');

    const allowed = validTransitions[order.status];
    if (!allowed || !allowed.includes(newStatus)) {
      throw new BadRequestException(`Invalid transition from ${order.status} to ${newStatus}`);
    }

    return this.prisma.labOrder.update({
      where: { id: orderId },
      data: { status: newStatus }
    });
  }

  async inputResult(orderId: string, authorId: string, value: string, isAbnormal: boolean) {
    const order = await this.prisma.labOrder.findUnique({ where: { id: orderId }, include: { test: true } });
    if (!order) throw new BadRequestException('Lab order not found');
    
    if (order.status === 'COMPLETED') {
      throw new ForbiddenException('Cannot modify results for a completed order');
    }

    return this.prisma.labResult.create({
      data: {
        orderId,
        authorId,
        value,
        referenceRange: order.test.referenceRange,
        isAbnormal
      }
    });
  }
}
