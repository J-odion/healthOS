import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { QueueGateway } from './queue.gateway.js';

@Injectable()
export class QueueService {
  constructor(
    private prisma: PrismaService,
    private queueGateway: QueueGateway
  ) {}

  private readonly validTransitions = {
    WAITING: ['TRIAGE'],
    TRIAGE: ['DOCTOR', 'WAITING'],
    DOCTOR: ['LAB', 'PHARMACY', 'PROCEDURE', 'COMPLETED', 'BILLING'],
    LAB: ['DOCTOR', 'COMPLETED'],
    PHARMACY: ['COMPLETED', 'BILLING'],
    BILLING: ['COMPLETED', 'PHARMACY'],
    PROCEDURE: ['DOCTOR', 'COMPLETED']
  };

  async updateQueueStatus(queueId: string, newStatus: string) {
    const queue = await this.prisma.queue.findUnique({ where: { id: queueId } });
    if (!queue) throw new BadRequestException('Queue item not found');

    const allowed = this.validTransitions[queue.status as keyof typeof this.validTransitions];
    if (!allowed || !allowed.includes(newStatus)) {
      throw new BadRequestException(`Invalid transition from ${queue.status} to ${newStatus}`);
    }

    const updated = await this.prisma.queue.update({
      where: { id: queueId },
      data: { status: newStatus }
    });

    // Broadcast the update via WebSockets
    this.queueGateway.broadcastQueueUpdate(updated);

    return updated;
  }

  async callNext(departmentId: string) {
    const nextItem = await this.prisma.queue.findFirst({
      where: { departmentId, status: 'WAITING' },
      orderBy: [
        { priority: 'desc' }, // EMERGENCY > URGENT > NORMAL
        { createdAt: 'asc' }
      ]
    });

    if (!nextItem) return null;

    return this.updateQueueStatus(nextItem.id, 'IN_PROGRESS'); // Or whatever the active state is for the department
  }
}
