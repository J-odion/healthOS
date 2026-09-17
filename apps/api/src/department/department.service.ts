import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class DepartmentService {
  constructor(private prisma: PrismaService) {}

  async create(data: { name: string; description?: string }) {
    return this.prisma.department.create({ data });
  }

  async findAll() {
    return this.prisma.department.findMany();
  }

  async findOne(id: string) {
    return this.prisma.department.findUnique({ where: { id } });
  }

  async update(id: string, data: { name?: string; description?: string; isActive?: boolean }) {
    return this.prisma.department.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.department.delete({ where: { id } });
  }
}
