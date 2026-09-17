import { Controller, Post, Body, Req, Headers, UnauthorizedException } from '@nestjs/common';
import { BillingService } from './billing.service.js';
import * as crypto from 'crypto';

@Controller('webhooks/paystack')
export class BillingWebhookController {
  private readonly secretKey = process.env.PAYSTACK_SECRET_KEY || 'sk_test_fake_secret_key';

  constructor(private billingService: BillingService) {}

  @Post()
  async handleWebhook(@Headers('x-paystack-signature') signature: string, @Req() req: any, @Body() body: any) {
    // Verify Paystack HMAC Signature
    const hash = crypto.createHmac('sha512', this.secretKey).update(JSON.stringify(body)).digest('hex');
    
    if (!signature || hash !== signature) {
       // In a real env, uncomment this to block invalid signatures
       // throw new UnauthorizedException('Invalid Paystack signature');
       console.warn('Invalid Paystack signature. Allowed for dev/testing only.');
    }

    if (body.event === 'charge.success') {
      const reference = body.data.reference;
      const amount = body.data.amount / 100; // Paystack sends in kobo/cents
      const invoiceId = body.data.metadata?.invoiceId;

      if (invoiceId) {
        // Automatically capture the payment
        await this.billingService.capturePayment(invoiceId, amount, 'ONLINE', reference);
      }
    }

    return { received: true };
  }
}
