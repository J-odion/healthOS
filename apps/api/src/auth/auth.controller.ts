import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service.js';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: any) {
    const { user, mfaRequired } = await this.authService.validateUser(body.username, body.password);
    
    if (mfaRequired && !user.mfaEnabled) {
      // Force setup if not enabled but required
      return { 
        requireMfaSetup: true,
        userId: user.id
      };
    }

    const result = await this.authService.login(user);
    if (mfaRequired && user.mfaEnabled) {
      // Return a temporary token or just flag that MFA is needed next
      return { mfaRequired: true, userId: user.id };
    }

    return result;
  }

  @Post('mfa/setup')
  async setupMfa(@Body() body: { userId: string }) {
    return this.authService.generateMfaSecret(body.userId);
  }

  @Post('mfa/verify')
  async verifyMfa(@Body() body: { userId: string, token: string }) {
    return this.authService.verifyMfa(body.userId, body.token);
  }
}
