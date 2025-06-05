import { ConfigService } from '@nestjs/config';
export declare class EmailService {
    private configService;
    private readonly logger;
    constructor(configService: ConfigService);
    sendEmail(to: string, subject: string, htmlContent: string, templateId?: number): Promise<void>;
    sendVerificationEmail(email: string, otp: string): Promise<void>;
    sendPasswordResetEmail(email: string, otp: string): Promise<void>;
    sendWelcomeEmail(email: string, name: string, applicationId?: string): Promise<void>;
    sendApplicationStatusEmail(email: string, name: string, status: string, applicationId: string): Promise<void>;
    sendPaymentConfirmationEmail(email: string, name: string, amount: number, reference: string): Promise<void>;
}
