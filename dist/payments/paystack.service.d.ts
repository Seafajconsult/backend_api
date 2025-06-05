import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../utils/email';
import { EncryptionService } from '../utils/encryption';
export interface PaystackInitializeResponse {
    status: boolean;
    message: string;
    data: {
        authorization_url: string;
        access_code: string;
        reference: string;
    };
}
export interface PaystackVerifyResponse {
    status: boolean;
    message: string;
    data: {
        id: number;
        domain: string;
        status: string;
        reference: string;
        amount: number;
        message: string;
        gateway_response: string;
        paid_at: string;
        created_at: string;
        channel: string;
        currency: string;
        ip_address: string;
        metadata: any;
        customer: {
            id: number;
            first_name: string;
            last_name: string;
            email: string;
            customer_code: string;
            phone: string;
        };
        authorization: {
            authorization_code: string;
            bin: string;
            last4: string;
            exp_month: string;
            exp_year: string;
            channel: string;
            card_type: string;
            bank: string;
            country_code: string;
            brand: string;
            reusable: boolean;
            signature: string;
        };
    };
}
export declare class PaystackService {
    private configService;
    private prisma;
    private emailService;
    private encryptionService;
    private readonly logger;
    private readonly baseUrl;
    private readonly secretKey;
    constructor(configService: ConfigService, prisma: PrismaService, emailService: EmailService, encryptionService: EncryptionService);
    initializePayment(email: string, amount: number, type: string, userId: string, metadata?: any): Promise<PaystackInitializeResponse>;
    verifyPayment(reference: string): Promise<PaystackVerifyResponse>;
    handleWebhook(payload: any, signature: string): Promise<void>;
    getPaymentHistory(userId: string, userType: 'student' | 'employer'): Promise<{
        type: string;
        id: string;
        status: import(".prisma/client").$Enums.PaymentStatus;
        createdAt: Date;
        amount: number;
        reference: string;
        currency: string;
        paymentDate: Date | null;
    }[]>;
    private generateReference;
    private handleSuccessfulCharge;
    private handleFailedCharge;
}
