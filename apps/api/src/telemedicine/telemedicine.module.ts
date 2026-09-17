import { Module } from '@nestjs/common';
import { TelemedicineGateway } from './telemedicine.gateway.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [AuthModule],
  providers: [TelemedicineGateway],
})
export class TelemedicineModule {}
