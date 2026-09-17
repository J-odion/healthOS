import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PatientService {
  constructor(private prisma: PrismaService) {}

  async createPatient(data: any, bypassDuplicateCheck = false) {
    if (!bypassDuplicateCheck) {
      // Fuzzy duplicate check
      const duplicates = await this.prisma.patient.findMany({
        where: {
          firstName: { equals: data.firstName, mode: 'insensitive' },
          lastName: { equals: data.lastName, mode: 'insensitive' },
          dateOfBirth: new Date(data.dateOfBirth),
        }
      });
      // We can expand check for phone as well

      if (duplicates.length > 0) {
        throw new ConflictException({
          message: 'Potential duplicate patient found.',
          candidates: duplicates,
        });
      }
    }

    // Auto-generate Hospital Number
    const count = await this.prisma.patient.count();
    const hospitalNumber = `SHSH-${new Date().getFullYear()}-${String(count + 1).padStart(4, '0')}`;

    const newPatient = await this.prisma.patient.create({
      data: {
        ...data,
        hospitalNumber,
        dateOfBirth: new Date(data.dateOfBirth),
      }
    });

    return newPatient;
  }

  async searchPatients(query: { q?: string }) {
    if (!query.q) return [];
    return this.prisma.patient.findMany({
      where: {
        OR: [
          { firstName: { contains: query.q, mode: 'insensitive' } },
          { lastName: { contains: query.q, mode: 'insensitive' } },
          { phone: { contains: query.q } },
          { hospitalNumber: { equals: query.q } },
          { cards: { some: { uid: query.q, status: 'ACTIVE' } } }
        ]
      },
      take: 20
    });
  }

  async issueCard(patientId: string) {
    // Generate secure UUID payload for QR
    const uid = uuidv4();
    return this.prisma.patientCard.create({
      data: {
        patientId,
        uid,
        status: 'ACTIVE'
      }
    });
  }

  async checkIn(patientId: string, departmentId?: string) {
    // Basic checkin logic: create IN_PERSON encounter and push to queue
    return this.prisma.$transaction(async (tx) => {
      const encounter = await tx.encounter.create({
        data: {
          patientId,
          type: 'IN_PERSON',
          status: 'CHECKED_IN'
        }
      });

      const queueItem = await tx.queue.create({
        data: {
          encounterId: encounter.id,
          departmentId: departmentId,
          status: 'WAITING',
          priority: 'NORMAL'
        }
      });

      return { encounter, queueItem };
    });
  }
}
