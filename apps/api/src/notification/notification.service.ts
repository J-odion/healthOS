import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  async sendSMS(phone: string, message: string) {
    // Stub for Twilio / Termii SDK integration
    this.logger.log(`[STUB] Sending SMS to ${phone}: ${message}`);
    // Example: await this.termiiClient.sendSms(phone, message);
    return { success: true };
  }

  async sendWhatsApp(phone: string, message: string) {
    // Stub for Twilio WhatsApp integration
    this.logger.log(`[STUB] Sending WhatsApp to ${phone}: ${message}`);
    // Example: await this.twilioClient.messages.create({ from: 'whatsapp:+14155238886', to: `whatsapp:${phone}`, body: message });
    return { success: true };
  }
}
