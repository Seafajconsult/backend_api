import { PaystackService } from './paystack.service';
export declare class WebhookController {
    private readonly paystackService;
    private readonly logger;
    constructor(paystackService: PaystackService);
    handlePaystackWebhook(payload: any, signature: string): Promise<{
        message: string;
    }>;
    testWebhook(): Promise<{
        message: string;
        timestamp: string;
    }>;
}
