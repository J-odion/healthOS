import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors } from '@nestjs/common';
import { DepartmentService } from './department.service.js';
import { PermissionGuard } from '../auth/guards/permission.guard.js';
import { RequirePermission } from '../auth/decorators/require-permission.decorator.js';
import { AuditInterceptor } from '../common/interceptors/audit.interceptor.js';

// @UseGuards(PermissionGuard) // Uncomment when JwtAuthGuard is setup globally or locally
@UseInterceptors(AuditInterceptor)
@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  @RequirePermission('department:create')
  create(@Body() createDepartmentDto: { name: string; description?: string }) {
    return this.departmentService.create(createDepartmentDto);
  }

  @Get()
  @RequirePermission('department:read')
  findAll() {
    return this.departmentService.findAll();
  }

  @Get(':id')
  @RequirePermission('department:read')
  findOne(@Param('id') id: string) {
    return this.departmentService.findOne(id);
  }

  @Patch(':id')
  @RequirePermission('department:update')
  update(@Param('id') id: string, @Body() updateDepartmentDto: { name?: string; description?: string; isActive?: boolean }) {
    return this.departmentService.update(id, updateDepartmentDto);
  }

  @Delete(':id')
  @RequirePermission('department:delete')
  remove(@Param('id') id: string) {
    return this.departmentService.remove(id);
  }
}
