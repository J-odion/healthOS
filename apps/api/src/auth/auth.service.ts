import { Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service.js';
import * as argon2 from 'argon2';
import * as otplib from 'otplib';
const authenticator = (otplib as any).authenticator;

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { username },
      include: { staff: { include: { role: true } } }
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isActive) {
      throw new ForbiddenException('Account is disabled');
    }

    if (user.lockedUntil && user.lockedUntil > new Date()) {
      throw new ForbiddenException('Account is temporarily locked');
    }

    const isMatch = await argon2.verify(user.passwordHash, pass);
    if (!isMatch) {
      const attempts = user.failedAttempts + 1;
      let lockedUntil = null;
      if (attempts >= 5) { // Lock out after 5 attempts
        lockedUntil = new Date(Date.now() + 15 * 60 * 1000); // Lock for 15 minutes
      }
      await this.prisma.user.update({
        where: { id: user.id },
        data: { failedAttempts: attempts, lockedUntil }
      });
      throw new UnauthorizedException('Invalid credentials');
    }

    // Reset failed attempts
    await this.prisma.user.update({
      where: { id: user.id },
      data: { failedAttempts: 0, lockedUntil: null }
    });

    // Check if MFA is required based on role (Admin/Finance/IT)
    const roleName = user.staff?.role?.name;
    const mfaRequiredRoles = ['ITAdmin', 'FinanceAdmin', 'MedicalDirector'];
    const mfaRequired = mfaRequiredRoles.includes(roleName || '');

    return { user, mfaRequired };
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id, role: user.staff?.role?.name };
    return {
      access_token: this.jwtService.sign(payload),
      mfaRequired: user.mfaEnabled || false,
    };
  }

  async generateMfaSecret(userId: string) {
    const secret = authenticator.generateSecret();
    const otpauthUrl = authenticator.keyuri('user@hospital.local', 'SmartHMS', secret);
    
    await this.prisma.user.update({
      where: { id: userId },
      data: { mfaSecret: secret }
    });

    return { secret, otpauthUrl };
  }

  async verifyMfa(userId: string, token: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user || !user.mfaSecret) throw new UnauthorizedException('MFA not set up');

    const isValid = authenticator.verify({ token, secret: user.mfaSecret });
    if (!isValid) throw new UnauthorizedException('Invalid MFA token');

    // Issue full token after MFA success
    const payload = { username: user.username, sub: user.id, role: 'Verified' };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }
}
