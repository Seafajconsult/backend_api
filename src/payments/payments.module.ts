import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { WebhookController } from './webhook.controller';
import { PaystackService } from './paystack.service';
import { EmailService } from '../utils/email';
import { EncryptionService } from '../utils/encryption';

@Module({
  controllers: [PaymentsController, WebhookController],
  providers: [PaystackService, EmailService, EncryptionService],
  exports: [PaystackService],
})
export class PaymentsModule {}
