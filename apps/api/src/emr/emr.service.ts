import { Injectable, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class EmrService {
  constructor(private prisma: PrismaService) {}

  async captureVitals(encounterId: string, patientId: string, authorId: string, data: any) {
    return this.prisma.vital.create({
      data: {
        encounterId,
        patientId,
        authorId,
        ...data,
      }
    });
  }

  async updateTriagePriority(encounterId: string, authorId: string, newPriority: string) {
    const encounter = await this.prisma.encounter.findUnique({ where: { id: encounterId } });
    if (!encounter) throw new BadRequestException('Encounter not found');

    return this.prisma.$transaction(async (tx) => {
      await tx.triagePriorityHistory.create({
        data: {
          encounterId,
          oldPriority: encounter.triagePriority,
          newPriority,
          authorId
        }
      });
      return tx.encounter.update({
        where: { id: encounterId },
        data: { triagePriority: newPriority }
      });
    });
  }

  async addClinicalNote(encounterId: string, authorId: string, authorRole: string, type: 'NURSING' | 'DOCTOR', content: string) {
    // Basic RBAC for note type creation
    if (type === 'DOCTOR' && !['Doctor', 'MedicalDirector'].includes(authorRole)) {
      throw new ForbiddenException('Only doctors can write doctor notes');
    }

    return this.prisma.clinicalNote.create({
      data: {
        encounterId,
        authorId,
        type,
        content
      }
    });
  }

  async updateClinicalNote(noteId: string, authorRole: string, content: string) {
    const note = await this.prisma.clinicalNote.findUnique({ where: { id: noteId }, include: { author: { include: { role: true } } } });
    if (!note) throw new BadRequestException('Note not found');

    if (note.isSigned) {
      throw new ForbiddenException('Cannot edit a signed note. Use an amendment instead.');
    }

    if (note.type === 'DOCTOR' && !['Doctor', 'MedicalDirector'].includes(authorRole)) {
      throw new ForbiddenException('Nurses cannot edit doctor notes');
    }

    return this.prisma.clinicalNote.update({
      where: { id: noteId },
      data: { content }
    });
  }

  async signNote(noteId: string, authorId: string) {
    const note = await this.prisma.clinicalNote.findUnique({ where: { id: noteId } });
    if (!note) throw new BadRequestException('Note not found');
    if (note.authorId !== authorId) throw new ForbiddenException('You can only sign your own notes');
    
    return this.prisma.clinicalNote.update({
      where: { id: noteId },
      data: { isSigned: true, signedAt: new Date() }
    });
  }

  async addAmendment(noteId: string, authorId: string, content: string) {
    const note = await this.prisma.clinicalNote.findUnique({ where: { id: noteId } });
    if (!note || !note.isSigned) throw new BadRequestException('Can only amend signed notes');

    return this.prisma.noteAmendment.create({
      data: {
        noteId,
        authorId,
        content
      }
    });
  }

  async getPatientTimeline(patientId: string) {
    const encounters = await this.prisma.encounter.findMany({
      where: { patientId },
      orderBy: { createdAt: 'desc' }, // Latest first
      include: {
        vitals: { orderBy: { createdAt: 'desc' } },
        clinicalNotes: {
          include: { amendments: true, author: true },
          orderBy: { createdAt: 'asc' } // Notes in chronological order within an encounter
        },
        triageHistory: { orderBy: { createdAt: 'asc' } }
      }
    });
    return encounters;
  }
}
