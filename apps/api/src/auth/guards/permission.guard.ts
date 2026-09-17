import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from '../../prisma/prisma.service.js';
import { PERMISSION_KEY } from '../decorators/require-permission.decorator.js';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermission = this.reflector.getAllAndOverride<string>(PERMISSION_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredPermission) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.staff || !user.staff.roleId) {
      throw new ForbiddenException('User context or role missing');
    }

    const roleWithPermissions = await this.prisma.role.findUnique({
      where: { id: user.staff.roleId },
      include: {
        permissions: {
          include: { permission: true }
        }
      }
    });

    if (!roleWithPermissions) {
      throw new ForbiddenException('Role not found');
    }

    const hasPermission = roleWithPermissions.permissions.some(
      (rp) => rp.permission.name === requiredPermission
    );

    if (!hasPermission) {
      throw new ForbiddenException(`Requires permission: ${requiredPermission}`);
    }

    return true;
  }
}
