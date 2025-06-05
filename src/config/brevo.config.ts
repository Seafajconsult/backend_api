import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BrevoConfig {
  constructor(private configService: ConfigService) {}

  getSenderInfo() {
    return {
      email: this.configService.get<string>('BREVO_SENDER_EMAIL'),
      name: this.configService.get<string>('BREVO_SENDER_NAME'),
    };
  }

  getTemplateIds() {
    return {
      emailVerification: parseInt(this.configService.get<string>('EMAIL_VERIFICATION_TEMPLATE_ID') || '1'),
      passwordReset: parseInt(this.configService.get<string>('PASSWORD_RESET_TEMPLATE_ID') || '2'),
      welcome: parseInt(this.configService.get<string>('WELCOME_TEMPLATE_ID') || '3'),
      applicationStatus: parseInt(this.configService.get<string>('APPLICATION_STATUS_TEMPLATE_ID') || '4'),
      paymentConfirmation: parseInt(this.configService.get<string>('PAYMENT_CONFIRMATION_TEMPLATE_ID') || '5'),
    };
  }

  getApiKey(): string {
    return this.configService.get<string>('BREVO_API_KEY') || '';
  }
}
